import Web3 from 'web3'
import { marketAbi } from './abi'
import { createBaseSchemaCaller } from './schema'
import { CustomOptions } from '../option'

describe('schema.ts', () => {
	describe('createBaseSchemaCaller', () => {
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

			const expected: Promise<string[]> = marketContract.methods.schema().call()

			const result = createBaseSchemaCaller(marketContract)

			expect(JSON.stringify(result)).toEqual(JSON.stringify(expected))
		})
	})
})
