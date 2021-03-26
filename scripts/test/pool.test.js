/*
 *
 * Pool (Updated)
 *
 */

// Import Required Modules
const events = require('events');
const nock = require('nock');

// Import Required Modules
const Pool = require('../main/pool');

const rpcData = {
    "capabilities": [
        "proposal"
    ],
    "version": 536870912,
    "rules": [],
    "vbavailable": {},
    "vbrequired": 0,
    "previousblockhash": "9719aefb83ef6583bd4c808bbe7d49b629a60b375fc6e36bee039530bc7727e2",
    "transactions": [{
        "data": "0100000001cba672d0bfdbcc441d171ef0723a191bf050932c6f8adc8a05b0cac2d1eb022f010000006c493046022100a23472410d8fd7eabf5c739bdbee5b6151ff31e10d5cb2b52abeebd5e9c06977022100c2cdde5c632eaaa1029dff2640158aaf9aab73fa021ed4a48b52b33ba416351801210212ee0e9c79a72d88db7af3fed18ae2b7ca48eaed995d9293ae0f94967a70cdf6ffffffff02905f0100000000001976a91482db4e03886ee1225fefaac3ee4f6738eb50df9188ac00f8a093000000001976a914c94f5142dd7e35f5645735788d0fe1343baf146288ac00000000",
        "hash": "7c90a5087ac4d5b9361d47655812c89b4ad0dee6ecd5e08814d00ce7385aa317",
        "depends": [],
        "fee": 10000,
        "sigops": 2
    }],
    "coinbaseaux": {
        "flags": ""
    },
    "coinbasevalue": 5000000000,
    "longpollid": "9719aefb83ef6583bd4c808bbe7d49b629a60b375fc6e36bee039530bc7727e22",
    "target": "00000ffff0000000000000000000000000000000000000000000000000000000",
    "mintime": 1614044921,
    "mutable": [
        "time",
        "transactions",
        "prevblock"
    ],
    "noncerange": "00000000ffffffff",
    "sigoplimit": 20000,
    "sizelimit": 1000000,
    "curtime": 1614201893,
    "bits": "1e0ffff0",
    "height": 1,
    "default_witness_commitment": "6a24aa21a9ede2f61c3f71d1defd3fa999dfa36953755c690689799962b48bebd836974e8cf9"
}

const blockchainData = {
    "chain": "main",
    "blocks": 1,
    "headers": 1,
    "bestblockhash": "1d5af7e2ad9aeccb110401761938c07a5895d85711c9c5646661a10407c82769",
    "difficulty": 0.000244140625,
    "mediantime": 1614202191,
    "verificationprogress": 3.580678270509504e-08,
    "initialblockdownload": false,
    "chainwork": "0000000000000000000000000000000000000000000000000000000000200020",
    "size_on_disk": 472,
    "pruned": false,
    "softforks": [
        {
            "id": "bip34",
            "version": 2,
            "reject": {
                "status": false
            }
        },
        {
            "id": "bip66",
            "version": 3,
            "reject": {
                "status": false
            }
        },
        {
            "id": "bip65",
            "version": 4,
            "reject": {
                "status": false
            }
        }
    ],
    "bip9_softforks": {
        "csv": {
            "status": "defined",
            "startTime": 1485561600,
            "timeout": 1517356801,
            "since": 0
        },
        "segwit": {
            "status": "defined",
            "startTime": 1485561600,
            "timeout": 1517356801,
            "since": 0
        }
    },
    "warnings": ""
};

const peerData = {
    "id": 20,
    "addr": "18.213.13.51:9333",
    "addrlocal": "173.73.155.96:61108",
    "addrbind": "192.168.1.155:61108",
    "services": "000000000000040d",
    "relaytxes": true,
    "lastsend": 1615676709,
    "lastrecv": 1615676709,
    "bytessent": 1793,
    "bytesrecv": 1782,
    "conntime": 1615674308,
    "timeoffset": 0,
    "pingtime": 0.007751,
    "minping": 0.00522,
    "version": 70015,
    "subver": "/LitecoinCore:0.18.1/",
    "inbound": false,
    "addnode": false,
    "startingheight": 1,
    "banscore": 0,
    "synced_headers": 1,
    "synced_blocks": 1,
    "inflight": [],
    "whitelisted": false,
    "minfeefilter": 0.00001000,
    "bytessent_per_msg": {
        "addr": 55,
        "feefilter": 32,
        "getaddr": 24,
        "getheaders": 93,
        "ping": 672,
        "pong": 672,
        "sendcmpct": 66,
        "sendheaders": 24,
        "verack": 24,
        "version": 131
    },
    "bytesrecv_per_msg": {
        "addr": 55,
        "feefilter": 32,
        "headers": 106,
        "ping": 672,
        "pong": 672,
        "sendcmpct": 66,
        "sendheaders": 24,
        "verack": 24,
        "version": 131
    }
};

const options = {
    "address": "",
    "banning": {
        "enabled": true,
        "time": 600,
        "invalidPercent": 50,
        "checkThreshold": 500,
        "purgeInterval": 300
    },
    "coin": {
        "name": "Bitcoin",
        "symbol": "BTC",
        "algorithm": "sha256d",
        "peerMagic": "f9beb4d9",
        "peerMagicTestnet": "0b110907",
        "hasGetInfo": false,
        "segwit": true,
        "mainnet": {
            "messagePrefix": "\x18Bitcoin Signed Message:\n",
            "bech32": "bc",
            "bip32": {
                "public": 0x0488b21e,
                "private": 0x0488ade4,
            },
            "pubKeyHash": 0x00,
            "scriptHash": 0x05,
            "wif": 0x80,
            "coin": "btc",
        },
        "testnet": {
            "messagePrefix": "\x18Bitcoin Signed Message:\n",
            "bech32": "tb",
            "bip32": {
                "public": 0x043587cf,
                "private": 0x04358394,
            },
            "pubKeyHash": 0x6f,
            "scriptHash": 0xc4,
            "wif": 0xef,
            "coin": "btc",
        }
    },
    "connectionTimeout": 600,
    "daemons": [{
        "host": "127.0.0.1",
        "port": 8332,
        "user": "",
        "password": ""
    }],
    "debug": true,
    "jobRebroadcastTimeout": 60,
    "ports": {
        "3001": {
            "enabled": true,
            "initial": 32,
            "difficulty": {
                "minDiff": 8,
                "maxDiff": 512,
                "targetTime": 15,
                "retargetTime": 90,
                "variancePercent": 30
            }
        }
    },
    "poolAddress": "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
    "p2p": {
        "enabled": true,
        "host": "127.0.0.1",
        "port": 8333,
        "disableTransactions": true
    },
    "recipients": [{
        "address": "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
        "percentage": 0.05,
    }],
    "rewards": "",
    "tcpProxyProtocol": false,
};

nock.disableNetConnect()
nock.enableNetConnect('127.0.0.1')

////////////////////////////////////////////////////////////////////////////////

function mockSetupDaemon(pool, callback) {
    const scope = nock('http://127.0.0.1:8332')
        .post('/', body => body.method === "getpeerinfo")
        .reply(200, JSON.stringify({
            id: "nocktest",
            error: null,
            result: null,
        }));
    pool.setupDaemonInterface(() => callback());
}

function mockSetupData(pool, callback) {
    const scope = nock('http://127.0.0.1:8332')
        .post('/').reply(200, JSON.stringify([
            { id: "nocktest", error: null, result: { isvalid: true, address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" }},
            { id: "nocktest", error: null, result: { networkhashps: 0 }},
            { id: "nocktest", error: true, result: { code: -1 }},
            { id: "nocktest", error: null, result: { chain: 'main', difficulty: 0 }},
            { id: "nocktest", error: null, result: { protocolversion: 1, connections: 1 }},
        ]));
    pool.setupPoolData(() => callback());
}

function mockSetupTestnetData(pool, callback) {
    const scope = nock('http://127.0.0.1:8332')
        .post('/').reply(200, JSON.stringify([
            { id: "nocktest", error: null, result: { isvalid: true, address: "tb1qprvwwfr5cey54e4353t9dmker7zd9w4uhvkz5p" }},
            { id: "nocktest", error: null, result: { networkhashps: 0 }},
            { id: "nocktest", error: true, result: { code: -1 }},
            { id: "nocktest", error: null, result: { chain: 'test', difficulty: 0 }},
            { id: "nocktest", error: null, result: { protocolversion: 1, connections: 1 }},
        ]));
    pool.setupPoolData(() => callback());
}

function mockSetupBlockchain(pool, callback) {
    const rpcDataCopy = Object.assign({}, rpcData);
    const scope1 = nock('http://127.0.0.1:8332')
        .post('/', body => body.method === "getblocktemplate")
        .reply(200, JSON.stringify({
            id: "nocktest",
            error: null,
            result: rpcDataCopy,
        }));
    pool.setupBlockchain(() => callback());
}

function mockSetupFirstJob(pool, callback) {
    const rpcDataCopy = Object.assign({}, rpcData);
    const scope = nock('http://127.0.0.1:8332')
        .post('/', body => body.method === "getblocktemplate")
        .reply(200, JSON.stringify({
            id: "nocktest",
            error: null,
            result: rpcDataCopy,
        }));
    pool.setupFirstJob(() => callback());
}

////////////////////////////////////////////////////////////////////////////////

describe('Test pool functionality', () => {

    test('Test initialization of pool', () => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        expect(typeof pool).toBe("object");
    });

    test('Test pool with invalid algorithm', () => {
        const optionsCopy = Object.assign({}, options);
        optionsCopy.coin = Object.assign({}, options.coin);
        optionsCopy.coin.algorithm = "invalid";
        expect(() => new Pool(optionsCopy, null)).toThrow(Error)
    });

    test('Test initialization of port difficulty', () => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.setupDifficulty();
        expect(typeof pool.difficulty).toBe('object');
        expect(typeof pool.difficulty['3001']).toBe('object');
        expect(typeof pool.difficulty['3001'].manageClient).toBe('function');
        expect(pool.difficulty['3001']._eventsCount).toBe(1);
    });

    test('Test initialization of daemon', () => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.setupDaemonInterface(() => {});
        expect(typeof pool.daemon).toBe('object');
        expect(typeof pool.daemon.indexDaemons).toBe('function');
        expect(typeof pool.daemon.isOnline).toBe('function');
        expect(typeof pool.daemon.initDaemons).toBe('function');
        expect(pool.daemon._eventsCount).toBe(2);
    });

    test('Test pool daemon events [1]', (done) => {
        const optionsCopy = Object.assign({}, options);
        optionsCopy.daemons = [];
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('No daemons have been configured - pool cannot start');
            done();
        });
        pool.setupDaemonInterface(() => {});
    });

    test('Test pool daemon events [2]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        const scope = nock('http://127.0.0.1:8332')
            .post('/', body => body.method === "getpeerinfo")
            .reply(401, {});
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('Unauthorized RPC access - invalid RPC username or password');
            done();
        });
        pool.setupDaemonInterface(() => {});
        pool.daemon.cmd('getpeerinfo', [], (results) => {});
    });

    test('Test pool daemon events [3]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        const scope = nock('http://127.0.0.1:8332')
            .post('/', body => body.method === "getpeerinfo")
            .reply(200, JSON.stringify({
                id: "nocktest",
                error: null,
                result: null,
            }));
        pool.setupDaemonInterface(() => done());
    });

    test('Test pool daemon events [4]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        const scope = nock('http://127.0.0.1:8332')
            .post('/', body => body.method === "getpeerinfo")
            .reply(200, JSON.stringify({
                id: "nocktest",
                error: true,
                result: null,
            }));
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('Failed to connect daemon(s): [{"error":true,"response":null,"instance":{"host":"127.0.0.1","port":8332,"user":"","password":"","index":0}}]');
            done();
        });
        pool.setupDaemonInterface(() => {});
    });

    test('Test pool batch data events [1]', (done) => {
        const optionsCopy = Object.assign({}, options);
        optionsCopy.coin = Object.assign({}, options.coin);
        optionsCopy.coin.hasGetInfo = true;
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('Could not start pool, error with init batch RPC call');
            expect(optionsCopy.coin.hasGetInfo).toBe(true);
            done();
        });
        mockSetupDaemon(pool, () => {
            pool.setupPoolData(() => {});
        })
    });

    test('Test pool batch data events [2]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('Could not start pool, error with init batch RPC call');
            done();
        });
        mockSetupDaemon(pool, () => {
            pool.setupPoolData(() => {});
        })
    });

    test('Test pool batch data events [3]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        mockSetupDaemon(pool, () => {
            const scope = nock('http://127.0.0.1:8332')
                .post('/').reply(200, JSON.stringify([
                    { id: "nocktest", error: null, result: { isvalid: true, address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" }},
                    { id: "nocktest", error: null, result: { networkhashps: 0 }},
                    { id: "nocktest", error: true, result: { code: -1 }},
                    { id: "nocktest", error: null, result: { chain: 'main', difficulty: 0 }},
                    { id: "nocktest", error: null, result: { protocolversion: 1, connections: 1 }},
                ]));
            pool.setupPoolData(() => {
                expect(optionsCopy.testnet).toBe(false);
                expect(typeof optionsCopy.network).toBe('object');
                expect(optionsCopy.poolAddress).toBe('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq');
                expect(optionsCopy.protocolVersion).toBe(1);
                expect(typeof optionsCopy.initStats).toBe('object');
                expect(optionsCopy.hasSubmitMethod).toBe(true);
                done();
            });
        })
    });

    test('Test pool batch data events [4]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('Could not start pool, error with init RPC call: validateaddress - true');
            done();
        });
        mockSetupDaemon(pool, () => {
            const scope = nock('http://127.0.0.1:8332')
                .post('/').reply(200, JSON.stringify([
                    { id: "nocktest", error: true, result: { isvalid: true, address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" }},
                    { id: "nocktest", error: null, result: { networkhashps: 0 }},
                    { id: "nocktest", error: true, result: { code: -1 }},
                    { id: "nocktest", error: null, result: { chain: 'main', difficulty: 0 }},
                    { id: "nocktest", error: null, result: { protocolversion: 1, connections: 1 }},
                ]));
            pool.setupPoolData(() => {});
        });
    });

    test('Test pool batch data events [5]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('Daemon reports address is not valid');
            done();
        });
        mockSetupDaemon(pool, () => {
            const scope = nock('http://127.0.0.1:8332')
                .post('/').reply(200, JSON.stringify([
                    { id: "nocktest", error: null, result: { isvalid: false, address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" }},
                    { id: "nocktest", error: null, result: { networkhashps: 0 }},
                    { id: "nocktest", error: true, result: { code: -1 }},
                    { id: "nocktest", error: null, result: { chain: 'main', difficulty: 0 }},
                    { id: "nocktest", error: null, result: { protocolversion: 1, connections: 1 }},
                ]));
            pool.setupPoolData(() => {});
        });
    });

    test('Test pool batch data events [6]', (done) => {
        const optionsCopy = Object.assign({}, options);
        optionsCopy.coin.hasGetInfo = true;
        const pool = new Pool(optionsCopy, null);
        mockSetupDaemon(pool, () => {
            const scope = nock('http://127.0.0.1:8332')
                .post('/').reply(200, JSON.stringify([
                    { id: "nocktest", error: null, result: { isvalid: true, address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" }},
                    { id: "nocktest", error: null, result: { networkhashps: 0 }},
                    { id: "nocktest", error: true, result: { code: -1 }},
                    { id: "nocktest", error: null, result: { testnet: false, difficulty: { 'proof-of-work': 0 }, protocolversion: 1, connections: 0 }},
                ]));
            pool.setupPoolData(() => {
                expect(optionsCopy.testnet).toBe(false);
                expect(typeof optionsCopy.network).toBe('object');
                expect(optionsCopy.poolAddress).toBe('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq');
                expect(optionsCopy.protocolVersion).toBe(1);
                expect(typeof optionsCopy.initStats).toBe('object');
                expect(optionsCopy.hasSubmitMethod).toBe(true);
                done();
            });
        });
    });

    test('Test pool batch data events [7]', (done) => {
        const optionsCopy = Object.assign({}, options);
        optionsCopy.coin.hasGetInfo = false;
        const pool = new Pool(optionsCopy, null);
        mockSetupDaemon(pool, () => {
            const scope = nock('http://127.0.0.1:8332')
                .post('/').reply(200, JSON.stringify([
                    { id: "nocktest", error: null, result: { isvalid: true, address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" }},
                    { id: "nocktest", error: null, result: { networkhashps: 0 }},
                    { id: "nocktest", error: true, result: { code: -1 }},
                    { id: "nocktest", error: null, result: { chain: 'test', difficulty: { 'proof-of-work': 0 }}},
                    { id: "nocktest", error: null, result: { protocolversion: 1, connections: 1 }},
                ]));
            pool.setupPoolData(() => {
                expect(optionsCopy.testnet).toBe(true);
                expect(typeof optionsCopy.network).toBe('object');
                expect(optionsCopy.poolAddress).toBe('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq');
                expect(optionsCopy.protocolVersion).toBe(1);
                expect(typeof optionsCopy.initStats).toBe('object');
                expect(optionsCopy.hasSubmitMethod).toBe(true);
                done();
            });
        });
    });

    test('Test pool batch data events [8]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        mockSetupDaemon(pool, () => {
            const scope = nock('http://127.0.0.1:8332')
                .post('/').reply(200, JSON.stringify([
                    { id: "nocktest", error: null, result: { isvalid: true, address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" }},
                    { id: "nocktest", error: null, result: { networkhashps: 0 }},
                    { id: "nocktest", error: true, result: { message: 'Method not found' }},
                    { id: "nocktest", error: null, result: { chain: 'main', difficulty: 0 }},
                    { id: "nocktest", error: null, result: { protocolversion: 1, connections: 1 }},
                ]));
            pool.setupPoolData(() => {
                expect(optionsCopy.testnet).toBe(false);
                expect(typeof optionsCopy.network).toBe('object');
                expect(optionsCopy.poolAddress).toBe('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq');
                expect(optionsCopy.protocolVersion).toBe(1);
                expect(typeof optionsCopy.initStats).toBe('object');
                expect(optionsCopy.hasSubmitMethod).toBe(false);
                done();
            });
        });
    });

    test('Test pool batch data events [9]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('Could not detect block submission RPC method');
            done();
        });
        mockSetupDaemon(pool, () => {
            const scope = nock('http://127.0.0.1:8332')
                .post('/').reply(200, JSON.stringify([
                    { id: "nocktest", error: null, result: { isvalid: true, address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" }},
                    { id: "nocktest", error: null, result: { networkhashps: 0 }},
                    { id: "nocktest", error: true, result: {}},
                    { id: "nocktest", error: null, result: { chain: 'main', difficulty: 0 }},
                    { id: "nocktest", error: null, result: { protocolversion: 1, connections: 1 }},
                ]));
            pool.setupPoolData(() => {});
        });
    });

    test('Test pool recipient setup [1]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupRecipients();
                expect(optionsCopy.feePercentage).toBe(0.05);
                done();
            });
        });
    });

    test('Test pool recipient setup [2]', (done) => {
        const optionsCopy = Object.assign({}, options);
        optionsCopy.recipients = [];
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('No rewardRecipients have been setup which means no fees will be taken');
            done();
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupRecipients();
            });
        });
    });

    test('Test initialization of manager', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                expect(typeof pool.manager).toBe('object');
                expect(typeof pool.manager.blockHasher).toBe('function');
                expect(typeof pool.manager.coinbaseHasher).toBe('function');
                expect(typeof pool.manager.updateCurrentJob).toBe('function');
                expect(pool.manager._eventsCount).toBe(3);
                done();
            });
        });
    });

    test('Test pool manager events [1]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        const pool = new Pool(optionsCopy, null);
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                pool.manager.emit('newBlock', rpcDataCopy)
                done();
            });
        })
    });

    test('Test pool manager events [2]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        const pool = new Pool(optionsCopy, null);
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                pool.manager.emit('updatedBlock', rpcDataCopy)
                done();
            });
        })
    });

    test('Test pool manager events [3]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('share', (isValidShare, isValidBlock, shareData) => {
            expect(isValidShare).toBe(true);
            expect(isValidBlock).toBe(false);
            expect(shareData.job).toBe(1);
            expect(shareData.blockHashInvalid).toBe("example blockhash")
            done();
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                const shareData = {
                    job: 1,
                    ip: "ip_addr",
                    port: "port",
                    worker: "worker",
                    height: 1,
                    blockReward: 5000000000,
                    difficulty: 1,
                    shareDiff: 1,
                    blockDiff : 1,
                    blockDiffActual: 1,
                    blockHash: null,
                    blockHashInvalid: "example blockhash",
                }
                pool.manager.emit('share', shareData, null);
            });
        })
    });

    test('Test pool manager events [4]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('RPC error with daemon instance 0 when submitting block with submitblock true');
            done();
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                const scope = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "submitblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: true,
                        result: null,
                    }));
                pool.setupJobManager();
                const shareData = {
                    job: 1,
                    ip: "ip_addr",
                    port: "port",
                    worker: "worker",
                    height: 1,
                    blockReward: 5000000000,
                    difficulty: 1,
                    shareDiff: 1,
                    blockDiff : 1,
                    blockDiffActual: 1,
                    blockHash: "example blockhash",
                    blockHashInvalid: null,
                }
                const blockHex = Buffer.from("000011110000111100001111", "hex");
                pool.manager.emit('share', shareData, blockHex);
            });
        })
    });

    test('Test pool manager events [5]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            expect(type).toBe("error");
            expect(text).toBe('Daemon instance 0 rejected a supposedly valid block');
            done();
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                const scope = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "submitblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: "rejected",
                    }));
                pool.setupJobManager();
                const shareData = {
                    job: 1,
                    ip: "ip_addr",
                    port: "port",
                    worker: "worker",
                    height: 1,
                    blockReward: 5000000000,
                    difficulty: 1,
                    shareDiff: 1,
                    blockDiff : 1,
                    blockDiffActual: 1,
                    blockHash: "example blockhash",
                    blockHashInvalid: null,
                }
                const blockHex = Buffer.from("000011110000111100001111", "hex");
                pool.manager.emit('share', shareData, blockHex);
            });
        })
    });

    test('Test pool manager events [6]', (done) => {
        const response = []
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 3) {
                expect(response[0][0]).toBe("debug");
                expect(response[0][1]).toBe("Submitted Block using submitblock successfully to daemon instance(s)");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("Block was rejected by the network");
                expect(response[2][0]).toBe("debug");
                expect(response[2][1]).toBe("Block notification via RPC after block submission");
                done();
            }
        });
        pool.on('share', (isValidShare, isValidBlock, shareData) => {
            const scope1 = nock('http://127.0.0.1:8332')
                .post('/', body => body.method === "getblocktemplate")
                .reply(200, JSON.stringify({
                    id: "nocktest",
                    error: null,
                    result: rpcDataCopy,
                }));
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                const scope2 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "submitblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: null,
                    }));
                const scope3 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "getblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: null,
                    }));
                pool.setupJobManager();
                const shareData = {
                    job: 1,
                    ip: "ip_addr",
                    port: "port",
                    worker: "worker",
                    height: 1,
                    blockReward: 5000000000,
                    difficulty: 1,
                    shareDiff: 1,
                    blockDiff : 1,
                    blockDiffActual: 1,
                    blockHash: "example blockhash",
                    blockHashInvalid: null,
                }
                const blockHex = Buffer.from("000011110000111100001111", "hex");
                pool.manager.emit('share', shareData, blockHex);
            });
        })
    });

    test('Test pool manager events [7]', (done) => {
        const response = []
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 3) {
                expect(response[0][0]).toBe("debug");
                expect(response[0][1]).toBe("Submitted Block using getblocktemplate successfully to daemon instance(s)");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("Block was rejected by the network");
                expect(response[2][0]).toBe("debug");
                expect(response[2][1]).toBe("Block notification via RPC after block submission");
                done();
            }
        });
        pool.on('share', (isValidShare, isValidBlock, shareData) => {
            const scope1 = nock('http://127.0.0.1:8332')
                .post('/', body => body.method === "getblocktemplate")
                .reply(200, JSON.stringify({
                    id: "nocktest",
                    error: null,
                    result: rpcDataCopy,
                }));
        });
        mockSetupDaemon(pool, () => {
            const scope2 = nock('http://127.0.0.1:8332')
                .post('/').reply(200, JSON.stringify([
                    { id: "nocktest", error: null, result: { isvalid: true, address: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq" }},
                    { id: "nocktest", error: null, result: { networkhashps: 0 }},
                    { id: "nocktest", error: true, result: { message: 'Method not found' }},
                    { id: "nocktest", error: null, result: { chain: 'main', difficulty: 0 }},
                    { id: "nocktest", error: null, result: { protocolversion: 1, connections: 1 }},
                ]));
            pool.setupPoolData(() => {
                const scope3 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "getblocktemplate")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: null,
                    }));
                const scope4 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "getblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: null,
                    }));
                pool.setupJobManager();
                const shareData = {
                    job: 1,
                    ip: "ip_addr",
                    port: "port",
                    worker: "worker",
                    height: 1,
                    blockReward: 5000000000,
                    difficulty: 1,
                    shareDiff: 1,
                    blockDiff : 1,
                    blockDiffActual: 1,
                    blockHash: "example blockhash",
                    blockHashInvalid: null,
                }
                const blockHex = Buffer.from("000011110000111100001111", "hex");
                pool.manager.emit('share', shareData, blockHex);
            });
        })
    });

    test('Test pool manager events [8]', (done) => {
        const response = []
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 3) {
                expect(response[0][0]).toBe("debug");
                expect(response[0][1]).toBe("Submitted Block using submitblock successfully to daemon instance(s)");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Block was accepted by the network with 1 confirmations");
                expect(response[2][0]).toBe("debug");
                expect(response[2][1]).toBe("Block notification via RPC after block submission");
                done();
            }
        });
        pool.on('share', (isValidShare, isValidBlock, shareData) => {
            const scope1 = nock('http://127.0.0.1:8332')
                .post('/', body => body.method === "getblocktemplate")
                .reply(200, JSON.stringify({
                    id: "nocktest",
                    error: null,
                    result: rpcDataCopy,
                }));
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                const scope2 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "submitblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: null,
                    }));
                const scope3 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "getblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: {
                            hash: "example blockhash",
                            tx: "example transaction",
                            confirmations: 1,
                        },
                    }));
                pool.setupJobManager();
                const shareData = {
                    job: 1,
                    ip: "ip_addr",
                    port: "port",
                    worker: "worker",
                    height: 1,
                    blockReward: 5000000000,
                    difficulty: 1,
                    shareDiff: 1,
                    blockDiff : 1,
                    blockDiffActual: 1,
                    blockHash: "example blockhash",
                    blockHashInvalid: null,
                }
                const blockHex = Buffer.from("000011110000111100001111", "hex");
                pool.manager.emit('share', shareData, blockHex);
            });
        })
    });

    test('Test pool manager events [9]', (done) => {
        const response = []
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 3) {
                expect(response[0][0]).toBe("debug");
                expect(response[0][1]).toBe("Submitted Block using submitblock successfully to daemon instance(s)");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("Block was rejected by the network");
                expect(response[2][0]).toBe("debug");
                expect(response[2][1]).toBe("Block notification via RPC after block submission");
                done();
            }
        });
        pool.on('share', (isValidShare, isValidBlock, shareData) => {
            const scope1 = nock('http://127.0.0.1:8332')
                .post('/', body => body.method === "getblocktemplate")
                .reply(200, JSON.stringify({
                    id: "nocktest",
                    error: null,
                    result: rpcDataCopy,
                }));
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                const scope2 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "submitblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: null,
                    }));
                const scope3 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "getblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: {
                            hash: "example blockhash",
                            tx: "example transaction",
                            confirmations: -1,
                        },
                    }));
                pool.setupJobManager();
                const shareData = {
                    job: 1,
                    ip: "ip_addr",
                    port: "port",
                    worker: "worker",
                    height: 1,
                    blockReward: 5000000000,
                    difficulty: 1,
                    shareDiff: 1,
                    blockDiff : 1,
                    blockDiffActual: 1,
                    blockHash: "example blockhash",
                    blockHashInvalid: null,
                }
                const blockHex = Buffer.from("000011110000111100001111", "hex");
                pool.manager.emit('share', shareData, blockHex);
            });
        })
    });

    test('Test pool manager events [10]', (done) => {
        const response = []
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 3) {
                expect(response[0][0]).toBe("debug");
                expect(response[0][1]).toBe("Submitted Block using submitblock successfully to daemon instance(s)");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("Block was rejected by the network");
                expect(response[2][0]).toBe("error");
                expect(response[2][1]).toBe("getblocktemplate call failed for daemon instance 0 with error true");
                done();
            }
        });
        pool.on('share', (isValidShare, isValidBlock, shareData) => {
            const scope1 = nock('http://127.0.0.1:8332')
                .post('/', body => body.method === "getblocktemplate")
                .reply(200, JSON.stringify({
                    id: "nocktest",
                    error: true,
                    result: null,
                }));
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                const scope2 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "submitblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: null,
                    }));
                const scope3 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "getblock")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: {
                            hash: "example blockhash",
                            tx: "example transaction",
                            confirmations: -1,
                        },
                    }));
                pool.setupJobManager();
                const shareData = {
                    job: 1,
                    ip: "ip_addr",
                    port: "port",
                    worker: "worker",
                    height: 1,
                    blockReward: 5000000000,
                    difficulty: 1,
                    shareDiff: 1,
                    blockDiff : 1,
                    blockDiffActual: 1,
                    blockHash: "example blockhash",
                    blockHashInvalid: null,
                }
                const blockHex = Buffer.from("000011110000111100001111", "hex");
                pool.manager.emit('share', shareData, blockHex);
            });
        })
    });

    test('Test pool blockchain events [1]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        const pool = new Pool(optionsCopy, null);
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                const scope = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "getblocktemplate")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: rpcDataCopy,
                    }));
                pool.setupBlockchain(() => done());
            });
        });
    });

    test('Test pool blockchain events [2]', (done) => {
        const response = []
        const optionsCopy = Object.assign({}, options);
        const blockchainDataCopy = Object.assign({}, blockchainData);
        const peerDataCopy = Object.assign({}, peerData);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("error");
                expect(response[0][1]).toBe("Daemon is still syncing with the network. The server will be started once synced");
                expect(response[1][0]).toBe("warning");
                expect(response[1][1]).toBe("Downloaded 100.00% of blockchain from 1 peers");
                done();
            }
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                const scope1 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "getblocktemplate")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: { code: -10 },
                        result: null,
                    }));
                const scope2 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "getblockchaininfo")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: blockchainDataCopy,
                    }));
                const scope3 = nock('http://127.0.0.1:8332')
                    .post('/', body => body.method === "getpeerinfo")
                    .reply(200, JSON.stringify({
                        id: "nocktest",
                        error: null,
                        result: [peerDataCopy],
                    }));
                pool.setupBlockchain(() => done());
            });
        });
    });

    test('Test pool job events [1]', (done) => {
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        const pool = new Pool(optionsCopy, null);
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    const scope = nock('http://127.0.0.1:8332')
                        .post('/', body => body.method === "getblocktemplate")
                        .reply(200, JSON.stringify({
                            id: "nocktest",
                            error: null,
                            result: rpcDataCopy,
                        }));
                    pool.setupFirstJob(() => {
                        expect(typeof pool.manager.currentJob).toBe("object");
                        expect(pool.manager.currentJob.rpcData.height).toBe(1);
                        done();
                    });
                });
            });
        });
    });

    test('Test pool job events [2]', (done) => {
        const response = []
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("error");
                expect(response[0][1]).toBe("getblocktemplate call failed for daemon instance 0 with error true");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("Error with getblocktemplate on creating first job, server cannot start");
                done();
            }
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    const scope = nock('http://127.0.0.1:8332')
                        .post('/', body => body.method === "getblocktemplate")
                        .reply(200, JSON.stringify({
                            id: "nocktest",
                            error: true,
                            result: null,
                        }));
                    pool.setupFirstJob(() => {});
                });
            });
        });
    });

    test('Test pool polling events [1]', (done) => {
        const response = []
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Block template polling has been disabled");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupBlockPolling();
                    });
                });
            });
        });
    });

    test('Test pool polling events [2]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        optionsCopy.blockRefreshInterval = 600;
        rpcDataCopy.previousblockhash = "1d5af7e2ad9aeccb110401761938c07a5895d85711c9c5646661a10407c82769";
        rpcDataCopy.height = 2;
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Block notification via RPC polling");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        const scope = nock('http://127.0.0.1:8332')
                            .post('/', body => body.method === "getblocktemplate")
                            .reply(200, JSON.stringify({
                                id: "nocktest",
                                error: null,
                                result: rpcDataCopy,
                            }));
                        pool.setupBlockPolling();
                    });
                });
            });
        });
    });

    test('Test pool peer events [1]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        optionsCopy.p2p = Object.assign({}, options.p2p);
        optionsCopy.p2p.enabled = false;
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("p2p has been disabled in the configuration");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                    });
                });
            });
        });
    });

    test('Test pool peer events [2]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        optionsCopy.coin = Object.assign({}, options.coin);
        optionsCopy.coin.peerMagicTestnet = false;
        optionsCopy.recipients = Object.assign([], options.recipients);
        optionsCopy.recipients[0] = Object.assign({}, options.recipients[0]);
        optionsCopy.recipients[0].address = "tb1qnc0z4696tusrgscws5gvc7g2hhz99m6lrssfc2"
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("p2p cannot be enabled in testnet without peerMagicTestnet set in coin configuration");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupTestnetData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                    });
                });
            });
        });
    });

    test('Test pool peer events [3]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        optionsCopy.coin = Object.assign({}, options.coin);
        optionsCopy.coin.peerMagic = false;
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("p2p cannot be enabled without peerMagic set in coin configuration");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                    });
                });
            });
        });
    });

    test('Test pool peer events [4]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("p2p connection failed - likely incorrect p2p magic value");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.peer.emit('connectionRejected');
                    });
                });
            });
        });
    });

    test('Test pool peer events [5]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("p2p connection failed - likely incorrect host or port");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.peer.emit('connectionFailed', true);
                    });
                });
            });
        });
    });

    test('Test pool peer events [6]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("p2p had a socket error: true");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.peer.emit('socketError', true);
                    });
                });
            });
        });
    });

    test('Test pool peer events [7]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("p2p had an error: true");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.peer.emit('error', true);
                    });
                });
            });
        });
    });

    test('Test pool peer events [7]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        rpcDataCopy.previousblockhash = "1d5af7e2ad9aeccb110401761938c07a5895d85711c9c5646661a10407c82769";
        rpcDataCopy.height = 2;
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 4) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Block notification via p2p");
                expect(response[3][0]).toBe("debug");
                expect(response[3][1]).toBe("Block template for Bitcoin updated successfully");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.peer.on('blockNotify', function(hash) {
                            const scope = nock('http://127.0.0.1:8332')
                                .post('/', body => body.method === "getblocktemplate")
                                .reply(200, JSON.stringify({
                                    id: "nocktest",
                                    error: null,
                                    result: rpcDataCopy,
                                }));
                            pool.processBlockNotify(hash, 'p2p');
                        });
                        pool.peer.emit('blockNotify', "example hash");
                    });
                });
            });
        });
    });

    test('Test pool peer events [8]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 5) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Block notification via p2p");
                expect(response[4][0]).toBe("error");
                expect(response[4][1]).toBe("Block notify error getting block template for Bitcoin");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.peer.on('blockNotify', function(hash) {
                            const scope = nock('http://127.0.0.1:8332')
                                .post('/', body => body.method === "getblocktemplate")
                                .reply(200, JSON.stringify({
                                    id: "nocktest",
                                    error: true,
                                    result: null,
                                }));
                            pool.processBlockNotify(hash, 'p2p');
                        });
                        pool.peer.emit('blockNotify', "example hash");
                    });
                });
            });
        });
    });

    test('Test pool peer events [9]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, null);
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 5) {
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Block notification via p2p");
                done();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.peer.emit('blockFound', "example hash");
                    });
                });
            });
        });
    });

    test('Test pool stratum events [1]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            pool.stratum.on('stopped', () => done());
                            expect(typeof pool.stratum).toBe('object');
                            expect(typeof pool.stratum.handleNewClient).toBe('function');
                            expect(typeof pool.stratum.broadcastMiningJobs).toBe('function');
                            expect(pool.stratum._eventsCount).toBe(4);
                            pool.stratum.stopServer();
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [2]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("No new blocks for 60 seconds - updating transactions & rebroadcasting work");
                pool.stratum.stopServer();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const scope = nock('http://127.0.0.1:8332')
                                .post('/', body => body.method === "getblocktemplate")
                                .reply(200, JSON.stringify({
                                    id: "nocktest",
                                    error: true,
                                    result: null,
                                }));
                            pool.stratum.emit('broadcastTimeout');
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [3]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 4) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("No new blocks for 60 seconds - updating transactions & rebroadcasting work");
                expect(response[2][0]).toBe("error");
                expect(response[2][1]).toBe("p2p connection failed - likely incorrect host or port");
                expect(response[3][0]).toBe("debug");
                expect(response[3][1]).toBe("Updated existing job for current block template");
                pool.stratum.stopServer();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const scope = nock('http://127.0.0.1:8332')
                                .post('/', body => body.method === "getblocktemplate")
                                .reply(200, JSON.stringify({
                                    id: "nocktest",
                                    error: null,
                                    result: rpcDataCopy,
                                }));
                            pool.stratum.emit('broadcastTimeout');
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [4]', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const rpcDataCopy = Object.assign({}, rpcData);
        rpcDataCopy.previousblockhash = "1d5af7e2ad9aeccb110401761938c07a5895d85711c9c5646661a10407c82769";
        rpcDataCopy.height = 2;
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 4) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("No new blocks for 60 seconds - updating transactions & rebroadcasting work");
                expect(response[2][0]).toBe("error");
                expect(response[2][1]).toBe("p2p connection failed - likely incorrect host or port");
                expect(response[3][0]).toBe("debug");
                expect(response[3][1]).toBe("Established new job for updated block template");
                pool.stratum.stopServer();
            };
        });
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const scope = nock('http://127.0.0.1:8332')
                                .post('/', body => body.method === "getblocktemplate")
                                .reply(200, JSON.stringify({
                                    id: "nocktest",
                                    error: null,
                                    result: rpcDataCopy,
                                }));
                            pool.stratum.emit('broadcastTimeout');
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [5]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("warning");
                expect(response[1][1]).toBe("Malformed message from client [example]: \"Message\"");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('malformedMessage', "Message");
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [6]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("warning");
                expect(response[1][1]).toBe("Socket error from client [example]: \"Error\"");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('socketError', "Error");
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [7]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("warning");
                expect(response[1][1]).toBe("Connection timed out for client [example]: Timeout");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('socketTimeout', "Timeout");
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [8]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("warning");
                expect(response[1][1]).toBe("Socket disconnect for client [example]");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('socketDisconnect');
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [9]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Rejected incoming connection from 127.0.0.1. The client is banned for 100000 seconds");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('kickedBannedIP', 100000);
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.remoteAddress = "127.0.0.1";
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [10]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Forgave banned IP 127.0.0.1");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('forgaveBannedIP');
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.remoteAddress = "127.0.0.1";
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [11]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Unknown stratum method from client [example]: Unknown");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('unknownStratumMethod', { method: "Unknown"});
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [12]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("warning");
                expect(response[1][1]).toBe("Detected socket flooding from client [example]");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('socketFlooded');
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [13]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("error");
                expect(response[1][1]).toBe("Client IP detection failed, tcpProxyProtocol is enabled yet did not receive proxy protocol message, instead got data: Data");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('tcpProxyError', "Data");
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [14]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("warning");
                expect(response[1][1]).toBe("Ban triggered for client [example]: Socket flooding");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('triggerBan', "Socket flooding");
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [15]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Difficulty updated successfully for worker: worker1");
                pool.stratum.stopServer();
            };
        });
        pool.on('difficultyUpdate', (worker, difficulty) => {
            pool.emit('log', 'debug', 'Difficulty updated successfully for worker: ' + worker);
        });
        pool.on('connectionSucceeded', () => {
            client.emit('difficultyChanged', 100000);
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.workerName = "worker1"
                            client.getLabel = () => { return "client [example]" };
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [16]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Client successfully subscribed to stratum network");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('subscription', {}, (error, extraNonce1, extraNonce2Size) => {
                pool.emit('log', 'debug', 'Client successfully subscribed to stratum network');
            });
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            client.sendDifficulty = (difficulty) => {};
                            client.sendMiningJob = (jobParams) => {};
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [17]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        optionsCopy.ports = Object.assign({}, options.ports);
        optionsCopy.ports["3001"] = Object.assign({}, options.ports["3001"]);
        delete optionsCopy.ports["3001"].initial;
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 1) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("debug");
                expect(response[0][1]).toBe("Client successfully subscribed to stratum network");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('subscription', {}, (error, extraNonce1, extraNonce2Size) => {
                pool.emit('log', 'debug', 'Client successfully subscribed to stratum network');
            });
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            client.sendDifficulty = (difficulty) => {};
                            client.sendMiningJob = (jobParams) => {};
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool stratum events [18]', (done) => {
        let client;
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 2) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Client successfully subscribed to stratum network");
                pool.stratum.stopServer();
            };
        });
        pool.on('connectionSucceeded', () => {
            client.emit('submit', {params: [0, 1, 2, 3, 4]}, (error, result) => {
                pool.emit('log', 'debug', 'Client successfully subscribed to stratum network');
            });
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            const socket = new events.EventEmitter();
                            client = new events.EventEmitter();
                            client.previousDifficulty = 0;
                            client.difficulty = 1,
                            client.extraNonce1 = 0,
                            client.remoteAddress = "127.0.0.1",
                            client.socket = socket;
                            client.socket.localPort = 3001;
                            client.getLabel = () => { return "client [example]" };
                            client.sendDifficulty = (difficulty) => {};
                            client.sendMiningJob = (jobParams) => {};
                            pool.stratum.emit('client.connected', client);
                        });
                    });
                });
            });
        });
    });

    test('Test pool info outputting', (done) => {
        const response = [];
        const optionsCopy = Object.assign({}, options);
        const pool = new Pool(optionsCopy, () => {});
        pool.on('log', (type, text) => {
            response.push([type, text]);
            if (response.length === 3) {
                pool.stratum.on('stopped', () => done());
                expect(response[0][0]).toBe("warning");
                expect(response[0][1]).toBe("Network diff of 0 is lower than port 3001 w/ diff 32");
                expect(response[1][0]).toBe("debug");
                expect(response[1][1]).toBe("Block template polling has been disabled");
                expect(response[2][0]).toBe("special");
                expect(response[2][1]).toBe("Stratum Pool Server Started for Bitcoin [BTC] {sha256d}\n\t\t\t\t\t\tNetwork Connected:	Mainnet\n\t\t\t\t\t\tCurrent Block Height:	1\n\t\t\t\t\t\tCurrent Connect Peers:	1\n\t\t\t\t\t\tCurrent Block Diff:	0.000244141\n\t\t\t\t\t\tNetwork Difficulty:	0\n\t\t\t\t\t\tStratum Port(s):	3001\n\t\t\t\t\t\tPool Fee Percentage:	5%");
                pool.stratum.stopServer();
            }
        });
        pool.setupDifficulty();
        mockSetupDaemon(pool, () => {
            mockSetupData(pool, () => {
                pool.setupRecipients();
                pool.setupJobManager();
                mockSetupBlockchain(pool, () => {
                    mockSetupFirstJob(pool, () => {
                        pool.setupBlockPolling();
                        pool.setupPeer();
                        pool.setupStratum(() => {
                            pool.outputPoolInfo();
                        });
                    });
                });
            });
        });
    });
});