var app = angular.module("blitz", ["oitozero.ngSweetAlert", "ngMessages"]);
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});
app.controller("ctrlUsers", ["$scope", "$http", "SweetAlert", function($s, $http, $SweetAlert) {
    $s.users = [];
    $s.update = false;
    $s.add = false;
    $s.slUser = {};
    $s.shHead = false;
    $s.getUsers = function() {
        $http({
            method: "GET",
            url: '/users/ajax'
        }).then(function success(res) {
            var data = res.data;
            if (data.statusCode == 200) {
                $s.users = JSON.parse(data.body)
            }
        }, function error(res) {
            $s.users = [];
            var data = res.data;
            var body = JSON.parse(data.body);
            $SweetAlert.swal('Error ' + data.statusCode, body.message, "error");
        });
    };
    $s.getUsers();
    $s.showUser = function(user) {
        $s.update = false;
        $s.add = false;
        $s.shHead = true;
        $s.slUser = angular.copy(user);
        $s.frmUser = { confPass: "" };
    }
    $s.updateUser = function() {
        $s.update = true;
        $s.frmUser = angular.copy($s.slUser);
    }
    $s.newUser = function() {
        $s.update = false;
        $s.add = true;
        $s.shHead = false;
        $s.frmUser = { confPass: "" };
    }
    $s.saveOrUpdateUser = function() {
        var params = {
            firstName: $s.frmUser.firstName,
            lastName: $s.frmUser.lastName,
            status: $s.frmUser.status
        };
        params.password = $s.frmUser.pass;
        if ($s.update) {
            params.id = $s.frmUser._id;
            $http({
                method: "PUT",
                url: '/users/ajax',
                data: params
            }).then(function success(res) {
                var body = res.data.body.data;
                if (body.hasOwnProperty('errors')) {
                    $SweetAlert.swal(body.name, body.message, "error");
                } else {
                    $s.users = [];
                    $SweetAlert.swal({ title: 'Usuario actualizado satisfactoriamente', text: body.message, type: 'success' }, function() {
                        $s.getUsers();
                        $s.update = false;
                        $s.shHead = false;
                        $s.slUser = {};
                    }, "success");
                }
            }, function error(res) {
                $s.update = false;
                $s.shHead = false;
                var data = res.data;
                var body = JSON.parse(data.body);
                $SweetAlert.swal('Error ' + data.statusCode, body.message, "error");
            });
        } else {
            params.email = $s.frmUser.email;
            $http({
                method: "POST",
                url: '/users/ajax',
                data: params
            }).then(function success(res) {
                var body = res.data.body.data;
                if (body.hasOwnProperty('errors')) {
                    $SweetAlert.swal(body.name, body.message, "error");
                } else {
                    $s.users = [];
                    $SweetAlert.swal({ title: 'Usuario creado satisfactoriamente', text: body.message, type: 'success' }, function() {
                        $s.getUsers();
                        $s.add = false;
                        $s.shHead = false;
                    }, "success");
                }
            }, function error(res) {
                $s.update = false;
                $s.shHead = false;
                var data = res.data;
                var body = JSON.parse(data.body);
                $SweetAlert.swal('Error ' + data.statusCode, body.message, "error");
            });
        }
    }
    $s.deleteUser = function() {
        var username = ($s.slUser.firstName) ? $s.slUser.firstName + ' ' + $s.slUser.lastName : $s.slUser.email
        $SweetAlert.swal({
            title: 'Eliminar Usuario',
            text: '¿Est&aacute; seguro que desea eliminar el usuario <b>' + username + '</b>?',
            html: true,
            type: 'warning',
            showLoaderOnConfirm: true,
            confirmButtonColor: '#F8BB86',
            confirmButtonText: 'Si',
            closeOnConfirm: false,
            showCancelButton: true,
            cancelButtonText: "No",
            closeOnCancel: true
        }, function() {
            var params = { id: $s.slUser._id };
            $http({
                method: "DELETE",
                url: '/users/ajax/' + $s.slUser._id
            }).then(function success(res) {
                var body = JSON.parse(res.data.body);
                if (body.hasOwnProperty('errors')) {
                    $SweetAlert.swal(body.name, body.message, "error");
                } else {
                    $SweetAlert.swal({ title: 'Usuario eliminado satisfactoriamente', text: body.message, type: 'success' }, function() {
                        $s.users = [];
                        $s.getUsers();
                        $s.shHead = false;
                        $s.slUser = {};
                    }, "success");
                }
            }, function error(res) {
                $s.shHead = false;
                var data = res.data;
                var body = JSON.parse(data.body);
                $SweetAlert.swal('Error ' + data.statusCode, body.message, "error");
            });
        });
    }
}]);
app.filter('firstLetter', function() {
    return function(text) {
        if (text != null) {
            return text.substring(0, 1);
        }
    }
});
var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};

app.directive("compareTo", compareTo);