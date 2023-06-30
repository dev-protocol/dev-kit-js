import { contractFactory } from './ethereum/contract'
import { addresses } from './addresses'
import { utils } from './common/utils'
import { client } from './ethereum/client'
import {
	createSimpleCollectionsContract,
	Image,
} from './ethereum/simpleCollection'

export default {
	contractFactory,
	addresses,
	utils,
	client,
	createSimpleCollectionsContract,
	Image,
}
