import { ethers } from 'ethers'
import Units from 'ethereumjs-units'
import Web3Modal from "web3modal"

const lottery_address = '0x3260dC18f8aA89edA6B8b5E58c8CB95005AaaBce'
import Lottery from '../artifacts/contracts/Lottery.sol/Lottery.json'


export default async function ReadContract () {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    const contract = new ethers.Contract(lottery_address, Lottery.abi, signer)

    return  contract
}

