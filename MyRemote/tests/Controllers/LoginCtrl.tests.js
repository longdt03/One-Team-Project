describe('LoginCtrl', function() {
	beforeEach(module('ui.router'));
	beforeEach(module('firebase'));
	beforeEach(module('ionic'));
	beforeEach(module('one.services'));
	beforeEach(module('one.controllers.login'));
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