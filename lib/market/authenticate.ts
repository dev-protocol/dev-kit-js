/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { getAccount } from '../utils/getAccount'

export type CreateAuthenticateCaller = (
	contract: Contract,
	client: Web3
) => (address: string, args: string[]) => Promise<string>

export const createAuthenticateCaller: CreateAuthenticateCaller = (
	contract: Contract,
	client: Web3
) => async (address: string, args: string[]) => {
	await contract.methods
		.authenticate(address, ...args)
		.send({ from: await getAccount(client) })
		.then((result: boolean) => result)

	return new Promise<string>((resolve, reject) =>
		contract.events
			.authenticatedCallback({}, (_: any, event: any) => {
				resolve(event.address)
			})
			.on('error', (error: Error) => reject(error))
	)
}
