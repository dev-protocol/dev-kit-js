import { FallbackableOverrides } from '../common/utils/execute'
import { clientsLockup } from './common/clients/clientsLockup'
import {
	approveIfNeeded as _approveIfNeeded,
	ApproveIfNeededResult,
} from './common/approveIfNeeded'
import { UndefinedOr } from '@devprotocol/util-ts'
import { ContractRunner } from 'ethers'

type PositionsCreate = (options: {
	readonly provider: ContractRunner
	readonly from: string
	readonly destination: string
	readonly amount: string
	readonly payload?: string | Uint8Array
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<ApproveIfNeededResult>>

export const positionsCreate: PositionsCreate = async (options) => {
	const [l1, l2] = await clientsLockup(options.provider)

	return l1 || l2
		? ((res) => res)(
				await _approveIfNeeded({
					provider: options.provider,
					requiredAmount: options.amount,
					from: options.from,
					to: await ((x) => x?.contract().getAddress())(l1 ?? l2),
					callback: (receipt) =>
						l1
							? l1.depositToProperty(
									options.destination,
									options.amount,
									options.payload,
									options.overrides,
							  )
							: l2
							? l2.depositToProperty(
									options.destination,
									options.amount,
									options.payload,
									options.overrides,
							  )
							: (undefined as never),
				}),
		  )
		: undefined
}
