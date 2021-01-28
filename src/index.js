EosApi = require('eosjs-api') // Or EosApi = require('./src')

// everything is optional
options = {
    httpEndpoint: 'https://jungle3.cryptolions.io:443', // default, null for cold-storage
    verbose: false, // API logging
    fetchConfiguration: {}
}

eos = EosApi(options)

// Any API call without a callback parameter will print documentation: description,
// parameters, return value, and possible errors.  All methods and documentation
// are created from JSON files in eosjs/json/api/v1..

// For callbacks instead of Promises provide a callback
callback = (err, res) => { err ? console.error(err) : console.log(res) }

// The server does not expect any parameters only the callback is needed
eos.getInfo(callback)

// Parameters are added before the callback
eos.getBlock(1, callback)

// Parameters can be an object
eos.getBlock({ block_num_or_id: 1 }, callback)