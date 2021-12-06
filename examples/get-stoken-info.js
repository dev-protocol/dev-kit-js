import { ethers } from 'ethers'
import { contractFactory, addresses } from '@devprotocol/dev-kit'

// use main net
const contractAddress = addresses.eth.main.sTokens
const provider = new ethers.providers.JsonRpcProvider(process.env.WEB3_PROVIDER_URL)
const contract = contractFactory(provider)
const propertyAddress = '0xac1AC9d00314aE7B4a7d6DbEE4860bECedF92309'

const getSTokenIdsByPropertyAddress = async (contract, propertyAddress) => {
  const res = await contract.sTokens(contractAddress).positionsOfProperty(propertyAddress)
  return res
}

const getSTokenPositions = async (contract, sTokenId) => {
  const res = await contract.sTokens(contractAddress).positions(sTokenId)
  return res
}

const getSTokenRewards = (contract, sTokenId) => {
  return contract.sTokens(contractAddress).rewards(sTokenId)
}


// get stoken ids
const sTokenIds = await getSTokenIdsByPropertyAddress(contract, propertyAddress)

// get postions data by stoken id
const res = await Promise.all(sTokenIds.map(async (sTokenId) => {
  const positions = await getSTokenPositions(contract, sTokenId)
  const rewards = await getSTokenRewards(contract, sTokenId)
  return { sTokenId, positions, rewards }
}))
console.log(res)
