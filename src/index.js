const { eos, eos_client, analyseTransaction } = require("./config")

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

// spongebob111 is a single sig address, it's active permission only relates to one pubkey
// spongebob555 is a multi sig address, it's active permission relates to 2 pubkeys and threshold is 2

async function main() {
    const singleToMultiTransaction = await transfer('spongebob111', 'spongebob555', '1.0000 EOS', '111 to 555 1.0000 EOS', ['5KQ1LgoXrSLiUMS8HZp6rSuyyJP5i6jTi1KWbZNerQQLFeTrxac'], 'spongebob111@active')

    await analyseTransaction(singleToMultiTransaction.transaction_id)

    const MultiToSingleTransaction = await transfer('spongebob555', 'spongebob111', '1.0000 EOS', '555 to 111 1.0000 EOS', ['5KQ1LgoXrSLiUMS8HZp6rSuyyJP5i6jTi1KWbZNerQQLFeTrxac', '5JhrWyGS1DbKWsbFgYbHrKA6avkfsr7BZcG5M955KSHcHtdGcZ9'], 'spongebob555@active')

    await analyseTransaction(MultiToSingleTransaction.transaction_id)
}

main();