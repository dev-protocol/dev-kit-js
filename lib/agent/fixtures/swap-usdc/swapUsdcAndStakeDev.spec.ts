import { createSwapUsdcAndStakeDevCaller } from './swapUsdcAndStakeDev'
import { stubTransactionResposeFactory } from '../../../common/utils/for-test'
import { ethers } from 'ethers'

describe('swapUsdcAndStakeDev.spec.ts', () => {
    describe('createSwapUsdcAndStakeDevCaller', () => {
        it('call success', async () => {
            const stubTx = stubTransactionResposeFactory({})
            const swapContract = {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                swapUsdcAndStakeDev: (propertyAddress: string) =>
                    Promise.resolve(stubTx),
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const caller = createSwapUsdcAndStakeDevCaller(swapContract as any)

            const provider = await ethers.getDefaultProvider()
            const block = await provider.getBlock('latest')

            const result = await caller(
                '0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
                '1000000000000000000',
                '1000000000000000000',
                block.timestamp + 300,
                '0x',
                {},
                '0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
                '1000'
            )

            expect(result).toEqual(stubTx)
        })

        it('call failure', async () => {
            const error = 'error'
            const swapContract = {
                swapUsdcAndStakeDev: jest
                    .fn()
                    .mockImplementation(async () => Promise.reject(error)),
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const caller = createSwapUsdcAndStakeDevCaller(swapContract as any)

            const provider = await ethers.getDefaultProvider()
            const block = await provider.getBlock('latest')

            const result = await caller(
                '0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
                '1000000000000000000',
                '1000000000000000000',
                block.timestamp + 300,
                '0x',
                {},
                '0x80a25ACDD0797dfCe02dA25e4a55A4a334EE51c5',
                '1000'
            ).catch((err) => err)

            expect(result).toEqual(error)

        })
    })
})