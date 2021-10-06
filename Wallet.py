############ Author : Gokulnath Rajendran ###################

from web3 import Web3

from eth_account import Account


############### Connecting to the network ##### #############

w3 = Web3(Web3.HTTPProvider('YOUR URL'))
print(w3.isConnected())


############ Just copy and paste this into your file- Don't change anything ########################

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
        'anonymous': False,
        'inputs': [
            {
                'indexed': False,
                'internalType': "address",
                'name': "owner",
                'type': "address"
            },
            {
                'indexed': False,
                'internalType': "address",
                'name': "spender",
                'type': "address"
            },
            {
                'indexed': False,
                'internalType': "uint256",
                'name': "value",
                'type': "uint256"
            }
        ],
        'name': "Approval",
        'type': "event"
    },
    {
        'anonymous': False,
        'inputs': [
            {
                'indexed': False,
                'internalType': "address",
                'name': "from",
                'type': "address"
            },
            {
                'indexed': False,
                'internalType': "address",
                'name': "to",
                'type': "address"
            },
            {
                'indexed': False,
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


############## contract address #########################

contadress ="YOUR CONTRACT ADDRESS"

contract = w3.eth.contract(address = contadress, abi = abi)

######################### New user account creation #####################

new_user = w3.eth.account.create()

user_address = new_user.address  #### This is the wallet address
user_private_key = new_user.privateKey  ### This is the private key


print(user_address)
print(user_private_key )


############################## To check the balance of the account #####################

balance_raw = contract.functions.balanceOf(user_address).call()
balance = balance_raw/ 1000000000000000000
print(balance)

###################  for transfering amount to recipient's account #############################

recipient = 'RECIPIENT ADDRESS'; ### Enter recipient address here
amount = 3; ### Enter the amount to transfer

transaction = contract.functions.transfer(recipient,amount * 1000000000000000000).buildTransaction({'chainId': 10, 'gas':70000, 'nonce': w3.eth.getTransactionCount(user_address)})
signed_txn = w3.eth.account.signTransaction(transaction, user_private_key)

txn_hash = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

transaction_details = w3.eth.get_transaction(txn_hash)

print(transaction_details)
