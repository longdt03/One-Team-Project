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
    var ref = new Firebase('https://one-test.firebaseio.com');
    ref.set({
      KienPC: {
        status: "online|123456"
      },
      LongPC: {
        status: "offline|233333"
      },
      LinhPC: {
        status: "online|230795"
      }
    });
		beforeEach(inject(function(DevicesList) {
			service = DevicesList;
		}));

    it('getDevices should return an array of online devices', function() {
      var KienPC = {name: "KienPC", online: true},
          LongPC = {name: "LongPC", online: false},
          LinhPC = {name: "LinhPC", online: true};

      expect(service.getDevices(ref)).toContain(KienPC, LongPC, LinhPC);
    })
	});

	describe('AuthService unit tests', function() {
		var services;

    // fake firebase user data
    var mockAuthData = {
      provider: 'password',
      password: {
        email: 'myEmail@one.com',
        isTemporaryPassword: false
      },
      auth: {
        provider: 'password',
        uid: 'simplelogin:1'
      },
      uid: 'simplelogin:1'
    };

		beforeEach(inject(function(AuthService) {
			service = AuthService;
		}));

    it('getId should return a string', function() {
      expect(service.getId(mockAuthData)).toEqual(jasmine.any(String));
    });

    it('getId should return correct uid', function() {
      expect(service.getId(mockAuthData)).toEqual('1');
    });

    it('getId should not return wrong uid', function() {
      expect(service.getId(mockAuthData)).not.toEqual('2');
    });
	});

	describe('UserService unit tests', function() {
		var services;

		beforeEach(inject(function(UserService) {
			service = UserService;
		}));

    describe('Test UserService when auth with password', function() {
      // fake firebase user data
      var mockAuthWithPassword = {
        provider: 'password',
        password: {
          email: 'myEmail@one.com',
          isTemporaryPassword: false
        },
        auth: {
          provider: 'password',
          uid: 'simplelogin:1'
        },
        uid: 'simplelogin:1'
      };

      it('getName should return a correct username', function() {
        expect(service.getName(mockAuthWithPassword)).toEqual('myEmail');
      });

      it('getName should not return a wrong username', function() {
        expect(service.getName(mockAuthWithPassword)).not.toEqual('someEmail');
      });
    });
    
    describe('Test UserService when auth with google', function() {
      // fake firebase user data
      var mockAuthWithGoogle = {
        provider: 'google',
        google: {
          displayName: "Kien Vu",
          id: "123456789"
        },
        auth: {
          provider: 'google',
          uid: 'google:123456789'
        },
        uid: 'google:123456789'
      };

      it('getName should return a correct username', function() {
        expect(service.getName(mockAuthWithGoogle)).toEqual('Kien Vu');
      });

      it('getName should not return a wrong username', function() {
        expect(service.getName(mockAuthWithGoogle)).not.toEqual('Someone else');
      });
    });  
	});

	describe('Popup unit tests', function() {
		var services;

		beforeEach(inject(function(Popup) {
			service = Popup;
		}));
	});

	describe('RememberMe unit tests', function() {
		var services, $window;

		beforeEach(inject(function(RememberMe, _$window_) {
      $window = _$window_;
			service = RememberMe;
		}));

    it('setUser should store correct user\'s authData', function() {
      var user = {email: 'Kien Vu', pass: 'neikillah'};
      service.setUser(user);
      expect($window.localStorage['email']).toEqual(user.email);
      expect($window.localStorage['pass']).toEqual(user.pass);
    });

    it('getUser should get corret user\'s authData', function() {
      $window.localStorage['email'] = 'Peanut';
      $window.localStorage['pass'] = 'winterrain';
      var user = {email: 'Peanut', pass: 'winterrain'};
      expect(service.getUser()).toEqual(user);
    });

    it('isChecked should return correct value', function() {
      expect(service.isChecked()).toBe(false);
      $window.localStorage['isChecked'] = true;
      expect(service.isChecked()).toBe(true);
      $window.localStorage['isChecked'] = false;
      expect(service.isChecked()).toBe(false);
    });

    it('checked should set isChecked value to be new value', function() {
      service.checked(true);
      expect($window.localStorage['isChecked']).toEqual('true');
      service.checked(false);
      expect($window.localStorage['isChecked']).toEqual('false');
    });
	});
});