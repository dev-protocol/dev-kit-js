/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'

export type CreateDescriptorOfPropertyByPayloadCaller = (
	contract: ethers.Contract,
) => (propertyAddress: string, payload: string | Uint8Array) => Promise<string>

export const createDescriptorOfPropertyByPayloadCaller: CreateDescriptorOfPropertyByPayloadCaller =

		(contract: ethers.Contract) =>
		async (
			propertyAddress: string,
			payload: string | Uint8Array,
		): Promise<string> => {
			const res = execute<QueryOption>({
				contract,
				method: 'descriptorOfPropertyByPayload',
				args: [propertyAddress, payload],
				mutation: false,
			})
			return res
		}
