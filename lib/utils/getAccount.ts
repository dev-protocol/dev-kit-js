import Web3 from 'web3'

const map: WeakMap<Web3, string> = new WeakMap()

export const getAccount = async (web3: Web3): Promise<string> =>
	(async (res) =>
		typeof res === 'string'
			? res
			: web3.eth.getAccounts().then(([account]) => {
					// eslint-disable-next-line functional/no-expression-statement
					map.set(web3, account)
					return account
			  }))(map.get(web3))
