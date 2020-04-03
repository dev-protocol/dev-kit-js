import Web3 from 'web3'
import { withdrawAbi } from './abi'
import { createGetRewardsAmountCaller } from './getRewardsAmount'
import { CustomOptions } from '../option'

describe('getRewardsAmount.spec.ts', () => {
	describe('createGetRewardsAmountCaller', () => {
		it('check return value', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			// example address
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const options = ({} as any) as CustomOptions

			const withdrawContract = new client.eth.Contract(withdrawAbi, address, {
				...options
			})

			const expected: () => Promise<string> = async () =>
				withdrawContract.methods
					.getRewardsAmount()
					.call()
					.then((result: string) => result)

			const result = createGetRewardsAmountCaller(withdrawContract)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const value = 'value'

			const withdrawContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					getRewardsAmount: (address: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value))
					})
				}
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetRewardsAmountCaller(withdrawContract as any)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const withdrawContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					getRewardsAmount: (address: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetRewardsAmountCaller(withdrawContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
