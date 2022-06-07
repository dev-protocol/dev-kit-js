import type { UndefinedOr } from '@devprotocol/util-ts'
import { createPolicyContract, PolicyContract } from '../../../ethereum/policy'
import {
	createPolicyContract as createPolicyContractL2,
	PolicyContract as PolicyContractL2,
} from '../../../l2/policy'
import type { BaseProvider } from '@ethersproject/providers'
import { clientsRegistry } from './clientsRegistry'

type Results = readonly [
	UndefinedOr<PolicyContract>,
	UndefinedOr<PolicyContractL2>
]

// eslint-disable-next-line functional/prefer-readonly-type
const cache: WeakMap<BaseProvider, Results> = new WeakMap()

export const clientsPolicy = async (
	provider: BaseProvider
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const [registryl1, registryl2] = await clientsRegistry(provider)
			const l1 = registryl1
				? createPolicyContract(provider)(await registryl1.policy())
				: undefined
			const l2 = registryl2
				? createPolicyContractL2(provider)(
						await registryl2.registries('Policy')
				  )
				: undefined

			const results: Results = [l1, l2]
			const map = cache.get(provider)
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
