/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateForceAttachCaller = (
	contract: Contract,
	client: Web3
) => (policy: string) => Promise<boolean>

export const createForceAttachCaller: CreateForceAttachCaller = (
	contract: Contract,
	client: Web3
) => async (policy: string) =>
	execute({
		contract,
		method: 'forceAttach',
		mutation: true,
		client,
		args: [policy],
	}).then(T)
