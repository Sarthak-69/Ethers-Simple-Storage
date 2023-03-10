const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
  // Connecting to a wallet
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  /*=======USING ENCRYPTED KEY========*/
  // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // )
  // wallet = await wallet.connect(provider)

  //Reading abi & bin files
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const bin = fs.readFileSync("./SimpleSTorage_sol_SimpleStorage.bin", "utf8");

  /*=======Deploying a contract========*/
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  console.log("Deploying! Please wait");
  const contract = await contractFactory.deploy();
  console.log(`Contract Address: ${contract.address}`);

  /*========DEPLOYING TRANSACTION TO GET TX. RECEIPT==========*/
  await contract.deployTransaction.wait(1); // 1 -> 'Block Size'

  /*==========GET NUMBER===========*/
  const currentFavNumber = await contract.retrieve();
  console.log(`Current Favourite Number is: ${currentFavNumber.toString()}`); //JS Template Literals
  const storedNum = await contract.store("7");
  await storedNum.wait(1);
  const updatedFavNumber = await contract.retrieve();
  console.log(`Updated Favourite Number is: ${updatedFavNumber.toString()}`);

  // /*=======Deploying a contract using only transaction data========*/
  // const gasPrice = ethers.utils.hexlify(20000000000);
  // const gasLimit = ethers.utils.hexlify(1000000);
  // const data = ethers.utils.hexlify(/* bin number in the file */);
  // await console.log("Let's deploy using only transaction data!");
  // const tx = {
  //   nonce: 5,
  //   gasPrice: gasPrice,
  //   gasLimit: gasLimit,
  //   to: null,
  //   value: 0,
  //   data: data,
  //   chainId: 1337,
  // };

  // const signedTxResponse = await wallet.signTransaction(tx); //Signing a transaction not sending it
  // console.log(signedTxResponse);

  // const sentTxResponse = await wallet.sendTransaction(tx); //Sending a transaction
  // await sentTxResponse.wait(1);
  // console.log(sentTxResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
