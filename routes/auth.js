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
var authRoutes = express.Router();
var logger = require('../utils/logger').logger;

/* GET Login page. */
authRoutes.get('/login', function (req, res) {
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
    // User Rol
    // If ............
    res.render('auth/signin', {
        title: 'Iniciar sesión | Blitz',
        level: '../',
        isHome: true,
        layout: 'auth',
        error: error
    });
});

/* GET Signup page. */
authRoutes.get('/signup', function (req, res) {
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
    // User Rol
    // If ............
    res.render('auth/signup', {
        title: 'Iniciar sesión | Blitz',
        level: '../',
        layout: 'auth',
        error: error
    });
});

/* GET Forgot password page. */
authRoutes.get('/forgot', function (req, res) {
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
    // User Rol
    // If ............
    res.render('auth/forgot', {
        title: 'Recuperar contraseña | Blitz',
        level: '../',
        layout: 'auth',
        error: error
    });
});

/* GET Logout page. */
authRoutes.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            logger.info(err);
        }
        res.redirect('/login');
    });
});


module.exports = authRoutes;