const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const link_token = '0x01BE23585060835E02B77ef475b0Cc51aA1e0709';
  const vrf_coordinator = '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B';
  const eth_usd_price_feed = '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e';
  const key_hash = '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311'; 
  const fee = '100000000000000000';

  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy(
    eth_usd_price_feed,
    vrf_coordinator,
    link_token,
    fee,
    key_hash
  );
  await lottery.deployed();
  console.log("Lottery deployed to:", lottery.address);

  
  let config = `
  export const lotteryaddress = "${lottery.address}"
  `

  let data = JSON.stringify(config)
  fs.writeFileSync('config.js', JSON.parse(data))

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });