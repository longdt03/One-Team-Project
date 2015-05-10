describe('LoginCtrl', function() {
	beforeEach(module(
    'one.services', 
    'one.controllers.login', 
    'ui.router', 
    'ionic', 
    'firebase'));
  
	var $scope, $rootScope, $controllers,_RememberMe;

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
        RememberMe = $injector.get('RememberMe');
		$scope = $rootScope.$new();

		$controller('LoginCtrl', {
			'$scope': $scope,
		});
	}));

	it('should not have rememberMe Check to be false', function() {
		expect($scope.rememberMe.isChecked).toEqual(false);
	});

    beforeEach(inject(function(RememberMe){
        _RememberMe = RememberMe;
    }));

	it('should not return email if RememberMe.isChecked() = false',function(){
        $scope.rememberMe.isChecked = false;
        expect($scope.user.email).toBe('');
    });

    it('should not return password if RemmeberMe.isChecked() = false',function(){
        $scope.rememberMe.isChecked = false;
        expect($scope.user.pass).toBe('');
    });

    it('should return email if RememberMe.isChecked() = true',function(){
        var user = {email: 'Kien Vu', pass: 'neikillah'};
        $scope.rememberMe.isChecked = true;
        if($scope.rememberMe.isChecked){
            _RememberMe.setUser(user);
            $scope.user = _RememberMe.getUser();
            console.log (true);
        }
        expect($scope.user).toEqual(user);
    });

    // it ('the message would be successed with the true account and password', function() {
    //     $scope.user = {email: 'Kien Vu', pass: 'neikillah'};
    //     $scope.signInWithPassword($scope.user);
    //     expect($scope.message).toBe ('Login success');
    // });

    // it ('the message would not be successed with the fail password', function() {
    //     $scope.user = {email: 'Kien Vu', pass: 'neikilla'};
    //     $scope.signInWithPassword($scope.user);
    //     expect($scope.message).toBe('Login failed');
    // });
});