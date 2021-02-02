Eos = require('eosjs')
EosApi = require('eosjs-api')

config = {
    chainId: "2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840", // 32 byte (64 char) hex string
    httpEndpoint: 'https://jungle3.cryptolions.io:443',
}

eos = Eos(config)

eos_client = EosApi(config)

var analyseTransaction = async (txId) => {
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

module.exports = {
    eos,
    eos_client,
    analyseTransaction
};