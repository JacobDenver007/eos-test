const { getEnabledCategories } = require('trace_events')

Eos = require('eosjs')

callback = (err, res) => { err ? console.error(err) : console.log(res) }

// Default configuration
config = {
    chainId: "2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840", // 32 byte (64 char) hex string
    keyProvider: ['5KQ1LgoXrSLiUMS8HZp6rSuyyJP5i6jTi1KWbZNerQQLFeTrxac'],
    httpEndpoint: 'https://jungle3.cryptolions.io:443',
    broadcast: true,
    verbose: false, // API activity
    sign: true
}

eos = Eos(config)

EosApi = require('eosjs-api')
client_options = {
    httpEndpoint: 'https://jungle3.cryptolions.io:443', // default, null for cold-storage
    verbose: false, // API logging
    fetchConfiguration: {}
}

eos_client = EosApi(client_options)

const newAccount = async (accountName, owner, active) => {
    let config = {
        keyProvider: ['5KQ1LgoXrSLiUMS8HZp6rSuyyJP5i6jTi1KWbZNerQQLFeTrxac'],
        authorization: 'spongebob111@active',
        broadcast: true,
        sign: true,
    }
    tx = await eos.transaction(
        {
            actions: [{
                account: 'eosio',
                name: 'newaccount',
                authorization: [{
                    actor: 'spongebob111',
                    permission: 'active',
                }],
                data: {
                    creator: 'spongebob111',
                    name: accountName,
                    owner: owner,
                    active: active,
                },
            },
            {
                account: 'eosio',
                name: 'buyrambytes',
                authorization: [{
                    actor: 'spongebob111',
                    permission: 'active',
                }],
                data: {
                    payer: 'spongebob111',
                    receiver: accountName,
                    bytes: 8192,
                },
            },
            {
                account: 'eosio',
                name: 'delegatebw',
                authorization: [{
                    actor: 'spongebob111',
                    permission: 'active',
                }],
                data: {
                    from: 'spongebob111',
                    receiver: accountName,
                    stake_net_quantity: '1.0000 EOS',
                    stake_cpu_quantity: '1.0000 EOS',
                    transfer: 0,
                }
            }]

        }
    )
    return tx
}

const analyseTransaction = async (txId) => {
    let info = await eos_client.getTransaction(txId)

    const res = {}
    for (var i in info.traces) {
        for (var x in info.traces[i].act.authorization) {
            res['sender'] = info.traces[i].act.authorization[x].actor
        }
        res['receiver'] = info.traces[i].receipt.receiver
        res['smart contract owner'] = info.traces[i].act.account
        res['message'] = info.traces[i].act.data.memo
    };
    console.log("res ", res)
}


async function main() {
    let owner = {
        threshold: 1,
        keys: [{
            key: 'EOS4uqpR3edtQuLPDm2JPhLoh4cCA9TxxG7MZt6NuRZtcyGi2gfij',
            weight: 1
        }],
        accounts: [],
        waits: []
    }
    let active = {
        threshold: 2,
        keys: [{
            key: 'EOS715kmb44JiLRuJmEhoguzw9cjzkpuyzm1iZ5VdgSsjNAmZx4fG',
            weight: 1
        }, {
            key: 'EOS6kgb5Ed52JniAF3WY6VTcq4vS2vvf8cdwNhfMmnrPbim8Ra9pV',
            weight: 1
        }],
        accounts: [],
        waits: []
    }

    const transaction = await newAccount('spongebob444', owner, active)

    await analyseTransaction(tx.transaction_id)
}

main();