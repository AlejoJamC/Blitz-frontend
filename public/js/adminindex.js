/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Sweetalerts
 */
(function ($) {
    'use strict';

    $( document ).ready(function() {
        getCount();
    });

    function getCount() {
        $.ajax({
            method: "GET",
            url: '/dashboard/entities/ajax'
        }).done(function (data) {
            var response = JSON.parse(data);
            $('#adminCount').text(response.admins);
            $('#userCount').text(response.users);
            $('#connCount').text(response.connections);
            $('#murmurCount').text(response.murmurs);
            $('#unmurmurCount').text(response.unmurmurs);
            $('#clientCount').text(response.clients);
        });
    }

})(jQuery);
