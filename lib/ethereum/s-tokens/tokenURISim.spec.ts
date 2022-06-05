import { constants } from 'ethers'
import { createTokenURISimCaller } from './tokenURISim'

describe('tokenURISim.spec.ts', () => {
	describe('createTokenURICaller', () => {
		it('call success', async () => {
			const data = {
				name: 'NAME',
				description: 'DESCRIPTION',
				image: 'data:image/svg+xml;base64,<svg></svg>',
			}
			const value = `data:application/json;base64,eyJuYW1lIjoiTkFNRSIsICJkZXNjcmlwdGlvbiI6IkRFU0NSSVBUSU9OIiwgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsPHN2Zz48L3N2Zz4ifQ==`

			const contract = {
				tokenURISim: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			const expected = data

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTokenURISimCaller(contract as any)

			expect(await caller()).toEqual(expected)
		})

		it('apply defaut values', async () => {
			const value = `data:application/json;base64,eyJuYW1lIjoiTkFNRSIsICJkZXNjcmlwdGlvbiI6IkRFU0NSSVBUSU9OIiwgImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsPHN2Zz48L3N2Zz4ifQ==`

			const contract = {
				tokenURISim: jest
					.fn()
					.mockImplementation(async () => Promise.resolve(value)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTokenURISimCaller(contract as any)

			await caller()
			await caller({ tokenId: 1 })
			await caller({ owner: '0xABC' })
			await caller({ positions: { pendingReward: '1', property: '0xXYZ' } })
			await caller({ rewards: { cumulativeReward: '2' } })
			expect(contract.tokenURISim.mock.calls[0]).toEqual([
				'0',
				constants.AddressZero,
				[constants.AddressZero, '0', '0', '0', '0'],
				['0', '0', '0'],
			])
			expect(contract.tokenURISim.mock.calls[1]).toEqual([
				'1',
				constants.AddressZero,
				[constants.AddressZero, '0', '0', '0', '0'],
				['0', '0', '0'],
			])
			expect(contract.tokenURISim.mock.calls[2]).toEqual([
				'0',
				'0xABC',
				[constants.AddressZero, '0', '0', '0', '0'],
				['0', '0', '0'],
			])
			expect(contract.tokenURISim.mock.calls[3]).toEqual([
				'0',
				constants.AddressZero,
				['0xXYZ', '0', '0', '0', '1'],
				['0', '0', '0'],
			])
			expect(contract.tokenURISim.mock.calls[4]).toEqual([
				'0',
				constants.AddressZero,
				[constants.AddressZero, '0', '0', '0', '0'],
				['0', '2', '0'],
			])
		})

		it('call failure', async () => {
			const error = 'error'

			const contract = {
				tokenURISim: jest
					.fn()
					.mockImplementation(async () => Promise.reject(error)),
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const caller = createTokenURISimCaller(contract as any)

			const result = await caller().catch((err) => err)

			expect(result).toEqual(error)
		})
	})
})