import type { UndefinedOr } from '@devprotocol/util-ts'
import {
	createMetricsGroupContract,
	CreateMetricsGroupContract,
} from '../../../ethereum/metrics-group'
import { clientsRegistry } from './clientsRegistry'
import { ContractRunner } from 'ethers'

type Results = readonly [UndefinedOr<CreateMetricsGroupContract>, undefined]

const cache: WeakMap<ContractRunner, Results> = new WeakMap()

export const clientsMetricsGroup = async (
	provider: ContractRunner
): Promise<Results> => {
	const res =
		cache.get(provider) ??
		(await (async () => {
			const [registry] = await clientsRegistry(provider)
			const l1 = registry
				? createMetricsGroupContract(provider)(await registry.metricsGroup())
				: undefined
			const l2 = undefined
			const results: Results = [l1, l2]
			// eslint-disable-next-line functional/no-expression-statement
			cache.set(provider, results)
			return results
		})())
	return res
}
