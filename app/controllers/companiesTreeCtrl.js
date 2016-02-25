(function(){
    angular.module('myApp')
    .controller('companiesTreeCtrl', ['$scope', '$http', "$firebaseArray", function($scope, $http, $firebaseArray) {
		
		// connect to firebase 
		var ref = new Firebase("https://burning-inferno-267.firebaseio.com/");  	
		
		$scope.companies = $firebaseArray(ref);  
		
        $scope.hideAddForm = true;
        $scope.newCompany = {};	
        
		// Show total of childs companies
		$scope.showSum = function(totalArr, comp, eve) {
			var total = 0;
			for(i in totalArr) {
				total += totalArr[i].income;				
			}			
			total += '$';
			eve.target.innerHTML = total;			
		};
		
		// Add company
        $scope.addCompany = function() {
			// Create instance on new company
           $scope.newCompany = {
                name: $scope.newCompanyName,
                income: $scope.newCompanyIncome,
                employees: $scope.newCompanyEmployees,
				childs: 0,
				total: 0 
            };
			// Create instance on new income field
            $scope.companyIncome = {
				income: $scope.newCompanyIncome
			}			
			
			// Check if user want add child company
			if($scope.choosedParent) {
				// connect to firebase 
				var refSub = new Firebase("https://burning-inferno-267.firebaseio.com/" + $scope.choosedParent + "/childs");
				$scope.subCompany = $firebaseArray(refSub);
				$scope.subCompany.$add($scope.newCompany); // Add company to database
				
				// connect to firebase 
                var totalIncomeRef = new Firebase("https://burning-inferno-267.firebaseio.com/" + $scope.choosedParent + "/total");
                $scope.totCompany = $firebaseArray(totalIncomeRef);
				
				$scope.totCompany.$add($scope.companyIncome);	// Add income to parent 		
				
			} else {			
				$scope.companies.$add($scope.newCompany); // Add company to database
			}
			// Clean form
			$scope.newCompany = {};			
			$scope.newCompanyName = "";
			$scope.newCompanyIncome = "";
			$scope.newCompanyEmployees = "";			
        }		
    }]);
})();