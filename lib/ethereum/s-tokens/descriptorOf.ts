/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateDescriptorOfCaller = (
	contract: ethers.Contract,
) => (propertyAddress: string) => Promise<string>

export const createDescriptorOfCaller: CreateDescriptorOfCaller =
	(contract: ethers.Contract) =>
	async (propertyAddress: string): Promise<string> => {
		const res = execute<QueryOption>({
			contract,
			method: 'descriptorOf',
			args: [propertyAddress],
			mutation: false,
		})
		return res
	}
