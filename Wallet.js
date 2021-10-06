//////////////////////////// Author : Gokulnath Rajendran ////////////////////////////////

var Web3 = require('web3');

var Accounts = require('web3-eth-accounts');

var Tx = require('ethereumjs-tx').Transaction;

      ///////////////////// Connecting to the network /////////////////////

var web3 = new Web3(new Web3.providers.HttpProvider('YOUR URL'));

var accounts = new Accounts('YOUR URL');

                      ////// creating new user /////////

var id = crypto.randomBytes(32).toString('hex');
var privateKey = "0x"+id;
console.log("\n Private Key:", privateKey);

account = web3.eth.accounts.privateKeyToAccount(privateKey);

console.log(`address: ${account.address}`);
console.log(`privateKey: ${account.privateKey}`);
user_addr = account.address
user_priv = account.privateKey

//////////////////// Copy and paste this into your file- Don't change anything /////////////////////////

abi = [
    {
        'inputs': [
            {
                'internalType': "string",
                'name': "_name",
                'type': "string"
            },
            {
                'internalType': "string",
                'name': "_symbol",
                'type': "string"
            },
            {
                'internalType': "uint256",
                'name': "_decimals",
                'type': "uint256"
            },
            {
                'internalType': "uint256",
                'name': "_totalSupply",
                'type': "uint256"
            }
        ],
        'name': "constructor",
        'stateMutability': "nonpayable",
        'type': "constructor"
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'internalType': "address",
                'name': "owner",
                'type': "address"
            },
            {
                'indexed': false,
                'internalType': "address",
                'name': "spender",
                'type': "address"
            },
            {
                'indexed': false,
                'internalType': "uint256",
                'name': "value",
                'type': "uint256"
            }
        ],
        'name': "Approval",
        'type': "event"
    },
    {
        'anonymous': false,
        'inputs': [
            {
                'indexed': false,
                'internalType': "address",
                'name': "from",
                'type': "address"
            },
            {
                'indexed': false,
                'internalType': "address",
                'name': "to",
                'type': "address"
            },
            {
                'indexed':false,
                'internalType': "uint256",
                'name': "value",
                'type': "uint256"
            }
        ],
        'name': "Transfer",
        'type': "event"
    },
    {
        'inputs': [
            {
                'internalType': "address",
                'name': "_owner",
                'type': "address"
            },
            {
                'internalType': "address",
                'name': "_spender",
                'type': "address"
            }
        ],
        'name': "allowance",
        'outputs': [
            {
                'internalType': "uint256",
                'name': "",
                'type': "uint256"
            }
        ],
        'stateMutability': "view",
        'type': "function"
    },
    {
        'inputs': [
            {
                'internalType': "address",
                'name': "_spender",
                'type': "address"
            },
            {
                'internalType': "uint256",
                'name': "_value",
                'type': "uint256"
            }
        ],
        'name': "approve",
        'outputs': [
            {
                'internalType': "bool",
                'name': "",
                'type': "bool"
            }
        ],
        'stateMutability': "nonpayable",
        'type': "function"
    },
    {
        'inputs': [
            {
                'internalType': "address",
                'name': "_owner",
                'type': "address"
            }
        ],
        'name': "balanceOf",
        'outputs': [
            {
                'internalType': "uint256",
                'name': "",
                'type': "uint256"
            }
        ],
        'stateMutability': "view",
        'type': "function"
    },
    {
        'inputs': [],
        'name': "decimals",
        'outputs': [
            {
                'internalType': "uint256",
                'name': "",
                'type': "uint256"
            }
        ],
        'stateMutability': "view",
        'type': "function"
    },
    {
        'inputs': [],
        'name': "name",
        'outputs': [
            {
                'internalType': "string",
                'name': "",
                'type': "string"
            }
        ],
        'stateMutability': "view",
        'type': "function"
    },
    {
        'inputs': [],
        'name': "symbol",
        'outputs': [
            {
                'internalType': "string",
                'name': "",
                'type': "string"
            }
        ],
        'stateMutability': "view",
        'type': "function"
    },
    {
        'inputs': [],
        'name': "totalSupply",
        'outputs': [
            {
                'internalType': "uint256",
                'name': "",
                'type': "uint256"
            }
        ],
        'stateMutability': "view",
        'type': "function"
    },
    {
        'inputs': [
            {
                'internalType': "address",
                'name': "_to",
                'type': "address"
            },
            {
                'internalType': "uint256",
                'name': "_value",
                'type': "uint256"
            }
        ],
        'name': "transfer",
        'outputs': [
            {
                'internalType': "bool",
                'name': "",
                'type': "bool"
            }
        ],
        'stateMutability': "nonpayable",
        'type': "function"
    },
    {
        'inputs': [
            {
                'internalType': "address",
                'name': "_from",
                'type': "address"
            },
            {
                'internalType': "address",
                'name': "_to",
                'type': "address"
            },
            {
                'internalType': "uint256",
                'name': "_value",
                'type': "uint256"
            }
        ],
        'name': "transferFrom",
        'outputs': [
            {
                'internalType': "bool",
                'name': "",
                'type': "bool"
            }
        ],
        'stateMutability': "nonpayable",
        'type': "function"
    }
]


             ///// Enter the contract address here ///////////

contract_address = "YOUR CONTRACT ADDRESS";

            ////// To connect to the contract ///////////////

const contract = new web3.eth.Contract(abi,contract_address);


             ///// To check the balance of account /////////////

var balanceOfTx = contract.methods.balanceOf(user_addr).call()
        .then(res => {
            console.log(res/1000000000000000000);
        });

            //// To get the symbol of the contract ////////

var Symbol = contract.methods.symbol().call()
                .then(res => {
                    console.log(res);
                });

        /// for transfering amount to recipient's account ///////

recipient = "RECIPIENT ADDRESS" // recipient address

var amount = 3  // Enter the amount to transfer here

var Data = contract.methods.transfer(recipient,(amount*1e18).toString()).encodeABI();
	var rawTransaction = {
    to: contract_address,
    gasLimit: web3.utils.toHex(700000000),
		data: Data,
		chainId: web3.eth.getChainId()
	};

web3.eth.accounts.signTransaction(rawTransaction, user_priv).then(signed => {
    web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)

});
