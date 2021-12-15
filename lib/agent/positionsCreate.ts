import { Contract, ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from './../common/utils/execute'
import { createLockupContract, LockupContract } from './../ethereum/lockup/index'
import { createDepositToPropertyCaller } from './../ethereum/lockup/depositToProperty'
import { addresses } from './../addresses'
import { addressConfigAbi } from '../ethereum/registry/abi'

export type Options = {
    readonly provider: Provider,
    readonly propertyAddress: string,
    readonly amount: string,
    readonly overrides?: FallbackableOverrides
}

export type PositionsCreate = (options: Options) => Promise<TransactionResponse>

export const getLockupAddress = async (chainId: number, provider: Provider): Promise<string> => {
	const lockupAddress = chainId === 1 ?
	    (await new ethers.Contract(addresses.eth.main.registry, [...addressConfigAbi], provider)).lockup(): chainId === 3 ?
		(await new ethers.Contract(addresses.eth.ropsten.registry, [...addressConfigAbi], provider)).lockup(): chainId === 42161 ?
		addresses.arbitrum.one.lockup :
		addresses.arbitrum.rinkeby.lockup

	return lockupAddress
}

export const getCreateLockupContract = async (chainId: number, provider: Provider): Promise<LockupContract> => {
	const cache = new WeakMap();
    const contract = {}

	// eslint-disable-next-line functional/no-conditional-statement
	if (cache.has(contract)) {
		return cache.get(contract)
	} else {
        const lockupContract = chainId === 1 || chainId === 3 ?
	        createLockupContract(provider) : createLockupContract(provider) // we do not have function for L2.

        const lockupAddress = await getLockupAddress(chainId, provider)
		const deployedLockupContract = await lockupContract(lockupAddress)

		// eslint-disable-next-line functional/no-expression-statement
		cache.set(contract, deployedLockupContract)
		return deployedLockupContract
	}
}

export const positionsCreate: PositionsCreate = async (options: Options): Promise<TransactionResponse> => {
    const chainId = (await options.provider.getNetwork()).chainId

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const lockupContract = await getCreateLockupContract(chainId, options.provider) as any

	const caller = createDepositToPropertyCaller(lockupContract)
	const transactionResponse = await caller(options.propertyAddress, options.amount)
	return transactionResponse
}

