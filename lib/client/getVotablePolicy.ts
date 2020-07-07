import { PolicySetContract } from '../policy-set'

const ZERO = '0x0000000000000000000000000000000000000000'

export type CreateGetVotablePolicyCaller = (
	policySet: PolicySetContract
) => () => Promise<readonly string[]>

export const createGetVotablePolicy: CreateGetVotablePolicyCaller = (
	policySet: PolicySetContract
	// eslint-disable-next-line functional/functional-parameters
) => async (): Promise<readonly string[]> => {
	const index = await policySet.count().then(Number)
	const addresses = await Promise.all(
		new Array(index).fill(0).map((_, i) => policySet.get(String(i)))
	)
	return addresses.filter((x) => x !== ZERO)
}
