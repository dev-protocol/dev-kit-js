/* eslint-disable functional/no-throw-statement */
/* eslint-disable functional/no-conditional-statement */
import Web3 from 'web3'
import { provider as Web3Provider } from 'web3-core'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { createMarketContract } from './market/index'
import { createPropertyContract } from './property/index'
import { createPropertyFactoryContract } from './property-factory/index'
import { createAllocatorContract } from './allocator/index'
import { createLockupContract } from './lockup/index'
import { createDevContract } from './dev/index'
import { createWithdrawContract } from './withdraw/index'
import { createRegistryContract } from './registry/index'
import { createPolicyContract } from './policy'
import { createPolicyGroupContract } from './policy-group'
import { createMetricsContract } from './metrics'
import { createPolicyFactoryContract } from './policy-factory'

export type DevkitContract = {
	readonly allocator: ReturnType<typeof createAllocatorContract>
	readonly market: ReturnType<typeof createMarketContract>
	readonly property: ReturnType<typeof createPropertyContract>
	readonly propertyFactory: ReturnType<typeof createPropertyFactoryContract>
	readonly lockup: ReturnType<typeof createLockupContract>
	readonly withdraw: ReturnType<typeof createWithdrawContract>
	readonly dev: ReturnType<typeof createDevContract>
	readonly registry: ReturnType<typeof createRegistryContract>
	readonly policy: ReturnType<typeof createPolicyContract>
	readonly policyGroup: ReturnType<typeof createPolicyGroupContract>
	readonly metrics: ReturnType<typeof createMetricsContract>
	readonly policyFactory: ReturnType<typeof createPolicyFactoryContract>
}
export type ContractFactory = ({
	web3rovider,
	ethersProvider,
}: {
	readonly web3rovider?: Web3Provider
	readonly ethersProvider?: Provider | Signer
}) => DevkitContract
export type CreateWeb3DevkitContract = (client: Web3) => DevkitContract
export type CreateEthers3DevkitContract = (
	provider: Provider | Signer
) => DevkitContract

export const createWeb3DevkitContract: CreateWeb3DevkitContract = (
	client: Web3
): DevkitContract => ({
	allocator: createAllocatorContract(client),
	market: createMarketContract(client),
	property: createPropertyContract(client),
	propertyFactory: createPropertyFactoryContract(client),
	lockup: createLockupContract(client),
	withdraw: createWithdrawContract(client),
	dev: createDevContract(client),
	registry: createRegistryContract(client),
	policy: createPolicyContract(client),
	policyGroup: createPolicyGroupContract(client),
	metrics: createMetricsContract(client),
	policyFactory: createPolicyFactoryContract(client),
})

// ここをethers.jsで実装した処理の関数に差し替える
export const createEthersDevkitContract: CreateEthers3DevkitContract = (
	provider: Provider | Signer
): DevkitContract => ({
	allocator: createAllocatorContract(client),
	market: createMarketContract(client),
	property: createPropertyContract(client),
	propertyFactory: createPropertyFactoryContract(client),
	lockup: createLockupContract(client),
	withdraw: createWithdrawContract(client),
	dev: createDevContract(client),
	registry: createRegistryContract(client),
	policy: createPolicyContract(client),
	policySet: createPolicySetContract(client),
})

export const contractFactory: ContractFactory = ({
	web3rovider,
	ethersProvider,
}: {
	readonly web3rovider?: Web3Provider
	readonly ethersProvider?: Provider | Signer
}): DevkitContract => {
	if ((!web3rovider && !ethersProvider) || (web3rovider && ethersProvider)) {
		throw new Error('You should set web3 provider or ethers provider')
	}
	if (web3rovider) {
		return createWeb3DevkitContract(new Web3(web3rovider))
	}
	if (ethersProvider) {
		return createEthersDevkitContract(ethersProvider)
	}
	throw new Error('You should set web3 provider or ethers provider')
}
