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

        } else {
            // add blank space
            $contentlist.css({"margin-top":"100px"});
            // html content
            html = '<div class="ish-row">' +
                '<span class="ish-col-xs-4 ish-col-sm-1 ish-sc-element ish-sc-icon ish-icon-large ish-txt-color1">' +
                '<a href="javascript:;"><i class="ish-icon-hourglass"></i></a>' +
                '</span><p>&nbsp;&nbsp;&nbsp;La lista de los soplos cardiacos no esta disponible.</p>' +
                '</div>'
        }

        $contentlist.append(html);

    });

})(jQuery);