describe('Services tests', function() {
	beforeEach(module('one.services'));

	describe('ShutdownOptions unit tests', function() {
		var service;

		beforeEach(inject(function(ShutdownOptions) {
			service = ShutdownOptions;
		}));

		it('should return an array of items', function() {
			expect(service.all()).toBeDefined();
		});

		it('should return 4 options', function() {
			expect(service.all().length).toEqual(4);
		});

		it('options must be correct syntax', function() {
			var options = [
		    {id: 0, name: 'Shutdown', msg: 'shutdown', time: true},
		    {id: 1, name: 'Restart', msg: 'restart', time: true},
		    {id: 2, name: 'Hibernate', msg: 'hibernate', time: false},
		    {id: 3, name: 'Log off', msg: 'log_off', time: false}
		  ];
		  expect(service.all()).toEqual(options);
		})
	});

	describe('DevicesList unit tests', function() {
		var services;

		beforeEach(inject(function(DevicesList) {
			service = DevicesList;
		}));
	});

	describe('AuthService unit tests', function() {
		var services;

		beforeEach(inject(function(AuthService) {
			service = AuthService;
		}));
	});

	describe('UserService unit tests', function() {
		var services;

		beforeEach(inject(function(UserService) {
			service = UserService;
		}));
	});

	describe('Popup unit tests', function() {
		var services;

		beforeEach(inject(function(Popup) {
			service = Popup;
		}));
	});

	describe('RememberMe unit tests', function() {
		var services;

		beforeEach(inject(function(RememberMe) {
			service = RememberMe;
		}));
	});
});