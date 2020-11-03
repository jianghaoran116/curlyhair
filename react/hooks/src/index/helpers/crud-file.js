import CryptoJS from 'crypto-js';

let aesSecretKey = 'MacRP_APP_123456';

function encryptByAES(strEncrypt, value) {
  if (value) {
    let keyValue = 'MacRP_APP_' + value
    aesSecretKey = keyValue
  }
  let aesSecretUtf8 = CryptoJS.enc.Utf8.parse(aesSecretKey)
  const iv = CryptoJS.enc.Base64.parse('MacRP_APP_666666')
  let aesEncrypt = CryptoJS.AES.encrypt(strEncrypt, aesSecretUtf8, {
    iv: iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return aesEncrypt.toString()
}

function unEncryptByAES(strEncrypt, value) {
  if (value) {
    let keyValue = 'MacRP_APP_' + value
    aesSecretKey = keyValue
  }
  let aesSecretUtf8 = CryptoJS.enc.Utf8.parse(aesSecretKey)
  const iv = CryptoJS.enc.Base64.parse('MacRP_APP_666666')
  let aesUnEncrypt = CryptoJS.AES.decrypt(strEncrypt, aesSecretUtf8,
    {
      iv: iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
  return aesUnEncrypt.toString(CryptoJS.enc.Utf8)
}
function md5(value) {
  return CryptoJS.MD5(value).toString()
}


// var db = null;
// //事件deviceready就绪后创建数据库
// document.addEventListener('deviceready', function() {
//   var db = window.sqlitePlugin.openDatabase({name: "MacRP_APP.db"});

//   db.transaction(function(tx) {
//     tx.executeSql('DROP TABLE IF EXISTS messageList');
//     tx.executeSql('CREATE TABLE IF NOT EXISTS MessageList (id integer primary key, data text, data_num integer)');

//     // demonstrate PRAGMA:
//     db.executeSql("pragma table_info (messageList);", [], function(res) {
//       console.log("PRAGMA res: " + JSON.stringify(res));
//     });

//     tx.executeSql("INSERT INTO MessageList (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
//     console.log("insertId: " + res.insertId + " -- probably 1");
//     console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

//     db.transaction(function(tx) {
//       tx.executeSql("select count(id) as cnt from MessageList;", [], function(tx, res) {
//         alert(res.rows.length + 'length')
//       console.log("res.rows.length: " + res.rows.length + " -- should be 1");
//       console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
//       });
//     });

//     }, function(e) {
//       console.log("ERROR: " + e.message)
//     })
//   });
//   // db = window.sqlitePlugin.openDatabase({name: 'MacRP_APP.db', location: 'default'})
//   // db.transaction(function(tx) {
//   //   alert('create')
//   //   //建表
//   //   tx.executeSql('CREATE TABLE IF NOT EXISTS MessageList (name, score)')
//   //   //插入操作
//   //   tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101])
//   //   tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202])
//   //   }, function(error) {//失败回调
//   //     db.transaction(function(tx) {
//   //       alert(2)
//   //       tx.executeSql('SELECT count(*) AS mycount FROM MessageList', [], function(tx, rs) {//操作成功的回调函数里面 有 tx 参数和 rs 参数
//   //         //可以打印查询成功的信息
//   //         alert(1)
//   //         alert(rs.rows.item(0))
//   //         console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount)
//   //         // alert(rs.rows.item(0))
//   //       }, function(tx, error) {
//   //         //打印查询失败的信息
//   //         console.log('SELECT error: ' + error.message)
//   //       })
//   //     })
//   //   console.log('Transaction ERROR: ' + error.message)
//   //   }, function() {//成功回调
//   //   console.log('Populated database OK')
//   // });


// });
























/*
 * 打开或创建文件夹,创建文件并写入内容
 * Android:sdcard/MacRP/Message/xxx.json
 * IOS:cdvfile://localhost/persistent/MacRP/Message/xxx.json
 * 文件目录存在则打开,不存在则创建
 * */
function createAndWriteFile(fileName, content) {
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('打开的文件系统: ' + fs.name);
    fs.root.getDirectory('MacRP', { create: true }, function (dirEntry) {
      dirEntry.getDirectory('Message', { create: true }, function (subDirEntry) {
        subDirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
          fileEntry.name == fileName
          fileEntry.fullPath == 'MacRP/Message/' + fileName
          //文件内容
          var dataObj = new Blob([content], { type: 'text/plain' })
          //写入文件
          writeFile(fileEntry, dataObj)
        }, onErrorCreateFile)
      }, onErrorGetDir)
    }, onErrorGetDir)
  }, onErrorLoadFs)
}

/*
* 依次打开指定目录文件夹,读取文件内容
 * Android:sdcard/MacRP/Message/xxx.json
 * IOS:cdvfile://localhost/persistent/MacRP/Message/xxx.json
* 目录和文件存在则打开,不存在则退出
* */
function getAndReadFile(fileName, afterReader) {
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
    console.log('打开的文件系统: ' + fs.name);
    fs.root.getDirectory('MacRP', { create: false }, function (dirEntry) {
      dirEntry.getDirectory('Message', { create: false }, function (subDirEntry) {
        subDirEntry.getFile(fileName, { create: false, exclusive: false }, function (fileEntry) {
          console.log("是否是个文件？" + fileEntry.isFile.toString());
          fileEntry.name == fileName;
          fileEntry.fullPath == 'MacRP/Message/' + fileName
          readFile(fileEntry, afterReader)
        }, onErrorCreateFile);
      }, onErrorGetDir);
    }, onErrorGetDir);
  }, onErrorLoadFs);
}

//将内容数据写入到文件中
function writeFile(fileEntry, dataObj) {
  //创建一个写入对象
  fileEntry.createWriter(function (fileWriter) {

    //文件写入成功
    let oldDate = new Date()
    fileWriter.onwriteend = function () {
      let newDate = new Date()
      alert(newDate - oldDate)
      console.log("Successful file write...")
    }

    //文件写入失败
    fileWriter.onerror = function (e) {
      console.log("Failed file write: " + e.toString())
    }

    //写入文件
    fileWriter.write(dataObj)
  });
}

//读取文件
function readFile(fileEntry, afterReader) {
  fileEntry.file(function (file) {
    var reader = new FileReader()
    reader.onloadend = function () {
      afterReader(this.result)
      // $$('#file_content_info').html(this.result);
      // console.log("file read success:" + this.result);
    }
    reader.readAsText(file)
  }, onErrorReadFile)
}

//FileSystem加载失败回调
function onErrorLoadFs(error) {
  console.log("文件系统加载失败！")
}

//文件夹创建失败回调
function onErrorGetDir(error) {
  console.log("文件夹创建失败！")
}

//文件创建失败回调
function onErrorCreateFile(error) {
  console.log("文件创建失败！")
}

//读取文件失败响应
function onErrorReadFile() {
  console.log("文件读取失败!");
}

// createAndWriteFile('hahaha')
export default {
  createAndWriteFile,
  getAndReadFile,
  encryptByAES,
  md5,
  unEncryptByAES,
};
