import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateRegistriesCaller = (
	contract: ethers.Contract,
) => (key: string) => Promise<string>

export const createRegistriesCaller: CreateRegistriesCaller =
	(contract: ethers.Contract) => (key: string) =>
		execute<QueryOption>({
			contract,
			method: 'registries',
			args: [key],
			mutation: false,
		})
