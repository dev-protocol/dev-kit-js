import { ethers } from 'ethers'
import { createPolicyContract, PolicyContract } from '.'
import { policyAbi } from './abi'
import { createHoldersShareCaller } from './holdersShare'
import { createRewardsCaller } from './rewards'
import { createAuthenticationFeeCaller } from './authenticationFee'
import { createMarketVotingBlocksCaller } from './marketVotingBlocks'
import { createPolicyVotingBlocksCaller } from './policyVotingBlocks'
import { createShareOfTreasuryCaller } from './shareOfTreasury'
import { createTreasuryCaller } from './treasury'
import { createCapSetterCaller } from './capSetter'

jest.mock('./holdersShare')
jest.mock('./rewards')
jest.mock('./authenticationFee')
jest.mock('./marketVotingBlocks')
jest.mock('./policyVotingBlocks')
jest.mock('./shareOfTreasury')
jest.mock('./treasury')
jest.mock('./capSetter')

describe('policy/index.ts', () => {
	;(createHoldersShareCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createRewardsCaller as jest.Mock).mockImplementation((contract) => contract)
	;(createAuthenticationFeeCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createMarketVotingBlocksCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createPolicyVotingBlocksCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createShareOfTreasuryCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createTreasuryCaller as jest.Mock).mockImplementation(
		(contract) => contract
	)
	;(createCapSetterCaller as jest.Mock).mockImplementation(
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
					marketVotingBlocks: createMarketVotingBlocksCaller(contract),
					policyVotingBlocks: createPolicyVotingBlocksCaller(contract),
					shareOfTreasury: createShareOfTreasuryCaller(contract),
					treasury: createTreasuryCaller(contract),
					capSetter: createCapSetterCaller(contract),
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
