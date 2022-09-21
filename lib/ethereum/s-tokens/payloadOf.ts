/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { ethers } from 'ethers'
import {
	execute,
	FallbackableOverrides,
	MutationOption,
} from '../../common/utils/execute'
import { TransactionResponse } from '@ethersproject/abstract-provider'

export type CreatePayloadOfCaller = (
	contract: ethers.Contract
) => (
	tokenId: number,
	overrides?: FallbackableOverrides
) => Promise<TransactionResponse>

export const createpayloadOfCaller: CreatePayloadOfCaller =
	(contract: ethers.Contract) =>
	async (tokenId: number, overrides?: FallbackableOverrides) =>
		execute<MutationOption>({
			contract,
			method: 'payloadOf',
			args: [String(tokenId)],
            overrides,
			mutation: true,
		})
