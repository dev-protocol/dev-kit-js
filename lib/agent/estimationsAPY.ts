import { Provider } from '@ethersproject/abstract-provider'
import { clientsLockup } from './common/clients/clientsLockup'
import { UndefinedOr, whenDefined, whenDefinedAll } from '@devprotocol/util-ts'
import { clientsMetricsFactory } from './common/clients/clientsMetricsFactory'
import { clientsMetricsGroup } from './common/clients/clientsMetricsGroup'
import { clientsPolicy } from './common/clients/clientsPolicy'
import { BigNumber as BN } from 'ethers'
import { BigNumber } from 'bignumber.js'

type EstimationsAPY = (options: {
	readonly provider: Provider
}) => Promise<readonly [UndefinedOr<number>, UndefinedOr<number>]>

export const estimationsAPY: EstimationsAPY = async (options) => {
	const [[l1P, l2P], [l1L, l2L], [, l2MF], [l1MG]] = await Promise.all([
		clientsPolicy(options.provider),
		clientsLockup(options.provider),
		clientsMetricsFactory(options.provider),
		clientsMetricsGroup(options.provider),
	])
	const tvl = l1L
		? await l1L.getAllValue()
		: l2L
		? await l2L.totalLocked()
		: undefined
	const assets = l1MG
		? await l1MG.totalIssuedMetrics()
		: l2MF
		? await l2MF.metricsCount()
		: undefined
	const yeild = await whenDefinedAll(
		[tvl, assets, l1P || l2P],
		([_tvl, _assets, policy]) => policy.rewards(_tvl, _assets.toString())
	)
	const holders = await whenDefinedAll(
		[tvl, yeild, l1P || l2P],
		([_tvl, y, policy]) => policy.holdersShare(y, _tvl)
	)
	const annualYeild = whenDefined(yeild, (y) =>
		BN.from(y).mul(l1P ? BN.from(2102400) : BN.from(31536000))
	)
	const shareOfHolders = whenDefinedAll([holders, yeild], ([hol, y]) =>
		new BigNumber(hol).div(y).times(100).toNumber()
	)
	const shareOfStakers = whenDefined(shareOfHolders, (hs) => 100 - hs)
	const apyForStakers = whenDefinedAll(
		[annualYeild, shareOfStakers, tvl],
		([ay, sh, tv]) => new BigNumber(ay.toString()).times(sh).div(tv).toNumber()
	)
	const apyForHolders = whenDefinedAll(
		[annualYeild, shareOfHolders, tvl],
		([ay, sh, tv]) => new BigNumber(ay.toString()).times(sh).div(tv).toNumber()
	)

	return [apyForStakers, apyForHolders]
}
