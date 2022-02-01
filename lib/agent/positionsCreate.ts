import { TransactionResponse } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from '../common/utils/execute'
import { Provider } from '@ethersproject/abstract-provider'
import { UndefinedOr } from '@devprotocol/util-ts'
import { lockupClients } from './common/clients/lockupClients'

type PositionsCreate = (options: {
	readonly provider: Provider
	readonly propertyAddress: string
	readonly amount: string
	readonly overrides?: FallbackableOverrides
}) => Promise<UndefinedOr<TransactionResponse>>

export const positionsCreate: PositionsCreate = async (options) => {
	const [l1, l2] = await lockupClients(options.provider)

	return l1
		? l1.depositToProperty(options.propertyAddress, options.amount)
		: l2
		? l2.depositToProperty(options.propertyAddress, options.amount)
		: undefined
}
