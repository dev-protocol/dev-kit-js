import { ethers } from 'ethers'
import { createPolicyContract, PolicyContract } from '.'
import { policyAbi } from './abi'
import { createRewardsCaller } from '../../ethereum/policy/rewards'
import { createHoldersShareCaller } from '../../ethereum/policy/holdersShare'
import { createAuthenticationFeeCaller } from '../../ethereum/policy/authenticationFee'
import { createMarketVotingSecondsCaller } from './marketVotingSeconds'
import { createPolicyVotingSecondsCaller } from './policyVotingSeconds'
import { createShareOfTreasuryCaller } from '../../ethereum/policy/shareOfTreasury'

jest.mock('../../ethereum/policy/rewards')
jest.mock('../../ethereum/policy/holdersShare')
jest.mock('../../ethereum/policy/authenticationFee')
jest.mock('./marketVotingSeconds')
jest.mock('./policyVotingSeconds')
jest.mock('../../ethereum/policy/shareOfTreasury')

describe('policy/index.ts', () => {
	;(createHoldersShareCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createRewardsCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createAuthenticationFeeCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createMarketVotingSecondsCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createPolicyVotingSecondsCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createShareOfTreasuryCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	describe('createPolicyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.JsonRpcProvider(host)

			const expected: (address: string) => PolicyContract = (
				address: string
			) => {
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

			const result = createPolicyContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
