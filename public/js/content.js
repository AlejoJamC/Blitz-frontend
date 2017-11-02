/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Sweetalerts and ajax data
 */
(function ($) {
    'use strict';

    $.ajax({
        method: "GET",
        url: "content/ajax"
    }).done(function (data) {
        console.log(data);

        var $contentlist = $('#contentlist');

        // Clear html inside 'contentlist' objetc
        //$contentlist.empty();

        // Add the content to 'contentlist' object
        var html = '';

        if (data.body !== 'undefined' && data.length > 0) {
            console.log(data.length);
            // html content
            html = '<li class="grid-sizer"></li>';

            console.log(data.length);
            $.grep(data, function (murmur, index) {
                console.log(murmur);
                html += '<li class="b-isotope-grid__item grid-item design">' +
                    '<a class="b-isotope-grid__inner" href="/content/murmur/' + murmur._id + '">' +
                    '<img src="'+ '../' + murmur.image  + '" alt="foto" />' +
                '<span class="b-isotope-grid__wrap-info">' +
                '<span class="b-isotope-grid__info">' +
                '<span class="b-isotope-grid__title">' + murmur.title + '</span>' +
                '<span class="b-isotope-grid__categorie">' + murmur.type + '</span>' +
                '</span></span></a></li>'
            });

            $('#murmurlist').append(html);

        } else {
            // add blank space
            $contentlist.css({"margin-top": "100px"});

        }

        $contentlist.append(html);

    });

})(jQuery);