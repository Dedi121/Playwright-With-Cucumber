@Regression @test @all
Feature: User Authentication and Log out

  Background: 
    Given User navigates to the application
    When User "PerformanceGlitchUser" enters his credentials
    Then "PerformanceGlitchUser" clicks the login button

  Scenario: Verify that user has logged out successfully
    Then "PerformanceGlitchUser" has logged out successfully
