import Web3 from 'web3'
import { propertyAbi } from './abi'
import { createOwnerCaller } from './owner'
import { CustomOptions } from '../option'

describe('owner.spec.ts', () => {
	describe('createOwnerCaller', () => {
		it('check return value', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			// example address
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const options = ({} as any) as CustomOptions

			const propertyContract = new client.eth.Contract(propertyAbi, address, {
				...options
			})

			const expected: () => Promise<string> = async () =>
				propertyContract.methods
					.owner()
					.call()
					.then(result => result as string)

			const result = createOwnerCaller(propertyContract)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const value = 'value'

			const propertyContract = {
				methods: {
					owner: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value))
					})
				}
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createOwnerCaller(propertyContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const propertyContract = {
				methods: {
					owner: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createOwnerCaller(propertyContract as any)

			const result = await caller().catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
