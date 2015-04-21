describe('ShutdownCtrl Tests',function(){
	beforeEach(module(
    'one.services', 
    'one.controllers.shutdown', 
    'ui.router', 
    'ionic', 
    'firebase'));

	var $scope, $rootScope, $controllers;

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
		$scope = $rootScope.$new();

		$controller('ShutdownCtrl', {
			'$scope': $scope,
		});
	}));

	it('tasks must have all options',function(){
		var options = [
		    {id: 0, name: 'Shutdown', msg: 'shutdown', time: true},
		    {id: 1, name: 'Restart', msg: 'restart', time: true},
		    {id: 2, name: 'Hibernate', msg: 'hibernate', time: false},
		    {id: 3, name: 'Log off', msg: 'log_off', time: false}
		  ];
		 expect($scope.tasks).toEqual(options);
	});

	it('first data should be Shutdown',function(){
		var option = {id: 0, name: 'Shutdown', msg: 'shutdown', time: true};
		expect($scope.data.selectedTask).toEqual(option);
	});

	it('first data should not be Restart',function(){
		var option = {id: 1, name: 'Restart', msg: 'restart', time: true};
		expect($scope.data.selectedTask).not.toEqual(option);
	});

	it('first Timer should not be 50',function(){
		expect($scope.data.timer.minute).not.toEqual(50);
	});

	it('first Timer should be 0',function(){
		expect($scope.data.timer.minute).toEqual(0);
	});
});