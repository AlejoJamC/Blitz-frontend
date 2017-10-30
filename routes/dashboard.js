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
var request = require('request');
var express = require('express');
var dashboardRoutes = express.Router();
var logger = require('../utils/logger').logger;

/* GET Index page. */
dashboardRoutes.get('/dashboard', function(req, res) {
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
        title: 'Sección de administración | Administración | Blitz',
        level: '',
        isHome: true,
        layout: 'dashboard',
        error: error
    });
});

/* GET User list page. */
dashboardRoutes.get('/dashboard/users', function(req, res) {
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
        title: 'Usuarios | Administración | Blitz',
        level: '../../',
        isHome: true,
        layout: 'dashboard',
        error: error
    });
});
/* GET Admin list page. */
dashboardRoutes.get('/dashboard/admins', function(req, res) {
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

    res.render('dashboard/admins', {
        title: 'Administradores | Administración | Blitz',
        level: '../../',
        isHome: true,
        layout: 'dashboard',
        error: error
    });
});
/* GET Murmur list page. */
dashboardRoutes.get('/dashboard/murmurs', function(req, res) {
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
        title: 'Soplos cardíacos | Administración | Blitz',
        level: '../../',
        isHome: true,
        layout: 'dashboard',
        error: error
    });
});

/* GET users list. */
dashboardRoutes.get('/users/ajax', function(req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session

    /*if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }*/

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    logger.info(api + '/users');

    // Request options
    var options = {
        url: api + '/users',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    };

    request.get(options, function(err, httpResponse, body) {
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
/* PUT user. */
dashboardRoutes.put('/users/ajax', function(req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session

    /*if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }*/
    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var status = req.body.status;
    var password = req.body.password;

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    logger.info(api + '/users' + req.body.id);

    // Request options
    var options = {
        url: api + '/users/' + req.body.id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        json: {
            'firstName': firstname,
            'lastName': lastname,
            'password': password,
            'status': status
        }
    };

    request.put(options, function(err, httpResponse, body) {
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
/* POST user. */
dashboardRoutes.post('/users/ajax', function(req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session

    /*if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }*/
    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var status = req.body.status;
    var password = req.body.password;
    var email = req.body.email;

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    logger.info(api + '/users');

    // Request options
    var options = {
        url: api + '/users/',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        json: {
            'firstName': firstname,
            'lastName': lastname,
            'password': password,
            'status': status,
            'email': email
        }
    };

    request.post(options, function(err, httpResponse, body) {
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
/* DELETE user. */
dashboardRoutes.delete('/users/ajax/:id', function(req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session

    /*if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }*/
    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    logger.info(api + '/users' + req.params.id);

    // Request options
    var options = {
        url: api + '/users/' + req.params.id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    };

    request.delete(options, function(err, httpResponse, body) {
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
                        message: 'Invalid Request Body, could not be parsed as JSON | Blitz Server',
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
/* GET admins list. */
dashboardRoutes.get('/admins/ajax', function(req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session

    /*if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }*/

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    logger.info(api + '/admins');

    // Request options
    var options = {
        url: api + '/admin',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    };

    request.get(options, function(err, httpResponse, body) {
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
/* PUT user. */
dashboardRoutes.put('/admins/ajax', function(req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session

    /*if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }*/
    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var status = req.body.status;
    var password = req.body.password;

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    logger.info(api + '/admins' + req.body.id);

    // Request options
    var options = {
        url: api + '/admin/' + req.body.id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        json: {
            'firstName': firstname,
            'lastName': lastname,
            'password': password,
            'status': status
        }
    };

    request.put(options, function(err, httpResponse, body) {
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
/* POST user. */
dashboardRoutes.post('/admins/ajax', function(req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session

    /*if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }*/
    var firstname = req.body.firstName;
    var lastname = req.body.lastName;
    var status = req.body.status;
    var password = req.body.password;
    var email = req.body.email;

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    logger.info(api + '/admin');

    // Request options
    var options = {
        url: api + '/admin/',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        json: {
            'firstName': firstname,
            'lastName': lastname,
            'password': password,
            'status': status,
            'email': email
        }
    };

    request.post(options, function(err, httpResponse, body) {
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
/* DELETE user. */
dashboardRoutes.delete('/admins/ajax/:id', function(req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session

    /*if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }*/
    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    logger.info(api + '/admin' + req.params.id);

    // Request options
    var options = {
        url: api + '/admin/' + req.params.id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    };

    request.delete(options, function(err, httpResponse, body) {
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
                        message: 'Invalid Request Body, could not be parsed as JSON | Blitz Server',
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

module.exports = dashboardRoutes;