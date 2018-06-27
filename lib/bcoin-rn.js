/*!
 * bcoin.js - a javascript bitcoin library.
 * Copyright (c) 2014-2015, Fedor Indutny (MIT License).
 * Copyright (c) 2014-2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

'use strict';

/**
 * A bcoin "environment" which exposes all
 * constructors for primitives, the blockchain,
 * mempool, wallet, etc. It also exposes a
 * global worker pool.
 *
 * @exports bcoin
 * @type {Object}
 *
 * @property {Function} bn - See {@url https://github.com/indutny/bn.js}.
 * @property {Object} elliptic - See {@url https://github.com/indutny/elliptic}.
 *
 * @property {Object} bip70 - See {@link module:bip70}.
 *
 * @property {Object} blockchain - See {@link module:blockchain}.
 * @property {Function} chain - See {@link module:blockchain.Chain}.
 * @property {Function} chaindb - See {@link module:blockchain.ChainDB}.
 * @property {Function} chainentry - See {@link module:blockchain.ChainEntry}.
 *
 * @property {Object} btc
 * @property {Function} amount
 * @property {Function} uri
 *
 * @property {Object} coins
 * @property {Function} coinview
 *
 * @property {Object} crypto
 * @property {Object} secp256k1
 * @property {Object} schnorr
 *
 *
 * @property {Object} hd
 *
 *
 * @property {Object} primitives
 * @property {Object} address
 * @property {Object} block
 * @property {Object} coin
 * @property {Object} headers
 * @property {Object} input
 * @property {Object} invitem
 * @property {Object} keyring
 * @property {Object} merkleblock
 * @property {Object} mtx
 * @property {Object} netaddress
 * @property {Object} outpoint
 * @property {Object} output
 * @property {Object} tx
 *
 * @property {Object} consensus
 * @property {Object} network
 * @property {Object} networks
 *
 * @property {Object} txscript
 * @property {Object} opcodes
 * @property {Object} program
 * @property {Object} script
 * @property {Object} sigcache
 * @property {Object} stack
 * @property {Object} witness
 *
 * @property {Object} utils
 * @property {Object} base32
 * @property {Object} base58
 *
 */

const bcoin = exports;

/**
 * Set the default network.
 * @param {String} network
 */

bcoin.set = function set(network) {
  bcoin.network.set(network);
  return bcoin;
};

/**
 * Cache all necessary modules.
 */

bcoin.cache = function cache() {
  ;
};

/*
 * Expose
 */

// Horrible BIP
bcoin.bip70 = require('./bip70');

// BTC
bcoin.btc = require('./btc');
bcoin.amount = require('./btc/amount');
bcoin.uri = require('./btc/uri');

// Coins
bcoin.coins = require('./coins');
bcoin.coinview = require('./coins/coinview');

// Crypto
bcoin.crypto = require('./crypto');
bcoin.bn = require('./crypto/bn');
bcoin.secp256k1 = require('./crypto/secp256k1');
bcoin.schnorr = require('./crypto/schnorr');

// HD
bcoin.hd = require('./hd');

// Primitives
bcoin.primitives = require('./primitives');
bcoin.address = require('./primitives/address');
bcoin.block = require('./primitives/block');
bcoin.coin = require('./primitives/coin');
bcoin.headers = require('./primitives/headers');
bcoin.input = require('./primitives/input');
bcoin.invitem = require('./primitives/invitem');
bcoin.keyring = require('./primitives/keyring');
bcoin.merkleblock = require('./primitives/merkleblock');
bcoin.mtx = require('./primitives/mtx');
bcoin.netaddress = require('./primitives/netaddress');
bcoin.outpoint = require('./primitives/outpoint');
bcoin.output = require('./primitives/output');
bcoin.tx = require('./primitives/tx');

// Protocol
bcoin.consensus = require('./protocol/consensus');
bcoin.network = require('./protocol/network');
bcoin.networks = require('./protocol/networks');

// Script
bcoin.txscript = require('./script');
bcoin.opcode = require('./script/opcode');
bcoin.program = require('./script/program');
bcoin.script = require('./script/script');
bcoin.scriptnum = require('./script/scriptnum');
bcoin.sigcache = require('./script/sigcache');
bcoin.stack = require('./script/stack');
bcoin.witness = require('./script/witness');

// Utils
bcoin.utils = require('./utils');
bcoin.base32 = require('./utils/base32');
bcoin.base58 = require('./utils/base58');