import { solidityPacked } from 'ethers'

export const pathOf = (_path: readonly (string | bigint)[]): string => {
	const abi = _path.map((value) =>
		typeof value === 'string'
			? 'address'
			: typeof value === 'bigint'
			? 'uint24'
			: (undefined as never),
	)
	const path = solidityPacked(abi, _path)

	return path
}
