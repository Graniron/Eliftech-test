(function(){
    angular.module('myApp')
    .controller('companyProfileCtrl', ['$scope', '$routeParams', "$firebaseArray", "$location",
	                                   function($scope, $routeParams, $firebaseArray, $location) {
		// connect to firebase 								 
        var ref = new Firebase("https://burning-inferno-267.firebaseio.com/");  		
		$scope.companies = $firebaseArray(ref);	
		
		$scope.companyName = $routeParams.companyName;    
		$scope.hideEditForm = true;		
		
		function findCompany() {
			for(var i = 0; i < $scope.companies.length; i++) {
				if($scope.companyId == $scope.companies[i].$id) {					
					return i;
				}
			}			
		}		
	     // Delete company
	    $scope.deleteCompany = function() {									
			$scope.companies.$remove($scope.companies[findCompany()]).then(function(ref) {			  
			  $location.path('/');
			});
		};		
		
		// Edit company
		$scope.editCompany = function(newName, newIncome, newEmployees) {
						
			for(var i = 0; i < $scope.companies.length; i++) {
				if($scope.companyName == $scope.companies[i].name) {
					var item = $scope.companies[i];
					break;
				}
			}		
			// Change specific property
			$scope.companies[i].name = newName || $scope.companies[i].name;
			$scope.companies[i].income = newIncome || $scope.companies[i].income;
			$scope.companies[i].employees = newEmployees || $scope.companies[i].employees;			
			
			$scope.companies.$save(i).then(function(ref) {				
				$location.path('/');
			});
		};       
    }])
})();