import { ethers } from 'ethers'
import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { policyAbi } from './abi'
import { always } from 'ramda'
import { createHoldersShareCaller } from './holdersShare'
import { createRewardsCaller } from './rewards'
import { createAuthenticationFeeCaller } from './authenticationFee'
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
	readonly marketVotingBlocks: () => Promise<string>
	readonly policyVotingBlocks: () => Promise<string>
	readonly shareOfTreasury: (supply: string) => Promise<string>
	readonly treasury: () => Promise<string>
	readonly capSetter: () => Promise<string>
}

export const createPolicyContract =
	(provider: Provider | Signer) =>
	(address: string): PolicyContract => {
		const contract = new ethers.Contract(address, [...policyAbi], provider)

		return {
			holdersShare: createHoldersShareCaller(contract),
			rewards: createRewardsCaller(contract),
			authenticationFee: createAuthenticationFeeCaller(contract),
			marketVotingBlocks: createMarketVotingBlocksCaller(contract),
			policyVotingBlocks: createPolicyVotingBlocksCaller(contract),
			shareOfTreasury: createShareOfTreasuryCaller(contract),
			treasury: createTreasuryCaller(contract),
			capSetter: createCapSetterCaller(contract),
		}
	}
