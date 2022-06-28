import { Contract, ContractInterface } from '@ethersproject/contracts'
import { JsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { BaseTransaction } from '@gnosis.pm/safe-apps-sdk'

export default async function encodeTransaction<
  MyContract extends Contract,
  Method extends keyof MyContract & string,
>(
  address: string,
  abi: ContractInterface,
  provider: JsonRpcProvider | JsonRpcSigner,
  method: Method,
  params: Parameters<MyContract[Method]>,
): Promise<BaseTransaction> {
  let data = ''
  try {
    const contract = new Contract(address, abi, provider) as MyContract
    const deployedContract = await contract.deployed()
    data = deployedContract.interface.encodeFunctionData(method, params)
  } catch (e) {
    console.log({ e })
  }
  return {
    to: address,
    value: '0',
    data,
  }
}
