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

    $("form").submit(function (e) {
        postReset();
        e.preventDefault(e);
    });

    function postReset() {
        //Validate Email and password fields
        var $email = $('#emailreset');
        var $code = $('#codereset');
        var $password = $('#passwordreset');


        if ($email.val() === '') {
            return swal("Oops...", "Por favor completar los campos requeridos*", "error");
        }

        // Accept terms and execute ajax method
        $.ajax({
            method: "POST",
            url: '/reset/ajax',
            data: {
                "email": $email.val(),
                "password": $password.val(),
                "code": $code.val()
            }
        }).done(function (data) {
            var message = '';
            // validate if duplicate error is throw out
            if (data.statusCode !== 'undefined' && data.statusCode === 200) {
                message = 'Nueva contraseña de habilitada.';
                swal({
                    title: message,
                    message: '',
                    type: "success",
                    confirmButtonText: "ok",
                    confirmButtonClass: "btn-success"
                }, function () {
                    window.location.href = "/login";
                });
            } else {
                message = 'Error reemplazando la contraseña.';
                swal({
                    title: message,
                    message: '',
                    type: "error",
                    confirmButtonText: "Reintentar",
                    confirmButtonClass: "btn-error"
                });
            }
        }).error(function (err) {
            swal(
                'Oops...',
                'Error al tratar de autenticar este usuario!',
                'error'
            );
        });
    }

})(jQuery);
