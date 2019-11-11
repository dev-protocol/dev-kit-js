import Contract from 'web3/eth/contract'

export const createWithdrawCaller = (contract: Contract) => async (
	address: string
) =>
	contract.methods
		.withdraw([address])
		.call()
		.then(result => result as void)
