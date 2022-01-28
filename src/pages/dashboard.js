import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Units from 'ethereumjs-units'
import Web3Modal from "web3modal"
import ReadContract from "../utils"


const lottery_address = '0x3260dC18f8aA89edA6B8b5E58c8CB95005AaaBce'
import Lottery from '../../artifacts/contracts/Lottery.sol/Lottery.json'

export default function Dashboard()  {
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
    <div className='container mx-auto sm m3'>
        <div className='m-1.5'>
          <div class="md:flex">
            <div class="md:flex-shrink-0">
             <img class="rounded-lg md:w-56" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" width="448" height="299" alt="Woman paying for a purchase"/>
           </div>
           <div class="mt-4 md:mt-0 md:ml-6">
           <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">Marketing</div>
             <a href="#" class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Finding customers for your new business</a>
             <p class="mt-2 text-gray-600">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
           </div>
         </div>
        </div>
        <div className='m-1.5'>
          <div class="md:flex">
            <div class="md:flex-shrink-0">
             <img class="rounded-lg md:w-56" src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=448&q=80" width="448" height="299" alt="Woman paying for a purchase"/>
           </div>
           <div class="mt-4 md:mt-0 md:ml-6">
           <div class="uppercase tracking-wide text-sm text-indigo-600 font-bold">Marketing</div>
             <a href="#" class="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline">Finding customers for your new business</a>
             <p class="mt-2 text-gray-600">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
           </div>
         </div>
        </div>
        <div>
        <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
            Main
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              Hero Message
            </span>
            to sell yourself!
          </h1>
          <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
            Sub-hero message, not too long and not too short. Make it just right!
          </p>

          <form class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <div class="mb-4">
              <label class="block text-blue-300 py-2 font-bold mb-2" for="emailaddress">
                Signup for our newsletter
              </label>
              <input
                class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="emailaddress"
                type="text"
                placeholder="you@somewhere.com"
              />
            </div>

            <div class="flex items-center justify-between pt-4">
              <button
                class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
        </div>
        <div></div>
        <div></div>
   
    </div>
  )
}


