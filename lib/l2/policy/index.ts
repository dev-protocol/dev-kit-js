import { ContractRunner, ethers } from 'ethers'
import { policyAbi } from './abi'
import { createRewardsCaller } from '../../ethereum/policy/rewards'
import { createHoldersShareCaller } from '../../ethereum/policy/holdersShare'
import { createAuthenticationFeeCaller } from '../../ethereum/policy/authenticationFee'
import { createMarketVotingSecondsCaller } from './marketVotingSeconds'
import { createPolicyVotingSecondsCaller } from './policyVotingSeconds'
import { createShareOfTreasuryCaller } from '../../ethereum/policy/shareOfTreasury'

export type PolicyContract = {
	readonly holdersShare: (amount: string, lockups: string) => Promise<string>
	readonly rewards: (lockups: string, assets: string) => Promise<string>
	readonly authenticationFee: (
		assets: string,
		propertyAssets: string,
	) => Promise<string>
	readonly marketVotingSeconds: () => Promise<string>
	readonly policyVotingSeconds: () => Promise<string>
	readonly shareOfTreasury: (supply: string) => Promise<string>
	readonly contract: () => ethers.Contract
}

export const createPolicyContract =
	(provider: ContractRunner) =>
	(address: string): PolicyContract => {
		const contract = new ethers.Contract(address, [...policyAbi], provider)

		return {
			holdersShare: createHoldersShareCaller(contract),
			rewards: createRewardsCaller(contract),
			authenticationFee: createAuthenticationFeeCaller(contract),
			marketVotingSeconds: createMarketVotingSecondsCaller(contract),
			policyVotingSeconds: createPolicyVotingSecondsCaller(contract),
			shareOfTreasury: createShareOfTreasuryCaller(contract),
			contract: () => contract,
		}
	}
