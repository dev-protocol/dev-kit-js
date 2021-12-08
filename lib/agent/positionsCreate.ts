import { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { FallbackableOverrides } from './../common/utils/execute'

export type Options = {
    readonly provider: Provider | Signer,
    readonly propertyAddress: string,
    readonly amount: string,
    readonly overrides?: FallbackableOverrides
}

export type positionsCreate = (options: Options) => Promise<TransactionResponse>


