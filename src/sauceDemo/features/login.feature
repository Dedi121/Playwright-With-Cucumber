@Login @Smoke @Regression @all
Feature: User Authentication

  Background: 
    Given User navigates to the application
    When User "VisualUser" enters his credentials
    Then "VisualUser" clicks the login button

  Scenario: Verify that user has loggin in successfully
    And "VisualUser" has logged in successfully
