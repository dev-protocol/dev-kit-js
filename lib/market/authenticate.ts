import Contract from 'web3/eth/contract'

export const createAuthenticateCaller = (contract: Contract) => async (
	address: string,
	args: string[]
) => {
	await contract.methods
		.authenticate([address, ...args])
		.call()
		.then(result => result as boolean)

	return new Promise<string>((resolve, reject) =>
		contract.events
			.authenticatedCallback({}, (_, event) => {
				resolve(event.address)
			})
			.on('error', error => reject(error))
	)
}
