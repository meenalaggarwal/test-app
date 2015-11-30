/*************************************************************************
 *
 * COMPRO CONFIDENTIAL
 * __________________
 *
 *  [2015] - [2020] Compro Technologies Private Limited
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Compro Technologies Private Limited. The
 * intellectual and technical concepts contained herein are
 * proprietary to Compro Technologies Private Limited and may
 * be covered by U.S. and Foreign Patents, patents in process,
 * and are protected by trade secret or copyright law.
 *
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Compro Technologies Pvt. Ltd..
 */

var http = require('http');
var cluster = require('cluster');
//var prettyStream = require('bunyan-prettystream');

module.exports = {

  //Microservice WEB cluster startup
  startWebCluster: function(web, callback) {
    http.globalAgent.maxSockets = Infinity;

    if(cluster.isMaster) {
      // Fork workers.
      for(var i = 0; i < 4; i++) {
        cluster.fork();
      }
      cluster.on('exit', function(worker, code, signal) {
        var msg = 'web ' + worker.process.pid + ' died, ' + signal;
        console.log(msg);
      });
    }
    else { start(); }

    function start() {

      process.on('SIGTERM', abort);
      process.on('SIGINT', abort);
      process.on('uncaughtException', function (err) {
        console.log('uncaughtException');
        console.log(err);
        setTimeout(function() {
          process.exit(1);
        }, 10000);
      });
      createServer();
      function createServer() {

        var server = http.createServer(web());
        var port = 5000;
        server.listen(port, onListen);

        function onListen() {
          var port = server.address().port;
          console.log('Listening: port ' + port);
          callback();
        }
      }

      function abort() {
        console.log('Shutting down', {
          abort: 'true'
        });
        setTimeout(function() {
          process.exit();
        }, 10000);
      }
    }
  }

};
