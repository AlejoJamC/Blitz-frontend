var app = angular.module('blitz', ['oitozero.ngSweetAlert', 'ngMessages']);
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});
app.controller("ctrlMurmurs", ["$scope", "$http", "SweetAlert", function ($s, $http, $SweetAlert) {
    $s.murmurs = [];
    $s.update = false;
    $s.add = false;
    $s.slMurmur = {};
    $s.shHead = false;
    $s.getMurmurs = function () {
        $http({
            method: "GET",
            url: '/murmurs/ajax'
        }).then(function success(res) {
            var data = res.data;
            if (data.statusCode === 200) {
                $s.murmurs = JSON.parse(data.body)
            }
        }, function error(res) {
            $s.murmurs = [];
            var data = res.data;
            var body = JSON.parse(data.body);
            $SweetAlert.swal('Error ' + data.statusCode, body.message, "error");
        });
    };
    $s.getMurmurs();
    $s.showMurmur = function (murmur) {
        $s.update = false;
        $s.add = false;
        $s.shHead = true;
        $s.slMurmur = angular.copy(murmur);
        $s.frmMurmur = {confPass: ""};
    };
    $s.updateMurmur = function () {
        $s.update = true;
        $s.frmMurmur = angular.copy($s.slMurmur);
    };
    $s.newMurmur = function () {
        $s.update = false;
        $s.add = true;
        $s.shHead = false;
        $s.frmMurmur = {confPass: ""};
    };
    $s.saveOrUpdateMurmur = function () {
        var params = {
            firstName: $s.frmMurmur.firstName,
            lastName: $s.frmMurmur.lastName,
            status: $s.frmMurmur.status
        };
        params.password = $s.frmMurmur.pass;
        if ($s.update) {
            params.id = $s.frmMurmur._id;
            $http({
                method: "PUT",
                url: '/murmurs/ajax',
                data: params
            }).then(function success(res) {
                var body = res.data.body.data;
                if (body.hasOwnProperty('errors')) {
                    $SweetAlert.swal(body.name, body.message, "error");
                } else {
                    $s.murmurs = [];
                    $SweetAlert.swal({
                        title: 'Soplo actualizado satisfactoriamente',
                        text: body.message,
                        type: 'success'
                    }, function () {
                        $s.getMurmurs();
                        $s.update = false;
                        $s.shHead = false;
                        $s.slMurmur = {};
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
            params.email = $s.frmMurmur.email;
            $http({
                method: "POST",
                url: '/murmurs/ajax',
                data: params
            }).then(function success(res) {
                var body = res.data.body.data;
                if (body.hasOwnProperty('errors')) {
                    $SweetAlert.swal(body.name, body.message, "error");
                } else {
                    $s.murmurs = [];
                    $SweetAlert.swal({
                        title: 'Soplo creado satisfactoriamente',
                        text: body.message,
                        type: 'success'
                    }, function () {
                        $s.getMurmurs();
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
    $s.deleteMurmur = function () {
        var murmurname = ($s.slMurmur.firstName) ? $s.slMurmur.firstName + ' ' + $s.slMurmur.lastName : $s.slMurmur.email
        $SweetAlert.swal({
            title: 'Eliminar Soplo',
            text: '¿Est&aacute; seguro que desea eliminar el soplo <b>' + murmurname + '</b>?',
            html: true,
            type: 'warning',
            showLoaderOnConfirm: true,
            confirmButtonColor: '#F8BB86',
            confirmButtonText: 'Si',
            closeOnConfirm: false,
            showCancelButton: true,
            cancelButtonText: "No",
            closeOnCancel: true
        }, function (isConfirm) {
            if (isConfirm) {
                var params = {id: $s.slMurmur._id};
                $http({
                    method: "DELETE",
                    url: '/murmurs/ajax/' + $s.slMurmur._id
                }).then(function success(res) {
                    var body = JSON.parse(res.data.body);
                    if (body.hasOwnProperty('errors')) {
                        $SweetAlert.swal(body.name, body.message, "error");
                    } else {
                        $SweetAlert.swal({
                            title: 'Soplo eliminado satisfactoriamente',
                            text: body.message,
                            type: 'success'
                        }, function () {
                            $s.murmurs = [];
                            $s.getMurmurs();
                            $s.shHead = false;
                            $s.slMurmur = {};
                        }, "success");
                    }
                }, function error(res) {
                    $s.shHead = false;
                    var data = res.data;
                    var body = JSON.parse(data.body);
                    $SweetAlert.swal('Error ' + data.statusCode, body.message, "error");
                });
            }
        });
    }
}]);
app.filter('firstLetter', function () {
    return function (text) {
        if (text != null) {
            return text.substring(0, 1);
        }
    }
});
var compareTo = function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
};

app.directive("compareTo", compareTo);