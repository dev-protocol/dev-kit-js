import Web3 from 'web3'
import { devAbi } from './abi'
import { createTransferCaller } from './transfer'
import { CustomOptions } from '../option'
import { getAccount } from '../utils/getAccount'

const web3Stub = ({
	eth: {
		async getAccounts() {
			return ['0x']
		}
	}
} as unknown) as Web3

describe('transfer.spec.ts', () => {
	describe('createTransferCaller', () => {
		it('check return value', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			// example address
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const options = ({} as any) as CustomOptions

			const propertyContract = new client.eth.Contract(devAbi, address, {
				...options
			})

			const expected: (to: string, value: number) => Promise<boolean> = async (
				to: string,
				value: number
			) =>
				propertyContract.methods
					.transfer(to, value)
					.send({ from: await getAccount(client) })
					.then((result: boolean) => result)

			const result = createTransferCaller(propertyContract, client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const success = true
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const propertyContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					transfer: (to: string, value: number) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(success))
					})
				}
			}

			const expected = success

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTransferCaller(propertyContract as any, web3Stub)

			const result = await caller(to, value)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'
			const to = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			const value = '12345'

			const propertyContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					transfer: (to: string, value: number) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTransferCaller(propertyContract as any, web3Stub)

			const result = await caller(to, value).catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
