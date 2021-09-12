import bent from 'bent'
jest.mock('bent')
;(bent as unknown as jest.Mock).mockImplementation(
	() => async (_: any, query: any) => {
		return query.query.includes('property_factory_create_aggregate')
			? {
					data: {
						property_factory_create_aggregate: {
							aggregate: {
								count: 999,
							},
						},
					},
			  }
			: query.query.includes('bundle')
			? {
					data: {
						bundle: {
							ethPrice: '644.0464312079124850378698962438385',
						},
					},
			  }
			: {
					data: {
						token: {
							derivedETH: '0.01150918413764253552393494096221037',
						},
					},
			  }
	}
)
import { getStats } from './getStats'
import { createDevkitContract } from '../contract'

jest.mock('ethers')
jest.mock('../contract')

describe('getStats.ts', () => {
	describe('getStats', () => {
		it('returns stats', async () => {
			;(createDevkitContract as unknown as jest.Mock).mockImplementation(() => {
				return {
					allocator: () => ({
						calculateMaxRewardsPerBlock: () => '134196471886248864',
					}),
					dev: () => ({
						balanceOf: () => '2343987666147792601927123',
						totalSupply: () => '12714973254932553412724975',
					}),
					lockup: () => ({
						getAllValue: () => '561691256328145520467695',
					}),
					policy: () => ({
						holdersShare: () => '68440200661986920',
					}),
					registry: () => ({
						allocator: () => '0x112233',
						lockup: () => '0x223344',
						policy: () => '0x445566',
						token: () => '0x998877',
					}),
				}
			})

			const stats = await getStats('http://localhost')
			const expected = {
				devPrice: 7.412448969963391,
				totalCap: 94249090.40663686,
				marketCap: 7375645.59891638003044179337,
				stakingRatio: 0.5644940118894408747,
				stakingAmount: 561691.256328145520467695,
				stakerAPY: 0.24612450890836665613,
				creatorAPY: 0.256170407231157127,
				annualSupplyGrowthRatio: 0.02218916680648151275,
				assetOnboarded: 999,
				creatorsRewardsDEV: 143888.67787176130060727095,
				creatorsRewardsUSD: 1066567.48207993122416401861838448991779145,
			}

			expect(stats).toEqual(expected)
		})
	})
})
