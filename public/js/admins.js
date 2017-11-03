var app = angular.module("blitz", ["oitozero.ngSweetAlert", "ngMessages"]);
app.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});
app.controller("ctrlAdmins", ["$scope", "$http", "SweetAlert", function($s, $http, $SweetAlert) {
    $s.admins = [];
    $s.update = false;
    $s.add = false;
    $s.slAdmin = {};
    $s.shHead = false;
    $s.getAdmins = function() {
        $http({
            method: "GET",
            url: '/admins/ajax'
        }).then(function success(res) {
            var data = res.data;
            if (data.statusCode === 200) {
                $s.admins = JSON.parse(data.body)
            }
        }, function error(res) {
            $s.admins = [];
            var data = res.data;
            var body = JSON.parse(data.body);
            $SweetAlert.swal('Error ' + data.statusCode, body.message, "error");
        });
    };
    $s.getAdmins();
    $s.showAdmin = function(admin) {
        $s.update = false;
        $s.add = false;
        $s.shHead = true;
        $s.slAdmin = angular.copy(admin);
        $s.frmAdmin = { confPass: "" };
    };
    $s.updateAdmin = function() {
        $s.update = true;
        $s.frmAdmin = angular.copy($s.slAdmin);
    };
    $s.newAdmin = function() {
        $s.update = false;
        $s.add = true;
        $s.shHead = false;
        $s.frmAdmin = { confPass: "" };
    };
    $s.saveOrUpdateAdmin = function() {
        var params = {
            firstName: $s.frmAdmin.firstName,
            lastName: $s.frmAdmin.lastName,
            status: $s.frmAdmin.status
        };
        params.password = $s.frmAdmin.pass;
        if ($s.update) {
            params.id = $s.frmAdmin._id;
            $http({
                method: "PUT",
                url: '/admins/ajax',
                data: params
            }).then(function success(res) {
                var body = res.data.body.data;
                if (body.hasOwnProperty('errors')) {
                    $SweetAlert.swal(body.name, body.message, "error");
                } else {
                    $s.admins = [];
                    $SweetAlert.swal({ title: 'Administrador actualizado satisfactoriamente', text: body.message, type: 'success' }, function() {
                        $s.getAdmins();
                        $s.update = false;
                        $s.shHead = false;
                        $s.slAdmin = {};
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
            params.email = $s.frmAdmin.email;
            $http({
                method: "POST",
                url: '/admins/ajax',
                data: params
            }).then(function success(res) {
                var body = res.data.body.data;
                if (body.hasOwnProperty('errors')) {
                    $SweetAlert.swal(body.name, body.message, "error");
                } else {
                    $s.admins = [];
                    $SweetAlert.swal({ title: 'Administrador creado satisfactoriamente', text: body.message, type: 'success' }, function() {
                        $s.getAdmins();
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
    };
    $s.deleteAdmin = function() {
        var username = ($s.slAdmin.firstName) ? $s.slAdmin.firstName + ' ' + $s.slAdmin.lastName : $s.slAdmin.email
        $SweetAlert.swal({
            title: 'Eliminar Admnistrador',
            text: '¿Est&aacute; seguro que desea eliminar el administrador <b>' + username + '</b>?',
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
            var params = { id: $s.slAdmin._id };
            $http({
                method: "DELETE",
                url: '/admins/ajax/' + $s.slAdmin._id
            }).then(function success(res) {
                var body = JSON.parse(res.data.body);
                if (body.hasOwnProperty('errors')) {
                    $SweetAlert.swal(body.name, body.message, "error");
                } else {
                    $SweetAlert.swal({ title: 'Administrador eliminado satisfactoriamente', text: body.message, type: 'success' }, function() {
                        $s.admins = [];
                        $s.getAdmins();
                        $s.shHead = false;
                        $s.slAdmin = {};
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
        if (text !== null) {
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