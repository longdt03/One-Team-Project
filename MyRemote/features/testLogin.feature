Feature: Testing Login using Cucumber
  As a programmer of One Project
  I want to test my Login function 
  to ensure that Login function is right

  @javascript
  Scenario: Login with right email and password
  	Given I am in login page
  		And I fill in email with "linh@one.com"
  		And I fill in password with "123456"
    When I logged into page
    Then I go on main-menu page

  @javascript
  Scenario: Login with wrong email and password
  	Given I am in login page
  		And I fill in "email" with "kien1@one.com"
  		And I fill in "password" with "123456"
  	When I logged into page
  	Then I should see "wrong password or email"

  @javascript
  Scenario: Login with empty email
  	Given I am in login page
  		And I fill in "password" with "123456"
  	When I logged into page
  	Then I should see "Password or email is invalid!" 
