import Web3 from 'web3'
import { addressConfigAbi } from './abi'
import { createLockupCaller } from './lockup'
import { CustomOptions } from '../option'

describe('createLockupCaller.spec.ts', () => {
	describe('createLockupCaller', () => {
		it('check return value', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			// example address
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const options = ({} as any) as CustomOptions

			const addressConfigContract = new client.eth.Contract(
				addressConfigAbi,
				address,
				{
					...options
				}
			)

			const expected: () => Promise<string> = async () =>
				addressConfigContract.methods
					.lockup()
					.call()
					.then((result: string) => result)

			const result = createLockupCaller(addressConfigContract)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const value = 'value'

			const addressConfigContract = {
				methods: {
					lockup: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value))
					})
				}
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createLockupCaller(addressConfigContract as any)

			const result = await caller()

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const addressConfigContract = {
				methods: {
					lockup: () => ({
						call: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createLockupCaller(addressConfigContract as any)

			const result = await caller().catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
