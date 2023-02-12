import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateAuthenticationFeeCaller = (
	contract: ethers.Contract
) => (assets: string, propertyAssets: string) => Promise<string>

export const createAuthenticationFeeCaller: CreateAuthenticationFeeCaller =
	(contract: ethers.Contract) =>
	async (assets: string, propertyAssets: string): Promise<string> =>
		execute<QueryOption>({
			contract,
			method: 'authenticationFee',
			args: [assets, propertyAssets],
			mutation: false,
		})
