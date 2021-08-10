import { ethers } from 'ethers'
import { TxReceipt } from '../utils/web3-txs'

export type CreateVoteEthersCaller = (
	contract: ethers.Contract
) => (propertyAddress: string, agree: boolean) => Promise<TxReceipt>

export const createVoteEthersCaller: CreateVoteEthersCaller = (
	contract: ethers.Contract
): ((propertyAddress: string, agree: boolean) => Promise<TxReceipt>) => async (
	propertyAddress: string,
	agree: boolean
): Promise<TxReceipt> => contract.vote([propertyAddress, agree]).wait()
