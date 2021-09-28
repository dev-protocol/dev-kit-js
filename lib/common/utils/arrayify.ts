export const arrayify = <T>(obj: Record<string, T>): ReadonlyArray<T> => {
	const keys = Object.keys(obj)
	const numericKeys = keys.filter((k) => !isNaN(Number(k)))
	return numericKeys.map((k) => obj[k])
}
