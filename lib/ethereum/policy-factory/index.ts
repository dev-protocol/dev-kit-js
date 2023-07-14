import { ContractRunner, ethers } from 'ethers'
import { policyFactoryAbi } from './abi'
import { createCreateCaller } from './create'
import { createForceAttachCaller } from './forceAttach'
import { FallbackableOverrides } from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { always } from 'ramda'

export type PolicyFactoryContract = {
	readonly create: (
		newPolicyAddress: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly forceAttach: (
		policy: string,
		overrides?: FallbackableOverrides,
	) => Promise<TransactionResponse>
	readonly contract: () => ethers.Contract
}

export type CreatePolicyFactoryContract = (
	provider: ContractRunner,
) => (address: string) => PolicyFactoryContract

export const createPolicyFactoryContract: CreatePolicyFactoryContract =
	(provider: ContractRunner) => (address: string) => {
		const contract = new ethers.Contract(
			address,
			[...policyFactoryAbi],
			provider,
		)

		return {
			create: createCreateCaller(contract),
			forceAttach: createForceAttachCaller(contract),
			contract: always(contract),
		}
	}
