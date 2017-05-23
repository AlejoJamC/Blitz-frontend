/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Module dependencies
 */
var express = require('express');
var contentRouter = express.Router();
var logger = require('../utils/logger').logger;

/* GET Content page. */
contentRouter.get('/content', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session
    /*
     if(typeof req.session.userId === 'undefined' || typeof req.session.userId === ''){
     return res.redirect('/login');
     }
     */

    res.render('main/murmurs', {
        title: 'Bachelor\'s Degree Final Project | Blitz',
        level: '../',
        isHome: true,
        layout: 'main',
        error: error
    });
});

/* GET Content/:id page. */
contentRouter.get('/content/:id', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session
    /*
     if(typeof req.session.userId === 'undefined' || typeof req.session.userId === ''){
     return res.redirect('/login');
     }
     */

    res.render('main/murmurDetail', {
        title: 'Bachelor\'s Degree Final Project | Blitz',
        level: '',
        isHome: true,
        layout: 'main',
        error: error
    });
});


module.exports = contentRouter;