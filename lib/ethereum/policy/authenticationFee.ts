/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import { execute } from '../../common/utils/execute'

export type CreateAuthenticationFeeCaller = (
	contract: Contract
) => (assets: string, propertyAssets: string) => Promise<string>

export const createAuthenticationFeeCaller: CreateAuthenticationFeeCaller =
	(contract: Contract) =>
	async (assets: string, propertyAssets: string): Promise<string> =>
		execute({
			contract,
			method: 'authenticationFee',
			args: [assets, propertyAssets],
		})
