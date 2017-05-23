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
var dashboardRoutes = express.Router();
var logger = require('../utils/logger').logger;

/* GET Index page. */
dashboardRoutes.get('/dashboard', function (req, res) {
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

    res.render('dashboard/index', {
        title: 'Sección de administración | Blitz',
        level: '',
        isHome: true,
        layout: 'dashboard',
        error: error
    });
});

/* GET User list page. */
dashboardRoutes.get('/dashboard/users', function (req, res) {
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

    res.render('dashboard/users', {
        title: 'Usuarios | Blitz',
        level: '../../',
        isHome: true,
        layout: 'dashboard',
        error: error
    });
});

/* GET Murmur list page. */
dashboardRoutes.get('/dashboard/murmurs', function (req, res) {
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

    res.render('dashboard/murmurs', {
        title: 'Soplos cardíacos | Blitz',
        level: '../../',
        isHome: true,
        layout: 'dashboard',
        error: error
    });
});

module.exports = dashboardRoutes;