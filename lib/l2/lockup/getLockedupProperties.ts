import { ethers } from 'ethers'
import { always } from 'ramda'
import { execute, QueryOption } from '../../common/utils/execute'

export type LockedupProperty = Readonly<{
	readonly property: string
	readonly value: string
}>

export type CreateGetLockedupPropertiesCaller = (
	contract: ethers.Contract
) => () => Promise<readonly LockedupProperty[]>

export const createGetLockedupPropertiesCaller: CreateGetLockedupPropertiesCaller =
	(contract: ethers.Contract) =>
		always(
			execute<QueryOption, readonly LockedupProperty[]>({
				contract,
				method: 'getLockedupProperties',
				mutation: false,
			})
		)
