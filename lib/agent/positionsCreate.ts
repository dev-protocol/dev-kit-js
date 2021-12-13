import { Contract, ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from './../common/utils/execute'
import { createLockupContract, LockupContract } from './../ethereum/lockup/index'
import { createDepositToPropertyCaller } from './../ethereum/lockup/depositToProperty'

export type Options = {
    readonly provider: Provider,
    // readonly provider: Provider,
    readonly propertyAddress: string,
    readonly amount: string,
    readonly overrides?: FallbackableOverrides
}

export type PositionsCreate = (options: Options) => Promise<TransactionResponse>

export const getCreateLockupContract = async (chainId: number, provider: Provider): Promise<(address: string) => LockupContract> => {
	const cache = new WeakMap();
    const contract = {contract: "Lockup"}

	// eslint-disable-next-line functional/no-conditional-statement
	if (cache.has(contract)) {
		return cache.get(contract)
	} else {
        const lockupContract = chainId === 1 || chainId === 3 ?
	        createLockupContract(provider) : createLockupContract(provider) // we do not have function for L2.

		// eslint-disable-next-line
		cache.set(contract, lockupContract)
		return lockupContract
	}
}

export const positionsCreate: PositionsCreate = async (options: Options): Promise<TransactionResponse> => {
    const chainId = (await options.provider.getNetwork()).chainId

	const createLockupContract= await getCreateLockupContract(chainId, options.provider)
	const lockupAddress = "0x0"

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const lockupContract = await createLockupContract(lockupAddress) as any

	const caller = createDepositToPropertyCaller(lockupContract)
	const transactionResponse = await caller(options.propertyAddress, options.amount)
	return transactionResponse
}

