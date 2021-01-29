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

const transfer = async (from, to, amount, memo, keys, authorization) => {
    options = {
        keyProvider: keys,
        authorization: authorization,
        broadcast: true,
        sign: true
    }
    tx = await eos.transfer(from, to, amount, memo, options)
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

// spongebob111 is a single sig address, it's active permission only relates to one pubkey
// spongebob555 is a multi sig address, it's active permission relates to 2 pubkeys and threshold is 2

async function main() {
    const singleToMultiTransaction = await transfer(from, to, amount, memo, ['5KQ1LgoXrSLiUMS8HZp6rSuyyJP5i6jTi1KWbZNerQQLFeTrxac'], 'spongebob111@active')

    await analyseTransaction(singleToMultiTransaction.transaction_id)

    const MultiToSingleTransaction = await transfer('spongebob555', 'spongebob111', '1.0000 EOS', '555 to 111 1.0000 EOS', ['5KQ1LgoXrSLiUMS8HZp6rSuyyJP5i6jTi1KWbZNerQQLFeTrxac', '5JhrWyGS1DbKWsbFgYbHrKA6avkfsr7BZcG5M955KSHcHtdGcZ9'], 'spongebob555@active')

    await analyseTransaction(MultiToSingleTransaction.transaction_id)
}

main();