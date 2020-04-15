import Web3 from 'web3'
import { marketAbi } from './abi'
import { createVoteCaller } from './vote'
import { CustomOptions } from '../option'
import { getAccount } from '../utils/getAccount'

const web3Stub = ({
	eth: {
		async getAccounts() {
			return ['0x']
		}
	}
} as unknown) as Web3

describe('vote.ts', () => {
	describe('createVoteCaller', () => {
		it('check return value', () => {
			const host = 'localhost'
			const client = new Web3()
			client.setProvider(new Web3.providers.HttpProvider(host))

			// example address
			const address = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const options = ({} as any) as CustomOptions
			const marketContract = new client.eth.Contract(marketAbi, address, {
				...options
			})

			const expected: (tokenNumber: string) => Promise<void> = async (
				tokenNumber: string
			) =>
				marketContract.methods
					.vote([tokenNumber])
					.send({ from: await getAccount(client) })
					.then(() => {})

			const result = createVoteCaller(marketContract, client)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})

		it('call success', async () => {
			const tokenNumber = '415015037515107510571371750157109'

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					vote: (tokenNumber: string) => ({
						send: jest.fn().mockImplementation(async () => Promise.resolve())
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createVoteCaller(marketContract as any, web3Stub)

			const result = await caller(tokenNumber)

			expect(result).toEqual(undefined)
		})

		it('call failure', async () => {
			const error = 'error'

			const tokenNumber = '415015037515107510571371750157109'

			const marketContract = {
				methods: {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					vote: (tokenNumber: string) => ({
						send: jest
							.fn()
							.mockImplementation(async () => Promise.reject(error))
					})
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createVoteCaller(marketContract as any, web3Stub)

			const result = await caller(tokenNumber).catch(err => err)

			expect(result).toEqual(error)
		})
	})
})
