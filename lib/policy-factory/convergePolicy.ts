/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { Contract } from 'web3-eth-contract/types'
import Web3 from 'web3'
import { execute } from '../utils/execute'
import { T } from 'ramda'

export type CreateConvergePolicyCaller = (
	contract: Contract,
	client: Web3
) => (currentPolicyAddress: string) => Promise<boolean>

export const createConvergePolicyCaller: CreateConvergePolicyCaller = (
	contract: Contract,
	client: Web3
) => async (currentPolicyAddress: string) =>
	execute({
		contract,
		method: 'convergePolicy',
		mutation: true,
		client,
		args: [currentPolicyAddress],
	}).then(T)
