import Web3 from 'web3'
import { lockupAbi } from './abi'
import { createWithdrawCaller } from './withdraw'
import { CustomOptions } from '../option'
import { getAccount } from '../utils/getAccount'

const web3Stub = ({
	eth: {
		async getAccounts() {
			return ['0x']
		}
	}
} as unknown) as Web3

describe('withdraw.spec.ts', () => {
	describe('createWithdrawCaller', () => {
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

			const expected: () => Promise<true> = async () =>
				lockupContract.methods
					.withdraw()
					.send({ from: await getAccount(client) })
					.then(() => true)

			const result = createWithdrawCaller(lockupContract, client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const value = true

			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdraw: (property: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.resolve(value))
					})
				}
			}

			const expected = value

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(lockupContract as any, web3Stub)

			const result = await caller('0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5')

			expect(result).toEqual(expected)
		})

		it('call failure', async () => {
			const error = 'error'

			const lockupContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					withdraw: (property: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createWithdrawCaller(lockupContract as any, web3Stub)

			const result = await caller(
				'0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5'
			).catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
