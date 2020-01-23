import Web3 from 'web3'
import { lockupAbi } from './abi'
import { createGetValueCaller } from './getValue'
import { CustomOptions } from '../option'

describe('getValue.spec.ts', () => {
	describe('createGetValueCaller', () => {
		it('check return value', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			// example address
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const options = ({} as any) as CustomOptions

			const lockupContract = new client.eth.Contract(lockupAbi, address, {
				...options
			})

			const expected: () => Promise<string> = async () =>
				lockupContract.methods
					.owner()
					.call()
					.then((result: string) => result)

			const result = createGetValueCaller(lockupContract)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const value = 'value'

			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					getValue: (property: string, account: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value))
					})
				}
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetValueCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'0xC7b8B28E498233113b270B1E1e0f91049a31467a'
			)

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					getValue: (property: string, account: string) => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createGetValueCaller(lockupContract as any)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
				'0xC7b8B28E498233113b270B1E1e0f91049a31467a'
			).catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
