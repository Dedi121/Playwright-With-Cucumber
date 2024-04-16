@Regression @test @all
Feature: User Authentication and Log out

  Background: 
    Given User navigates to the application
    When User "StandardUser" enters his credentials
    Then "StandardUser" clicks the login button

  Scenario: Verify that user has logged out successfully
    Then "StandardUser" has logged out successfully
