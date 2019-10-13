import Web3 from 'web3'

export const DevClient = (host: string, timeout?: number): Web3 => {
	const client = new Web3()

	client.setProvider(new Web3.providers.HttpProvider(host, timeout))
	return client
}
