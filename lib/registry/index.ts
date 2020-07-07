import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { addressConfigAbi } from './abi'
import { CustomOptions } from '../option'
import { createTokenCaller } from './token'
import { createAllocatorCaller } from './allocator'
import { createAllocatorStorageCaller } from './allocatorStorage'
import { createLockupCaller } from './lockup'
import { createLockupStorageCaller } from './lockupStorage'
import { createMarketFactoryCaller } from './marketFactory'
import { createMarketGroupCaller } from './marketGroup'
import { createMetricsFactoryCaller } from './metricsFactory'
import { createMetricsGroupCaller } from './metricsGroup'
import { createPolicyCaller } from './policy'
import { createPropertyFactoryCaller } from './propertyFactory'
import { createPropertyGroupCaller } from './propertyGroup'
import { createWithdrawCaller } from './withdraw'
import { createWithdrawStorageCaller } from './withdrawStorage'
import { createPolicyFactoryCaller } from './policyFactory'
import { createPolicySetCaller } from './policySet'

export type RegistryContract = {
	readonly allocator: () => Promise<string>
	readonly allocatorStorage: () => Promise<string>
	readonly lockup: () => Promise<string>
	readonly lockupStorage: () => Promise<string>
	readonly marketFactory: () => Promise<string>
	readonly marketGroup: () => Promise<string>
	readonly metricsFactory: () => Promise<string>
	readonly metricsGroup: () => Promise<string>
	readonly policy: () => Promise<string>
	readonly policyFactory: () => Promise<string>
	readonly policySet: () => Promise<string>
	readonly propertyFactory: () => Promise<string>
	readonly propertyGroup: () => Promise<string>
	readonly token: () => Promise<string>
	readonly withdraw: () => Promise<string>
	readonly withdrawStorage: () => Promise<string>
}

export type CreateRegistryContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => RegistryContract

export const createRegistryContract: CreateRegistryContract = (
	client: Web3
) => (address?: string, options?: CustomOptions): RegistryContract => {
	const contractClient: Contract = new client.eth.Contract(
		[...addressConfigAbi],
		address,
		{
			...options,
		}
	)

	return {
		allocator: createAllocatorCaller(contractClient),
		allocatorStorage: createAllocatorStorageCaller(contractClient),
		lockup: createLockupCaller(contractClient),
		lockupStorage: createLockupStorageCaller(contractClient),
		marketFactory: createMarketFactoryCaller(contractClient),
		marketGroup: createMarketGroupCaller(contractClient),
		metricsFactory: createMetricsFactoryCaller(contractClient),
		metricsGroup: createMetricsGroupCaller(contractClient),
		policy: createPolicyCaller(contractClient),
		policySet: createPolicySetCaller(contractClient),
		policyFactory: createPolicyFactoryCaller(contractClient),
		propertyFactory: createPropertyFactoryCaller(contractClient),
		propertyGroup: createPropertyGroupCaller(contractClient),
		token: createTokenCaller(contractClient),
		withdraw: createWithdrawCaller(contractClient),
		withdrawStorage: createWithdrawStorageCaller(contractClient),
	}
}
