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

const transfer = async (from, to, amount, memo) => {
    options = {
        keyProvider: ['5KQ1LgoXrSLiUMS8HZp6rSuyyJP5i6jTi1KWbZNerQQLFeTrxac'],
        authorization: 'spongebob111@active',
        broadcast: true,
        sign: true
    }
    tx = await eos.transfer(from, to, amount, memo, options)
    return tx
}

async function main() {
    let from = "spongebob111"
    let to = 'spongebob222'
    let amount = '1.0000 EOS'
    let memo = '111 to 222 1.0000 EOS'

    const transaction = await transfer(from, to, amount, memo)

    let info = await eos_client.getTransaction(tx.transaction_id)

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

main();