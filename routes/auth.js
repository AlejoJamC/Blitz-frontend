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
var request = require('request');
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

    res.render('auth/signin', {
        title: 'Iniciar sesión | Blitz',
        level: '../',
        isHome: true,
        layout: 'auth',
        error: error
    });
});

/* POST Login page. */
authRoutes.post('/login/ajax', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }

    var email = req.body.email;
    var password = req.body.password;

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '')
        + (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var tokenCompose = email + ':' + password;
    tokenCompose = new Buffer(tokenCompose).toString('base64');

    // Request options
    var options = {
        url: api + '/login',
        headers: {
            'Authorization': 'Basic ' + tokenCompose,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    };

    request.get(options, function (err, httpResponse, body) {
        // Request error
        if (err) {
            logger.error(err);
            return res.status(500).send(err);
        }

        if (httpResponse.statusCode !== 200) {
            switch (httpResponse.statusCode) {
                case 400:
                    logger.error(err);
                    return res.status(400).send({
                        message: '	Invalid Request Body, could not be parsed as JSON | Blitz Server',
                        error: body.errors
                    });
                    break;
                case 401:
                    logger.error(err);
                    return res.status(401).send({
                        message: 'Unauthorized | Blitz Server',
                        error: body
                    });
                    break;
                case 422:
                    logger.error(err);
                    return res.status(422).send({
                        message: 'Unprocessable Entity; there are errors in one or more of the fields provided in the request body | Blitz Server',
                        error: body.errors
                    });
                    break;
                default:
                    logger.error(err);
                    return res.status(500).send({
                        message: '	Server error - contact your administrator',
                        error: body.errors
                    });
                    break;
            }
        }

        if (httpResponse.statusCode === 200) {
            var objBody = JSON.parse(body);
            req.session.userId = objBody.data._id;
            req.session.userEmail = email;
            req.session.userType = 'standard';
            req.session.compose = tokenCompose;
        }

        return res.send(httpResponse);
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

    res.render('auth/signup', {
        title: 'Crear un nuevo usuario | Blitz',
        level: '../',
        layout: 'auth',
        error: error
    });
});

/* POST Signup page. */
authRoutes.post('/signup/ajax', function (req, res) {
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

    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '')
        + (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    // Request options
    var options = {
        url: api + '/users',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        json: {
            'firstName': firstname,
            'lastName': lastname,
            'email': email,
            'password': password
        }
    };

    request.post(options, function (err, httpResponse, body) {
        // Request error
        if (err) {
            logger.error(err);
            return res.status(500).send(err);
        }

        if (httpResponse.statusCode !== 200) {
            switch (httpResponse.statusCode) {
                case 400:
                    logger.error(err);
                    return res.status(400).send({
                        message: '	Invalid Request Body, could not be parsed as JSON | Blitz Server',
                        error: body.errors
                    });
                    break;
                case 401:
                    logger.error(err);
                    return res.status(401).send({
                        message: 'Unauthorized | Blitz Server',
                        error: body
                    });
                    break;
                case 422:
                    logger.error(err);
                    return res.status(422).send({
                        message: 'Unprocessable Entity; there are errors in one or more of the fields provided in the request body | Blitz Server',
                        error: body.errors
                    });
                    break;
                default:
                    logger.error(err);
                    return res.status(500).send({
                        message: '	Server error - contact your administrator',
                        error: body.errors
                    });
                    break;
            }
        }

        return res.send(httpResponse);
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

    res.render('auth/forgot', {
        title: 'Recuperar contraseña | Blitz',
        level: '../',
        layout: 'auth',
        error: error
    });
});

/* GET Login page. */
authRoutes.get('/forgot/reset', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }

    //query params
    var emptyValues = false;
    var email = req.query.email;
    var code = req.query.c;
    var random1 = req.query.active;
    var random2 = req.query.alter;

    if (typeof email === 'undefined' || typeof code === 'undefined' || typeof random1 === 'undefined' || typeof random2 === 'undefined') {
        emptyValues = true;
    }

    if (emptyValues) {
        logger.info('retorno por valores');
        return res.render('auth/reset', {
            title: 'Recuperar contraseña | Blitz',
            level: '../../',
            isHome: true,
            emptyValues: emptyValues,
            layout: 'auth',
            error: error
        });
    }

    // Activate the user
    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    // Request options
    var options = {
        url: api + '/password/confirmation/' + code + '/' + email,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    };

    request.get(options, function (err, httpResponse, body) {
        // Request error
        if (err) {
            logger.error(err);
            return res.status(500).send(err);
        }

        if (httpResponse.statusCode === 422 || httpResponse.statusCode !== 200) {
            emptyValues = true;
            return res.render('auth/reset', {
                title: 'Verificar correo electronico | Blitz',
                level: '../../',
                isHome: true,
                emptyValues: emptyValues,
                layout: 'auth',
                error: error
            });
        }

        return res.render('auth/reset', {
            title: 'Verificar correo electronico | Blitz',
            level: '../../',
            isHome: true,
            emptyValues: emptyValues,
            codeReset: code,
            emailReset: email,
            layout: 'auth',
            error: error
        });
    });
});

/* POST Forgot page. */
authRoutes.post('/forgot/ajax', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }

    var email = req.body.email;

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '')
        + (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    // Request options
    var options = {
        url: api + '/password/reset',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        json: {
            'email': email
        }
    };

    request.post(options, function (err, httpResponse, body) {
        // Request error
        if (err) {
            logger.error(err);
            return res.status(500).send(err);
        }

        if (httpResponse.statusCode !== 200) {
            switch (httpResponse.statusCode) {
                case 400:
                    logger.error(err);
                    return res.status(400).send({
                        message: '	Invalid Request Body, could not be parsed as JSON | Blitz Server',
                        error: body.errors
                    });
                    break;
                case 401:
                    logger.error(err);
                    return res.status(401).send({
                        message: 'Unauthorized | Blitz Server',
                        error: body
                    });
                    break;
                case 422:
                    logger.error(err);
                    return res.status(422).send({
                        message: 'Unprocessable Entity; there are errors in one or more of the fields provided in the request body | Blitz Server',
                        error: body.errors
                    });
                    break;
                default:
                    logger.error(err);
                    return res.status(500).send({
                        message: '	Server error - contact your administrator',
                        error: body.errors
                    });
                    break;
            }
        }

        // succes
        return res.send(httpResponse);
    });
});

/* POST Reset page. */
authRoutes.post('/reset/ajax', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }

    var email = req.body.email;
    var code = req.body.code;
    var password = req.body.password;

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '')
        + (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    // Request options
    var options = {
        url: api + '/password/reset/' + code,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        json: {
            'email': email,
            'password': password,
            'code': code
        }
    };

    request.patch(options, function (err, httpResponse, body) {
        // Request error
        if (err) {
            logger.error(err);
            return res.status(500).send(err);
        }

        if (httpResponse.statusCode !== 200) {
            switch (httpResponse.statusCode) {
                case 400:
                    logger.error(err);
                    return res.status(400).send({
                        message: '	Invalid Request Body, could not be parsed as JSON | Blitz Server',
                        error: body.errors
                    });
                    break;
                case 401:
                    logger.error(err);
                    return res.status(401).send({
                        message: 'Unauthorized | Blitz Server',
                        error: body
                    });
                    break;
                case 422:
                    logger.error(err);
                    return res.status(422).send({
                        message: 'Unprocessable Entity; there are errors in one or more of the fields provided in the request body | Blitz Server',
                        error: body.errors
                    });
                    break;
                default:
                    logger.error(err);
                    return res.status(500).send({
                        message: '	Server error - contact your administrator',
                        error: body.errors
                    });
                    break;
            }
        }

        // succes
        return res.send(httpResponse);
    });
});

/* GET Logout page. */
authRoutes.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            logger.error(err);
            res.redirect('/login?error=101');
        }
        res.redirect('/login');
    });
});

/* GET Login page. */
authRoutes.get('/login/verify', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }

    //query params
    var emptyValues = false;
    var email = req.query.email;
    var code = req.query.c;
    var random1 = req.query.active;
    var random2 = req.query.alter;

    if (typeof email === 'undefined' || typeof code === 'undefined' || typeof random1 === 'undefined' || typeof random2 === 'undefined') {
        emptyValues = true;
    }

    if (emptyValues) {
        return res.render('auth/verify', {
            title: 'Verificar correo electronico | Blitz',
            level: '../../',
            isHome: true,
            emptyValues: emptyValues,
            layout: 'auth',
            error: error
        });
    }

    // Activate the user
    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    // Request options
    var options = {
        url: api + '/activations/codes/' + code,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'PATCH',
        json: {
            'email': email
        }
    };

    request.patch(options, function (err, httpResponse, body) {
        // Request error
        if (err) {
            logger.error(err);
            return res.status(500).send(err);
        }

        logger.info(httpResponse.statusCode);

        if (httpResponse.statusCode === 422 || httpResponse.statusCode !== 200) {
            emptyValues = true;
            return res.render('auth/verify', {
                title: 'Verificar correo electronico | Blitz',
                level: '../../',
                isHome: true,
                emptyValues: emptyValues,
                layout: 'auth',
                error: error
            });
        }

        return res.render('auth/verify', {
            title: 'Verificar correo electronico | Blitz',
            level: '../../',
            isHome: true,
            emptyValues: emptyValues,
            layout: 'auth',
            error: error
        });
    });
});

module.exports = authRoutes;