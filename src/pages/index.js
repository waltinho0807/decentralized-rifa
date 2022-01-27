import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Units from 'ethereumjs-units'
import Web3Modal from "web3modal"

const lottery_address = 'contract address'
import Lottery from '../../artifacts/contracts/Lottery.sol/Lottery.json'

export default function Home()  {
  const [formInput, updateFormInput] = useState('')
  const router = useRouter()
    
  async function startLottery() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    let contract = new ethers.Contract(lottery_address, Lottery.abi, signer)
    let transaction = await contract.startLottery()
    let tx = await transaction.wait()
    
    router.push('/')
  }


  
  async function enter() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    let contract = new ethers.Contract(lottery_address, Lottery.abi, signer)
    let value = contract.getEntranceFee() 
    let transaction = await contract.enter({"value": value})
    let tx = await transaction.wait()
    
    router.push('/')
  }

  async function getPlayers() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    //const price = ethers.utils.parseUnits(formInput, 'ether')
    
    /* next, create the item */
    let contract = new ethers.Contract(lottery_address, Lottery.abi, signer)
    const players = await  contract.getPlayers();
    console.log(players)
    router.push('/')
  }

  async function getBalance() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    let contract = new ethers.Contract(lottery_address, Lottery.abi, signer)
    let balance = await  contract.getBalance();
    let premio = parseInt(balance._hex, 16);
    let premioString = premio.toString()
    let inCrypto = Units.convert(premioString, 'wei', 'eth')
    let finalPremium = inCrypto.substring(0, inCrypto.length -9)
    
    //console.log(premio)
    console.log(finalPremium)
    router.push('/')
  }

  async function getEntranceFee() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    let contract = new ethers.Contract(lottery_address, Lottery.abi, signer)
    let entranceValue = await contract.getEntranceFee()
    let value = parseInt(entranceValue._hex, 16);
    let valueString = value.toString()
    let inUsdt = Units.convert(valueString, 'wei', 'eth')
    
    let price = await contract.usdEntryFee() 
    console.log(inUsdt)
    console.log(price)
    
    router.push('/')
  }

  async function usdPrice() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    let contract = new ethers.Contract(lottery_address, Lottery.abi, signer)
    let entranceValue = await contract.usdEntryFee()
    let valueUsd = parseInt(entranceValue._hex, 16);
    let valueUsdString = valueUsd.toString()
    let inUsdt = Units.convert(valueUsdString, 'wei', 'eth')
    
    console.log(inUsdt)
    
    
    router.push('/')
  }

  async function endLottery() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    let contract = new ethers.Contract(lottery_address, Lottery.abi, signer)
    let transaction = await contract.endLottery()
    let tx = await transaction.wait()
    
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput(e.target.value )}
        />
        <button onClick={enter} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Enter in Lottery
        </button>
      </div>
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput(e.target.value )}
        />
        <button onClick={startLottery} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Start Lottery
        </button>
      </div>
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput(e.target.value )}
        />
        <button onClick={getPlayers} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Players
        </button>
      </div>
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput(e.target.value )}
        />
        <button onClick={endLottery} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          end Lottery
        </button>
      </div>
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput(e.target.value )}
        />
        <button onClick={getBalance} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Premio
        </button>
      </div>
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput(e.target.value )}
        />
        <button onClick={getEntranceFee} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Entrance Value
        </button>
      </div>
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput(e.target.value )}
        />
        <button onClick={usdPrice} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Usd Value
        </button>
      </div>
    </div>
  )
}
