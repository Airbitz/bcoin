$(function(){


'use strict';

var t = '';

function gText(e) {
    t = (document.all) ? document.selection.createRange().text : document.getSelection();

    checkQR(t)
}

document.onmouseup = gText;
if (!document.all) document.captureEvents(Event.MOUSEUP);


function checkQR(text){
  // console.log(text);
  if (!text.anchorNode.data)
    return;
  text = text.anchorNode.data.slice(text.anchorOffset);
  // console.log(text,text.length==34,text.slice(0,1));
  if (text.length==34 && text.slice(0,1)=="1"){
    console.log(text,"YAY");
    //
    // $(".overlay").show();
    $("#qr").attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=bitcoin:"+text+"&chs=300x300&chld=L|0");
    $(".box").show();

  } else {
    $(".box").hide();
  }

}

var util = bcoin.util;
 
var items = [];
var scrollback = 0;
var logger, node, wdb;
var levelsByVal = [
  'none',
  'error',
  'warning',
  'info',
  'debug',
  'spam'
];

var started = 0;

function startFromKey(value){
  if (value.length==64){
    var w = new bcoin.hd.PrivateKey()
    w.fromSeed("5ad1fd622f79236309614c85c39b32b7999ef2ae175872e683c317db7375af5a")
    var key = w.toJSON()
    return startEngine(key.xprivkey)
  }

  if (value.length==111){
    return startEngine(value)
  }

  console.html("Please check the key || seed (must be 64 or 111 symbols long)");
}

console.html = function (msg){
  $("#consoleLogs").append("<div class='info'>"+msg+"</div>");
  $("#consoleLogs").scrollTop($("#consoleLogs")[0].scrollHeight);
}

console.nhtml = function (level,module,args){
  $("#networkLogs").append("<div class='info "+levelsByVal[level]+"'>"+levelsByVal[level]+" "+module+args.join(", ")+"</div>");
  // $("#networkLogs").scrollIntoView();
  $("#networkLogs").scrollTop($("#networkLogs")[0].scrollHeight);
  // $("#networkLogs").animate({ scrollTop: $("#networkLogs")[0].scrollHeight }, "fast");
}

console.html("Input seed or key and press enter;");


  $("#rockId").on("change",function(){
    startFromKey($(this).val());
  })


function startEngine(value){

  logger = new bcoin.logger({ level: 'debug', console: true });

  logger.open();

  logger.writeConsole = function(level, module, args) {
    console.nhtml(level,module,args);
  };

  logger.info = function(level, module, args) {
    console.nhtml(level,module,args);
  };
        

  var chain = new bcoin.chain({
    db: 'leveldb',
    location: "/spvchain",
    spv: true,
    network: 'main',
    logConsole: true,
    logger: logger
  });

  var pool = new bcoin.pool({
    chain: chain,
    spv: true,
    maxPeers: 8,
    logger: logger
  });


  var walletdb = new bcoin.walletdb({ db: 'memory', spv: true, logger: logger });

  /*

  {"Salt":"HpYrU6xCem8jG26QVacXEt1XIrddGM4Eo4n3i1ISFTRY2g/jaDXj6WjNT2A4OUSKPMlvtWFA8eBIYNgvUFHfUg==","Iterations":64000,
  "EncryptedKey":"X3Epvz6LA88yIKVM+hxxuQdO6dgpIBCFkPjS5lkljd+vSrJPqGkzz02M4/VVwFTfnaIpVLzQuy4+IxMB+t/QU0s74dPCgRO/4ov+ocP92dm8tNyluKYvXsRhYlTgkrfmJxGm+srUR0ve0SrMP4totA==",
  "EncryptedWalletPassword":"gNyXBL3/dfLZmc/1kw9TM5f51HnEbqFakbrzrQqnOvo=","EncryptedIdentifier":"Uvxs+7/VuzWlp1S42pmUDpJ4PgDLE3Y0j8FBBaCqI69pkd5v+E7hlSqQxk/V4x2EE3IY7Ai3Tv0R1JR21wMzHg==","Version":"1.2"}

   


  //1QE8ByvStmhb62zKpKTKujc6FNRqC2RfFV
  //WLTJqUYryqwPS4CKrBVMbMHYZCzhrBVnnezu
  // var xkey = { "xprivkey" : "xprv9s21ZrQH143K2Q8H18WMuiUzhMGpgnWguWoXKpkSEKCNakiSAXV8RfgZwxKh6qU7WCckJGrHkEMxKVKqQC5R1zikyNS5oaQ2n1FcJumPBD3"};

  // pool.open().then(function() {
  //   return walletdb.open();
  // }).then(function() {
  //   walletdb.getAccounts(0).then(function(res){
  //     console.html(res);
  //   })
    
  //   var myWallet = new bcoin.wallet.Wallet(walletdb,)

  //   // // myWallet.importKey();
    
  //   // console.html(myWallet);
  //   // console.html(myWallet.getAddress());
  // });


  //xprv9s21ZrQH143K2bgLxDBR57jtCueuYYMYREehNPzZQvTKX49Z23MLYwJ6kCShgEz4vVsEf5FBptWAibyEatYDJMTKV8tTrRgFxsWTtRzKGoK 5KZ //1Pxt8ssYWSFSgcgZ4gHVqAe4SjZVAYxzAF
  //xprv9s21ZrQH143K2Q8H18WMuiUzhMGpgnWguWoXKpkSEKCNakiSAXV8RfgZwxKh6qU7WCckJGrHkEMxKVKqQC5R1zikyNS5oaQ2n1FcJumPBD3 2tB //1QE8ByvStmhb62zKpKTKujc6FNRqC2RfFV
  // REAL xprv9s21ZrQH143K2ZVuyZYuv8uFKcGYTsEWCb3cKV1FzQj45oqFiQts2gVZ4qfjfso3J74Snru1ZYAmarb8dHcDwtuWkoPJ6wr8vz269oQCrDp

  */
  pool.open().then(function() {
    return walletdb.open({logger:logger});
  }).then(function() {
    return walletdb.create({
      "master": value,
      "id": "AirBitzMain"
    });

    // return walletdb.create();
  }).then(function(wallet) {
    // console.html(wallet);
    // console.html(walletdb.toJSON());
    console.html("Root m/0/0/0 => "+wallet.getID());

    console.html('Main address: '+ wallet.getAddress('base58check'));
    
    // console.html(wallet.master.key.toJSON());
    // wallet.account.receiveDepth = 3;

    // console.html("R => ",wallet.getID());
    // console.html("receive => ",wallet.account.receive);

    

    // console.html(logger);
    
    wallet.getAccountPaths(0).then(function(result){
      var a;
      for (var i in result){
        a =result[i].toAddress();

        // console.html("Paths======>",a.toString());
      }
    });
    pool.watchAddress(wallet.getAddress('base58check'));
    

    // wallet.getBalance(0).then(function(result){
    //     console.html("Balance======>",result);
    // });
    console.html("Generating 20 nearest addresses");
    for (var i=0;i<20;i++){
      wallet.createKey(0).then(function (res){
        pool.watchAddress(res.getAddress('base58check'));  
        console.html("watching " + res.getAddress('base58check'));
      });
    }
    
    // Add our address to the spv filter.
    

    // Connect, start retrieving and relaying txs
    pool.connect().then(function() {
      // Start the blockchain sync.
      pool.startSync();

      pool.on('tx', function(tx) {
        walletdb.addTX(tx);
      });

      wallet.on('balance', function(balance) {
        console.html('Balance updated.');
        console.html(bcoin.amount.btc(balance.unconfirmed));
      });
    });
  });

}


// node = new bcoin.fullnode({
//   hash: true,
//   query: true,
//   prune: true,
//   network: 'main',
//   db: 'leveldb',
//   coinCache: 1,
//   maxPeers:8,
//   logConsole: true,
//   logger: logger,
//   spv: true
// });

// wdb = node.use(bcoin.walletplugin);

// node.on('error', function(err) {
//   ;
// });

// node.chain.on('block', addItem);
// node.mempool.on('tx', addItem);

// node.open().then(function() {
//   return node.connect();
// }).then(function() {
//   node.startSync();

//   wdb.primary.on('balance', function() {
//     formatWallet(wdb.primary);
//   });

//   formatWallet(wdb.primary);
// }).catch(function(err) {
//   throw err;
// });

});
