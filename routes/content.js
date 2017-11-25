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
    if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }

    res.render('content/list', {
        title: 'List de soplos simulados | Blitz',
        level: '../',
        listActive: true,
        layout: 'content',
        error: error
    });
});

/* GET Content by ajax page. */
contentRouter.get('/content/ajax', function (req, res) {
    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session
    if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '')
        + (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    // Request options
    var options = {
        url: api + '/murmurs',
        headers: {
            'Authorization': 'Basic ' + req.session.compose,
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

        // Success
        // valitade data type
        var objBody = body;
        if(typeof body === 'string' || body === '[]'){
            objBody = JSON.parse(body);
            if(objBody.length === 0){
                objBody.rows = 0;
            }
        }

        return res.send(objBody);
    });
});

/* GET Content/:id page. */
contentRouter.get('/content/murmur/:id', function (req, res, next) {
    var murmurId = req.params.id;

    if (murmurId === 'ajax') {
        next();
        return;
    }

    // Basic error validator
    var error = '';
    // Error
    if (typeof req.query.error !== 'undefined') {
        error = req.query.error;
    }
    // Session
    if (typeof req.session.userId === 'undefined' || typeof req.session.userId === '') {
        return res.redirect('/login');
    }

    var api = process.env.API_URL + (process.env.API_PORT !== '' ? ':' + process.env.API_PORT : '')
        + (process.env.API_VERSION !== '' ? '/' + process.env.API_VERSION : '');

    // Request options
    var options = {
        url: api + '/murmurs/' + murmurId,
        headers: {
            'Authorization': 'Basic ' + req.session.compose,
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

        // Success
        // valitade data type
        var objBody = body;
        if(typeof body === 'string' || body === '[]'){
            objBody = JSON.parse(body);
            if(objBody.length === 0){
                objBody.rows = 0;
            }
        }

        var bodyjson = JSON.parse(body);

        res.render('content/detail', {
            title: 'Detalle del soplo',
            level: '../../',
            layout: 'content',
            murmur: bodyjson,
            error: error
        });
    });
});

module.exports = contentRouter;