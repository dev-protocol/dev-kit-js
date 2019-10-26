import Web3 from 'web3'
import { marketAbi } from './abi'
import { createCalculateCaller } from './calculate'
import { CustomOptions } from '../option'

describe('calculate.ts', () => {
	describe('createCalculateCaller', () => {
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

			// const metrics = '0x0472ec0185ebb8202f3d4ddb0226998889663cf2'
			// const start = '415015037515107510571371750157109'
			// const end = '415015037515107510571371750157109'

			const expected: (
				metrics: string,
				start: string,
				end: string
			) => Promise<boolean> = async (
				metrics: string,
				start: string,
				end: string
			) =>
				marketContract.methods
					.calculate(metrics, start, end)
					.call()
					.then(result => JSON.parse(result) as boolean)

			const result = createCalculateCaller(marketContract)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
