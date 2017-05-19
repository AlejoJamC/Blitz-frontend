/**
 * Copyright (c) 2017-present, Alejandro Mantilla <@AlejoJamC>.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree or translated in the assets folder.
 */

/**
 * Sweetalerts demo page
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
        var $api = $('#api');

        if ($email.val() === '' || $password.val() === '' || $cpassword.val() === '') {
            return swal("Oops...", "Por favor completar los campos requeridos*", "error");
        }

        if($password.val() !== $cpassword.val()){
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
                url: $api.val() + '/users',
                data:{
                    "firstName" : $firstname.val(),
                    "lastName" : $lastname.val(),
                    "email" : $email.val(),
                    "password" : $password.val()
                }
            }).done(function (data) {
                // TODO: capturar errores de respuesta
                // TODO: verificar como cargar el Bearer Token sin exponerlo
                // TODO: posiblemente usar Base64
                console.log(data);
                swal({
                        title: data.message,
                        message: "",
                        type: "success",
                        confirmButtonText: "Salir",
                        confirmButtonClass: "btn-warning",
                        showCancelButton: true,
                        cancelButtonClass: "btn-success",
                        cancelButtonText: "Iniciar sesión",
                        closeOnConfirm: true
                    },
                    function (isConfirm) {
                        if (isConfirm) {
                            window.location.href = "/login";
                        }
                    });
            });
        });
    }

})(jQuery);
