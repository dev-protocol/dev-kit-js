import { Contract } from 'web3-eth-contract/types'
import { execute } from '../utils/execute'
import Web3 from 'web3'
import { watchEvent } from '../utils/watchEvent'

export type CreateAllocateCaller = (
	contract: Contract,
	client: Web3
) => (address: string) => Promise<string>

export const createAllocateCaller: CreateAllocateCaller = (
	contract: Contract,
	client: Web3
) => async (address: string) =>
	new Promise((resolve, reject) => {
		// eslint-disable-next-line functional/no-expression-statement
		execute({
			contract,
			method: 'allocate',
			mutation: true,
			client,
			args: [address],
		}).catch((err) => reject(err))
		// eslint-disable-next-line functional/no-expression-statement
		watchEvent({
			contract,
			resolver: async (e) =>
				((metricsAddress) => (metricsAddress === address ? true : false))(
					e.event === 'AllocationResult'
						? (e.returnValues._metrics as string)
						: undefined
				),
		})
			.then((res) => resolve(res.returnValues._result as string))
			.catch((err) => reject(err))
	})
