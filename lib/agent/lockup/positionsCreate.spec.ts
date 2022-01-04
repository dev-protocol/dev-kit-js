import { ethers, Wallet } from 'ethers'
import { Options, positionsCreate } from './positionsCreate'
import { testProviders } from '../common/const'
import { env } from '../common/env'

describe('positionsCreate.ts', () => {
	const propertyAddress = '0x38c4bF6cD20d157EE45553b0fAD13B0c6750b439'
	const amount = '100'
	const overrides = {
		overrides: undefined,
		fallback: undefined,
	}

	it("", async () => {
		// await window.ethereum.enable()
        const wallet = new ethers.Wallet(env.mnemonic, testProviders.ropsten)
        console.log(wallet)
        const options: Options = {
			wallet,
			propertyAddress,
			amount,
			overrides,
		}
		const tx = await positionsCreate(options).then(result => result)
		console.log(tx)
	})
	it('return undefined if network is not valid', async () => {
		const wallet = new ethers.Wallet(env.mnemonic, testProviders.polyMumbai)
		const options: Options = {
			wallet,
			propertyAddress,
			amount,
			overrides,
		}
        const tx = await positionsCreate(options).then(result => result)
		expect(tx).toEqual(undefined)
	})
})

// declare global {
//     interface Window {
//         ethereum: any;
//     }
// }
