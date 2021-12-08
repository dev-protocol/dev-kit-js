import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { executePositionCreate, FallbackableOverrides } from './../common/utils/execute'
import { createLockupContract } from './../ethereum/lockup/index'
import { createDepositToPropertyCaller } from './../ethereum/lockup/depositToProperty'

export type Options = {
    readonly provider: Provider | Signer,
    readonly propertyAddress: string,
    readonly amount: string,
    readonly overrides?: FallbackableOverrides
}

export type PositionsCreate = (options: Options) => Promise<TransactionResponse>

export const positionsCreate: PositionsCreate = (options: Options): Promise<TransactionResponse> => {
	// cashing with provider

	const lockupContract = createLockupContract(options.provider)
	return createDepositToPropertyCaller(lockupContract)
}

