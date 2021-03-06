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
dashboardRoutes.get('/dashboard', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }

    // Session
    if (typeof req.session.userId === 'undefined' || typeof req.session.userId === ''
        || typeof req.session.userType === 'undefined') {
        return res.redirect('/login');
    }else if(req.session.userType !== 'adminblitz'){
        return res.redirect('/content');
    }

    res.render('dashboard/index', {
        title: 'Sección de administración | Administración | Blitz',
        level: '',
        isHome: true,
        layout: 'dashboard',
        userProfile: req.session.userFull,
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
    if (typeof req.session.userId === 'undefined' || typeof req.session.userId === ''
        || typeof req.session.userType === 'undefined') {
        return res.redirect('/login');
    } else if (req.session.userType !== 'adminblitz') {
        return res.redirect('/content');
    }

    res.render('dashboard/users', {
        title: 'Usuarios | Administración | Blitz',
        level: '../../',
        isHome: true,
        userProfile: req.session.userFull,
        layout: 'dashboard',
        error: error
    });
});

/* GET Admin list page. */
dashboardRoutes.get('/dashboard/admins', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session
    if (typeof req.session.userId === 'undefined' || typeof req.session.userId === ''
        || typeof req.session.userType === 'undefined') {
        return res.redirect('/login');
    } else if (req.session.userType !== 'adminblitz') {
        return res.redirect('/content');
    }

    res.render('dashboard/admins', {
        title: 'Administradores | Administración | Blitz',
        level: '../../',
        isHome: true,
        userProfile: req.session.userFull,
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
    if (typeof req.session.userId === 'undefined' || typeof req.session.userId === ''
        || typeof req.session.userType === 'undefined') {
        return res.redirect('/login');
    } else if (req.session.userType !== 'adminblitz') {
        return res.redirect('/content');
    }

    res.render('dashboard/murmurs', {
        title: 'Soplos cardíacos | Administración | Blitz',
        level: '../../',
        isHome: true,
        userProfile: req.session.userFull,
        layout: 'dashboard',
        error: error
    });
});

/* GET Admin Login page. */
dashboardRoutes.get('/dashboard/login', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }

    res.render('dashboard/login', {
        title: 'Iniciar sesión como administrador | Blitz',
        level: '../',
        isDashboard: true,
        userProfile: req.session.userFull,
        layout: 'auth',
        error: error
    });
});

/* GET users list. */
dashboardRoutes.get('/users/ajax', function (req, res) {
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

    // Request options
    var options = {
        url: api + '/users',
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

    request.put(options, function (err, httpResponse, body) {
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

    // Request options
    var options = {
        url: api + '/users/' + req.params.id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    };

    request.delete(options, function (err, httpResponse, body) {
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
dashboardRoutes.get('/admins/ajax', function (req, res) {
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

    // Request options
    var options = {
        url: api + '/admin',
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
dashboardRoutes.put('/admins/ajax', function (req, res) {
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

    request.put(options, function (err, httpResponse, body) {
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
dashboardRoutes.post('/admins/ajax', function (req, res) {
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

    var status = req.body.status;
    var password = req.body.password;
    var email = req.body.email;

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '') +
        (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    var token = process.env.API_AUTH;

    // Request options
    var options = {
        url: api + '/admin/',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        json: {
            'password': password,
            'status': status,
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

        return res.send(httpResponse);
    });
});

/* DELETE user. */
dashboardRoutes.delete('/admins/ajax/:id', function (req, res) {
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

    // Request options
    var options = {
        url: api + '/admin/' + req.params.id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    };

    request.delete(options, function (err, httpResponse, body) {
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

/* POST Admin Login page. */
dashboardRoutes.post('/dashboard/login/ajax', function (req, res) {
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
        url: api + '/admin/login',
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
            req.session.userFull = objBody.data;
            req.session.userType = 'adminblitz';
            req.session.compose = tokenCompose;
        }

        return res.send(httpResponse);
    });
});

/* GET admins entities count. */
dashboardRoutes.get('/dashboard/entities/ajax', function (req, res) {
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

    // Request options
    var options = {
        url: api + '/admin/entities/count',
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

        return res.send(body);
    });
});

/* GET users list. */
dashboardRoutes.get('/murmurs/ajax', function (req, res) {
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

    // Request options
    var options = {
        url: api + '/murmurs',
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
dashboardRoutes.put('/murmurs/ajax', function(req, res) {
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

    // Request options
    var options = {
        url: api + '/murmurs/' + req.body.id,
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

    request.put(options, function (err, httpResponse, body) {
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
dashboardRoutes.post('/murmurs/ajax', function(req, res) {
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

    // Request options
    var options = {
        url: api + '/murmurs/',
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

/* DELETE user. */
dashboardRoutes.delete('/murmurs/ajax/:id', function(req, res) {
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

    // Request options
    var options = {
        url: api + '/murmurs/' + req.params.id,
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    };

    request.delete(options, function (err, httpResponse, body) {
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