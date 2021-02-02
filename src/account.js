const { eos, eos_client, analyseTransaction } = require("./config")

const newAccount = async (accountName, owner, active, keys, actor, permission) => {
    options = {
        keyProvider: keys,
        broadcast: true,
        sign: true
    }
    tx = await eos.transaction(
        {
            actions: [{
                account: 'eosio',
                name: 'newaccount',
                authorization: [{
                    actor: actor,
                    permission: permission,
                }],
                data: {
                    creator: actor,
                    name: accountName,
                    owner: owner,
                    active: active,
                },
            },
            {
                account: 'eosio',
                name: 'buyrambytes',
                authorization: [{
                    actor: actor,
                    permission: permission,
                }],
                data: {
                    payer: actor,
                    receiver: accountName,
                    bytes: 8192,
                },
            },
            {
                account: 'eosio',
                name: 'delegatebw',
                authorization: [{
                    actor: actor,
                    permission: permission,
                }],
                data: {
                    from: actor,
                    receiver: accountName,
                    stake_net_quantity: '1.0000 EOS',
                    stake_cpu_quantity: '1.0000 EOS',
                    transfer: 0,
                }
            }]

        }
        , options)
    return tx
}

async function main() {
    let accountName = "spongebob333"
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
    let keys = ['5KQ1LgoXrSLiUMS8HZp6rSuyyJP5i6jTi1KWbZNerQQLFeTrxac']
    let actor = 'spongebob111'
    let permission = 'active'
    const transaction = await newAccount(accountName, owner, active, keys, actor, permission)

    await analyseTransaction(tx.transaction_id)
}

main();