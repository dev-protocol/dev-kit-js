import Web3 from 'web3'
import { allocatorAbi } from './abi'
import { CustomOptions } from '../option'
import { createWithdrawCaller } from './withdraw'

describe('withdraw.ts', () => {
	describe('createWithdrawCaller', () => {
		it('check return value', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			// example address
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const options = ({} as any) as CustomOptions
			const allocatorContract = new client.eth.Contract(allocatorAbi, address, {
				...options
			})

			const expected: (address: string) => Promise<void> = async (
				address: string
			) =>
				allocatorContract.methods
					.withdraw([address])
					.send()
					.then((result: void) => result)

			const result = createWithdrawCaller(allocatorContract)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const allocatorContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdraw: (address: string) => ({
						send: jest.fn().mockImplementation(async () => Promise.resolve())
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(allocatorContract as any)

			const result = await caller(address)

			expect(result).toEqual(undefined)
		})

		it('call failure', async () => {
			const error = 'error'

			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'

			const allocatorContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdraw: (address: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(allocatorContract as any)

			const result = await caller(address).catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
