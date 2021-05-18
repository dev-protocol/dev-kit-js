/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { policyAbi } from './abi'
import { CustomOptions } from '../option'
import { always } from 'ramda'
import { createHoldersShareCaller } from './holdersShare'
import { createRewardsCaller } from './rewards'
import { createAuthenticationFeeCaller } from './authenticationFee'
import { createMarketApprovalCaller } from './marketApproval'
import { createPolicyApprovalCaller } from './policyApproval'
import { createMarketVotingBlocksCaller } from './marketVotingBlocks'
import { createPolicyVotingBlocksCaller } from './policyVotingBlocks'
import { createShareOfTreasuryCaller } from './shareOfTreasury'
import { createTreasuryCaller } from './treasury'
import { createCapSetterCaller } from './capSetter'

export type PolicyContract = {
	readonly holdersShare: (amount: string, lockups: string) => Promise<string>
	readonly rewards: (lockups: string, assets: string) => Promise<string>
	readonly authenticationFee: (
		assets: string,
		propertyAssets: string
	) => Promise<string>
	readonly marketApproval: (agree: string, opposite: string) => Promise<boolean>
	readonly policyApproval: (agree: string, opposite: string) => Promise<boolean>
	readonly marketVotingBlocks: () => Promise<string>
	readonly policyVotingBlocks: () => Promise<string>
	readonly shareOfTreasury: (supply: string) => Promise<string>
	readonly treasury: () => Promise<string>
	readonly capSetter: () => Promise<string>
	readonly contract: () => Contract
}

export type CreatePolicyContract = (
	client: Web3
) => (address?: string, options?: CustomOptions) => PolicyContract

export const createPolicyContract: CreatePolicyContract =
	(client: Web3) => (address?: string, options?: CustomOptions) => {
		const contractClient: Contract = new client.eth.Contract(
			[...policyAbi],
			address,
			{
				...options,
			}
		)

		return {
			holdersShare: createHoldersShareCaller(contractClient),
			rewards: createRewardsCaller(contractClient),
			authenticationFee: createAuthenticationFeeCaller(contractClient),
			marketApproval: createMarketApprovalCaller(contractClient),
			policyApproval: createPolicyApprovalCaller(contractClient),
			marketVotingBlocks: createMarketVotingBlocksCaller(contractClient),
			policyVotingBlocks: createPolicyVotingBlocksCaller(contractClient),
			shareOfTreasury: createShareOfTreasuryCaller(contractClient),
			treasury: createTreasuryCaller(contractClient),
			capSetter: createCapSetterCaller(contractClient),
			contract: always(contractClient),
		}
	}
