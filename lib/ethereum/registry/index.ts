import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { addressConfigAbi } from './abi'
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
import { createPolicyGroupCaller } from './policyGroup'

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
	readonly policyGroup: () => Promise<string>
	readonly propertyFactory: () => Promise<string>
	readonly propertyGroup: () => Promise<string>
	readonly token: () => Promise<string>
	readonly withdraw: () => Promise<string>
	readonly withdrawStorage: () => Promise<string>
}

export type CreateRegistryContract = (
	provider: Provider | Signer
) => (address: string) => RegistryContract

export const createRegistryContract: CreateRegistryContract =
	(provider: Provider | Signer) =>
	(address: string): RegistryContract => {
		const contract = new ethers.Contract(
			address,
			[...addressConfigAbi],
			provider
		)

		return {
			allocator: createAllocatorCaller(contract),
			allocatorStorage: createAllocatorStorageCaller(contract),
			lockup: createLockupCaller(contract),
			lockupStorage: createLockupStorageCaller(contract),
			marketFactory: createMarketFactoryCaller(contract),
			marketGroup: createMarketGroupCaller(contract),
			metricsFactory: createMetricsFactoryCaller(contract),
			metricsGroup: createMetricsGroupCaller(contract),
			policy: createPolicyCaller(contract),
			policySet: createPolicySetCaller(contract),
			policyGroup: createPolicyGroupCaller(contract),
			policyFactory: createPolicyFactoryCaller(contract),
			propertyFactory: createPropertyFactoryCaller(contract),
			propertyGroup: createPropertyGroupCaller(contract),
			token: createTokenCaller(contract),
			withdraw: createWithdrawCaller(contract),
			withdrawStorage: createWithdrawStorageCaller(contract),
		}
	}
