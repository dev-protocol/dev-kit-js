/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { T } from 'ramda'

export type CreateIsFreezedCaller = (
	contract: ethers.Contract,
) => (tokenId: number) => Promise<boolean>

export const createIsFreezedCaller: CreateIsFreezedCaller =
	(contract: ethers.Contract) =>
	async (tokenId: number): Promise<boolean> =>
		execute<QueryOption>({
			contract,
			method: 'isFreezed',
			args: [String(tokenId)],
			mutation: false,
		}).then(T)
