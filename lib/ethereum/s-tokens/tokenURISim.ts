/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { decode } from 'js-base64'
import { ethers, ZeroAddress, ZeroHash } from 'ethers'
import { execute, QueryOption } from '../../common/utils/execute'
import { values } from 'ramda'
import { TokenURI } from './tokenURI'

export type TokenURISimProps = {
	readonly tokenId?: number
	readonly owner?: string
	readonly positions?: {
		readonly property?: string
		readonly amount?: string
		readonly price?: string
		readonly cumulativeReward?: string
		readonly pendingReward?: string
	}
	readonly rewards?: {
		readonly entireReward?: string
		readonly cumulativeReward?: string
		readonly withdrawableReward?: string
	}
	readonly payload?: string | Uint8Array
}

export type CreateTokenURISimCaller = (
	contract: ethers.Contract
) => (props?: TokenURISimProps) => Promise<TokenURI>

type DeepNonNullable<T> = {
	readonly [P in keyof T]-?: NonNullable<T[P]>
}
const defaultPositions: DeepNonNullable<TokenURISimProps['positions']> = {
	property: ZeroAddress,
	amount: '0',
	price: '0',
	cumulativeReward: '0',
	pendingReward: '0',
}
const defaultRewards: DeepNonNullable<TokenURISimProps['rewards']> = {
	entireReward: '0',
	cumulativeReward: '0',
	withdrawableReward: '0',
}

export const createTokenURISimCaller: CreateTokenURISimCaller =
	(contract: ethers.Contract) =>
	async (props: TokenURISimProps = {}) => {
		const tokenId = String(props.tokenId ?? 0)
		const owner = props.owner ?? ZeroAddress
		const positions = { ...defaultPositions, ...props.positions }
		const rewards = { ...defaultRewards, ...props.rewards }
		const payload = props.payload ? props.payload : ZeroHash
		const res = await execute<QueryOption>({
			contract,
			method: 'tokenURISim',
			args: [tokenId, owner, values(positions), values(rewards), payload],
			mutation: false,
		})
		const decoded = decode(
			res.replace(/^data:application\/json;base64,(.*)/, '$1')
		)
		return JSON.parse(decoded)
	}
