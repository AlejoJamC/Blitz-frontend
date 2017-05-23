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
var landingRouter = express.Router();
var logger = require('../utils/logger').logger;

/* GET Index page. */
landingRouter.get('/', function (req, res) {
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

    res.render('main/landing', {
        title: 'Bachelor\'s Degree Final Project | Blitz',
        level: '',
        isHome: true,
        layout: 'main',
        error: error
    });
});

/* GET about page. */
landingRouter.get('/about', function (req, res) {
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

    res.render('main/about', {
        title: 'Acerca de Blitz | Blitz',
        level: '../',
        layout: 'main',
        error: error
    });
});

/* GET contact page. */
landingRouter.get('/contact', function (req, res) {
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

    res.render('main/contact', {
        title: 'Contacto | Blitz',
        level: '../',
        layout: 'main',
        error: error
    });
});

/* GET Help page. */
landingRouter.get('/help', function (req, res) {
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

    res.render('landing/help', {
        title: 'Ayuda | Moon HR',
        level: '../',
        isHome: false,
        layout: 'landing/struct',
        error: error
    });
});

/* GET Pricing page. */
landingRouter.get('/pricing', function (req, res) {
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

    res.render('landing/pricing', {
        title: 'Planes | Moon HR',
        level: '../',
        isHome: false,
        layout: 'landing/struct',
        error: error
    });
});

/* GET Privacy page. */
landingRouter.get('/privacy', function (req, res) {
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

    res.render('landing/privacy', {
        title: 'Politicas de privacidad | Moon HR',
        level: '../',
        isHome: false,
        layout: 'landing/struct',
        error: error
    });
});

/* GET Sitemap page. */
landingRouter.get('/sitemap', function (req, res) {
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

    res.render('landing/sitemap', {
        title: 'Mapa del sitio | Moon HR',
        level: '../',
        isHome: false,
        layout: 'landing/struct',
        error: error
    });
});

/* GET Terms page. */
landingRouter.get('/terms', function (req, res) {
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

    res.render('landing/terms', {
        title: 'Terminos y condiciones | Moon HR',
        level: '../',
        isHome: false,
        layout: 'landing/struct',
        error: error
    });
});

module.exports = landingRouter;