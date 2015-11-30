'use strict';

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

var express = require('express');

// Setup Core Route Handlers
var org = require('./api/routes/org');

// WEB CONSTRUCTOR
// Web (or WEB) represents the main "server" process of the microservice
// Expects 1 parameters: the APP instance (business logic and shared code
// with WORKER)
module.exports = function Web() {
  var web = express();
  web
    .use('/', org());

  return web;
};
