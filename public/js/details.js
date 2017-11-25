/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

(function(Peaks){
    var $peakbuffer =  $('#peakbuffer');
    var $peakjson = $('#peakjson');

    console.log($peakbuffer.val());
    console.log($peakjson.val());

    var options = {
        container: document.getElementById('first-waveform-visualiser-container'),
        mediaElement: document.querySelector('audio'),
        dataUri: {
            arraybuffer: $peakbuffer.val(),
            json: $peakjson.val()
        },
        keyboard: true,
        pointMarkerColor: '#006eb0',
        showPlayheadTime: true
    };
    var peaksInstance = Peaks.init(options);
    var renderSegments = function(peaks) {
        var segmentsContainer = document.getElementById('segments');
        var segments = peaks.segments.getSegments();
        var html = '';
        for (var i = 0; i < segments.length; i++) {
            var segment = segments[i];
            var row = '<tr>' +
                '<td>' + segment.id + '</td>' +
                '<td>' + segment.labelText + '</td>' +
                '<td>' + segment.startTime + '</td>' +
                '<td>' + segment.endTime + '</td>' +
                '<td>' + '<a href="#' + segment.id + '" data-action="play-segment" data-id="' + segment.id + '">Play</a>' + '</td>' +
                '<td>' + '<a href="#' + segment.id + '" data-action="remove-segment" data-id="' + segment.id + '">Remove</a>' + '</td>' +
                '</tr>';
            html += row;
        }
        segmentsContainer.querySelector('tbody').innerHTML = html;
        if (html.length) {
            segmentsContainer.classList = '';
        }
    };
    var renderPoints = function(peaks) {
        var pointsContainer = document.getElementById('points');
        var points = peaks.points.getPoints();
        var html = '';
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            var row = '<tr>' +
                '<td>' + point.id + '</td>' +
                '<td>' + point.labelText + '</td>' +
                '<td>' + point.time + '</td>' +
                '<td>' + '<a href="#' + point.id + '" data-action="remove-point" data-id="' + point.id + '">Remove</a>' + '</td>' +
                '</tr>';
            html += row;
        }
        pointsContainer.querySelector('tbody').innerHTML = html;
        if (html.length) {
            pointsContainer.classList = '';
        }
    };
    document.querySelector('[data-action="zoom-in"]').addEventListener('click', function() {
        peaksInstance.zoom.zoomIn();
    });
    document.querySelector('[data-action="zoom-out"]').addEventListener('click', function() {
        peaksInstance.zoom.zoomOut();
    });
    document.querySelector('button[data-action="add-segment"]').addEventListener('click', function() {
        peaksInstance.segments.add({
            startTime: peaksInstance.player.getCurrentTime(),
            endTime: peaksInstance.player.getCurrentTime() + 10,
            labelText: "Test segment",
            editable: true
        });
    });
    document.querySelector('button[data-action="add-point"]').addEventListener('click', function() {
        peaksInstance.points.add({
            time: peaksInstance.player.getCurrentTime(),
            labelText: "Test point",
            editable: true
        });
    });
    document.querySelector('button[data-action="log-data"]').addEventListener('click', function(event) {
        renderSegments(peaksInstance);
        renderPoints(peaksInstance);
    });
    document.querySelector('body').addEventListener('click', function(event) {
        var element = event.target;
        var action  = element.getAttribute('data-action');
        var id      = element.getAttribute('data-id');
        if (action === 'play-segment') {
            var segment = peaksInstance.segments.getSegment(id);
            peaksInstance.player.playSegment(segment);
        }
        else if (action === 'remove-point') {
            peaksInstance.points.removeById(id);
        }
        else if (action === 'remove-segment') {
            peaksInstance.segments.removeById(id);
        }
    });
})(peaks);