import { FallbackableOverrides } from '../common/utils/execute'
import { Provider } from '@ethersproject/abstract-provider'
import { lockupClients } from './common/clients/lockupClients'
import { approveIfNeeded as _approveIfNeeded } from './common/approveIfNeeded'

type PositionsCreate = (options: {
	readonly provider: Provider
	readonly from: string
	readonly destination: string
	readonly amount: string
	readonly overrides?: FallbackableOverrides
}) => Promise<{
	readonly approveIfNeeded: ReturnType<typeof _approveIfNeeded>
}>

export const positionsCreate: PositionsCreate = async (options) => {
	const [l1, l2] = await lockupClients(options.provider)
	const approveIfNeeded = _approveIfNeeded({
		provider: options.provider,
		requiredAmount: options.amount,
		from: options.from,
		to: ((x) => x?.contract().address)(l1 ?? l2),
		callback: (receipt) =>
			l1
				? l1.depositToProperty(
						options.destination,
						options.amount,
						options.overrides
				  )
				: l2
				? l2.depositToProperty(
						options.destination,
						options.amount,
						options.overrides
				  )
				: undefined,
	})

	return {
		approveIfNeeded,
	}
}
