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
        postUser();
        e.preventDefault(e);
    });

    function postUser() {
        //Validate Email and password fields
        var $email = $('#email');
        var $password = $('#password');

        if ($email.val() === '' || $password.val() === '') {
            return swal("Oops...", "Por favor completar los campos requeridos*", "error");
        }

        // Accept terms and execute ajax method
        swal({
            title: 'Bienvenido',
            text: 'Al presionar el boton "Continuar" esta de acuerdo con las <a href=\"/terms\">politicas</a> del proyecto Blitz.',
            html: true,
            type: 'warning',
            showLoaderOnConfirm: true,
            confirmButtonColor: '#F8BB86',
            confirmButtonText: 'Continuar',
            closeOnConfirm: false,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            closeOnCancel: true
        }, function () {
            $.ajax({
                method: "POST",
                url: '/dashboard/login/ajax',
                data:{
                    "email" : $email.val(),
                    "password" : $password.val()
                }
            }).done(function (data) {
                console.log(data);
                var message = '';
                // validate if duplicate error is throw out
                if(data.statusCode !== 'undefined' && data.statusCode === 200){
                    window.location.href = "/dashboard";
                }else{
                    message = 'Error en la autenticación del usuario.';
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
        });
    }

})(jQuery);
