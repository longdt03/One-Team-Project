describe('SignupCtrl Tests',function(){
	beforeEach(module(
    'one.services', 
    'one.controllers.signup', 
    'ui.router', 
    'ionic', 
    'firebase'));

	var $rootScope, $scope, $controller;

	beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $scope = $rootScope.$new();
        
    $controller('SignupCtrl', {
      '$scope': $scope
    });
  }));

	it('createAccount should return errors 1 - please fill all fields ',function(){
		var user = {email: '', pass:'', retype:''};
    $scope.createAccount(user);
    expect($scope.result).toEqual('Signup failed! - Please fill all fields.');
	});

	it('createAccount should return errors 0 - Signup Successful',function(){
		var user = {email: 'Kien@gmail.com', pass:'Nekillar', retype:'Nekillar'};
    $scope.createAccount(user);
    expect($scope.result).toEqual('Signup successful! - Welcome to OneRemote.');
	});

	it('createAccount should return errors 3 - Signup Failed,Retype Password doesnot match ',function(){
		var user = {email: 'Kien@gmail.com',pass:'Nekillar', retype: 'LongDT'};
    $scope.createAccount(user);
    expect($scope.result).toEqual('Signup failed - Retype password does not match.');
	});
});