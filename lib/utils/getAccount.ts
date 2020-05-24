import Web3 from 'web3'

const map: WeakMap<Web3, string> = new WeakMap()

export const getAccount = async (web3: Web3): Promise<string> =>
	(async (res: string | undefined): Promise<string> =>
		typeof res === 'string'
			? res
			: web3.eth
					.getAccounts()
					.then(
						([account]: readonly string[]) =>
							map.set(web3, account).get(web3) as string
					))(map.get(web3))
