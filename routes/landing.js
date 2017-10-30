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
        logger.error(error);
    }

    res.render('landing/main', {
        title: 'Proyecto de grado de @AlejoJamC | Blitz',
        level: '',
        isHome: true,
        layout: 'landing',
        homeActive : true,
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
        logger.error(error);
    }

    res.render('landing/about', {
        title: 'Acerca de Blitz | Blitz',
        level: '../',
        layout: 'landing',
        aboutActive : true,
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
        logger.error(error);
    }

    res.render('landing/contact', {
        title: 'Contacto | Blitz',
        level: '../',
        layout: 'landing',
        contactActive : true,
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
        logger.error(error);
    }

    res.render('landing/terms', {
        title: 'Terminos y condiciones | Blitz',
        level: '../',
        isHome: false,
        layout: 'landing',
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
        logger.error(error);
    }

    res.render('landing/privacy', {
        title: 'Politicas de privacidad | Blitz',
        level: '../',
        isHome: false,
        layout: 'landing',
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
        logger.error(error);
    }

    res.render('landing/sitemap', {
        title: 'Mapa del sitio | Blitz',
        level: '../',
        isHome: false,
        layout: 'landing',
        error: error
    });
});

module.exports = landingRouter;