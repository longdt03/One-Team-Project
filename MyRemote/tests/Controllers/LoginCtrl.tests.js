describe('LoginCtrl', function() {
	beforeEach(module(
    'one.services', 
    'one.controllers.login', 
    'ui.router', 
    'ionic', 
    'firebase'));
  
	var $scope, $rootScope, $controllers;

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$controller('LoginCtrl', {
			'$scope': $scope,
		});
	}));

	it('should not have rememberMe Check to be false', function() {
		expect($scope.rememberMe.isChecked).toEqual(false);
	});
});