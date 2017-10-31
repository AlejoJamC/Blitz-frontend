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
        var $firstname = $('#firstname');
        var $lastname = $('#lastname');
        var $email = $('#email');
        var $password = $('#password');
        var $cpassword = $('#cpassword');

        if ($email.val() === '' || $password.val() === '' || $cpassword.val() === '') {
            return swal("Oops...", "Por favor completar los campos requeridos*", "error");
        }

        if ($password.val() !== $cpassword.val()) {
            return swal("Oops...", "Las contraseñas no coinciden", "error");
        }

        // Accept terms and execute ajax method
        swal({
            title: 'Continuar con el registro?',
            text: 'Al presionar el boton "Aceptar y crear" esta de acuerdo con las <a href=\"/terms\">politicas</a> del proyecto Blitz.',
            html: true,
            type: 'warning',
            showLoaderOnConfirm: true,
            confirmButtonColor: '#F8BB86',
            confirmButtonText: 'Aceptar y crear',
            closeOnConfirm: false,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            closeOnCancel: true
        }, function () {
            $.ajax({
                method: "POST",
                url: '/signup/ajax',
                data: {
                    "firstName": $firstname.val(),
                    "lastName": $lastname.val(),
                    "email": $email.val(),
                    "password": $password.val()
                }
            }).done(function (data) {
                var message = '';
                // validate if duplicate error is throw out
                if (data.statusCode !== 'undefined' && data.statusCode === 200) {
                    if (data.body.data !== 'undefined') {
                        if (data.body.data.code !== 'undefined' && data.body.data.code === 11000) {
                            message = 'Error creando el usuario, el correo electronico ya existe';
                            swal({
                                title: message,
                                message: '',
                                type: "error",
                                confirmButtonText: "Reintentar",
                                confirmButtonClass: "btn-error"
                            });
                        } else if (data.body.data.email === $email.val()) {
                            message = 'Usuario creado exitosamente.';
                            swal({
                                    title: message,
                                    message: '',
                                    type: "success",
                                    confirmButtonText: "Iniciar sesión",
                                    confirmButtonClass: "btn-warning",
                                    showCancelButton: true,
                                    cancelButtonClass: "btn-success",
                                    cancelButtonText: "Salir",
                                    closeOnConfirm: true
                                },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        window.location.href = "/login";
                                    } else {
                                        window.location.href = "/signup";
                                    }
                                });
                        } else {
                            message = 'Error creando el usuario.';
                            swal({
                                title: message,
                                message: '',
                                type: "error",
                                confirmButtonText: "Reintentar",
                                confirmButtonClass: "btn-error"
                            });
                        }
                    } else {
                        message = 'Usuario creado exitosamente.';
                        swal({
                                title: message,
                                message: '',
                                type: "success",
                                confirmButtonText: "Iniciar sesión",
                                confirmButtonClass: "btn-warning",
                                showCancelButton: true,
                                cancelButtonClass: "btn-success",
                                cancelButtonText: "Salir",
                                closeOnConfirm: true
                            },
                            function (isConfirm) {
                                if (isConfirm) {
                                    window.location.href = "/login";
                                } else {
                                    window.location.href = "/signup";
                                }
                            });
                    }
                } else {
                    message = 'Error creando el usuario.';
                    swal({
                        title: message,
                        message: '',
                        type: "error",
                        confirmButtonText: "Reintentar",
                        confirmButtonClass: "btn-error"
                    });
                }
            });
        });
    }

})(jQuery);
