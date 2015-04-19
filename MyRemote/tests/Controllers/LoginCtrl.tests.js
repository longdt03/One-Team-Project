describe('LoginCtrl', function() {
	var scope;
	beforeEach(module('one.controllers.login'));

	beforeEach(inject(function($rootScope, $controller) {
		scope = $rootScope.$new();
		$controller('LoginCtrl', {$scope: scope});
	}));

	it('should not have rememberMe Check to be false', function(LoginCtrl) {
		expect(scope.rememberMe.isChecked).toEqual(false);
	});
});