import { ethers } from 'ethers'
import { createPolicyFactoryContract, PolicyFactoryContract } from '.'
import { policyFactoryAbi } from './abi'
import { createCreateCaller } from './create'
import { createForceAttachCaller } from './forceAttach'

describe('policy/index.ts', () => {
	describe('createPolicyContract', () => {
		it('check return object', () => {
			const host = 'localhost'
			const address = '0x0000000000000000000000000000000000000000'
			const provider = new ethers.providers.JsonRpcProvider(host)

			const expected: (address: string) => PolicyFactoryContract = (
				address: string
			) => {
				const contract = new ethers.Contract(
					address,
					[...policyFactoryAbi],
					provider
				)

				return {
					create: createCreateCaller(contract),
					forceAttach: createForceAttachCaller(contract),
					contract: () => contract,
				}
			}

			const result = createPolicyFactoryContract(provider)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
			expect(JSON.stringify(result(address))).toEqual(
				JSON.stringify(expected(address))
			)
		})
	})
})
