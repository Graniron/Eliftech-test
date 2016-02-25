(function() {
    var app = angular.module("myApp", ['ngRoute', "firebase"]);
    
    app.config(function($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl: 'app/views/main.html',
            controller: 'companiesTreeCtrl'
        })
        .when('/:companyName', {
            templateUrl: 'app/views/companyProfile.html',
            controller: 'companyProfileCtrl'
        })
    })
}());