import { FallbackableOverrides } from '../common/utils/execute'
import { Provider } from '@ethersproject/abstract-provider'
import { swapClients } from './common/clients/swapClients'
import {
	approveIfNeeded as _approveIfNeeded,
	ApproveIfNeededResult,
} from './common/approveIfNeeded'
import { UndefinedOr } from '@devprotocol/util-ts'

type PositionsCreateWithETH = (options: {
	readonly provider: Provider
	readonly from: string
	readonly propertyAddress: string
	readonly fallbackOverrides: FallbackableOverrides
}) => Promise<UndefinedOr<ApproveIfNeededResult>>

export const positionsCreateWithETH: PositionsCreateWithETH = async (options) => {
	const l2 = await swapClients(options.provider)

	return l2 && options.fallbackOverrides.overrides?.value
		? {
			approveIfNeeded: _approveIfNeeded({
				provider: options.provider,
				requiredAmount: options.fallbackOverrides.overrides?.value,
				from: options.from,
				to: ((x) => x?.contract().address)(l2),
				callback: (receipt) =>
					l2
						? l2.swapEthAndStakeDevCaller(
							options.propertyAddress,
							options.fallbackOverrides
						)
						: (undefined as never),
			}),
		}
		: undefined
}
