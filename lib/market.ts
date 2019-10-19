import { devKitClient, CustomOptions } from './client'
import { marketAbi } from './market-abi'

const marketContract = (host: string, timeout?: number) => (
	address?: string,
	options?: CustomOptions
) =>
	new (devKitClient(host, timeout)).eth.Contract(marketAbi, address, {
		...options
	})

export const schema = (host: string, timeout?: number) => (
	address?: string,
	options?: CustomOptions
) => async (): Promise<{ 0: string }> =>
	marketContract(host, timeout)(address, options)
		.methods.schema()
		.call()
