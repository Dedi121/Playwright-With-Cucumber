@Login @Smoke
Feature: User Authentication

  Background: 
    Given User navigates to the application
    When User "StandardUser" enters his credentials
    Then "StandardUser" clicks the login button

  Scenario: Verify that user has loggin in successfully
    And "StandardUser" has logged in successfully
