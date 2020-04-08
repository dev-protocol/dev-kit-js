import { Contract } from 'web3-eth-contract/types'

export type CreateAuthenticateCaller = (
	contract: Contract
) => (address: string, args: string[]) => Promise<string>

export const createAuthenticateCaller: CreateAuthenticateCaller = (
	contract: Contract
) => async (address: string, args: string[]) => {
	await contract.methods
		.authenticate([address, ...args])
		.send()
		.then((result: boolean) => result)

	return new Promise<string>((resolve, reject) =>
		contract.events
			.authenticatedCallback({}, (_: any, event: any) => {
				resolve(event.address)
			})
			.on('error', (error: Error) => reject(error))
	)
}
