Feature: Adding products to cart

  Background: 
    Given User navigates to the application
    When User "StandardUser" enters his credentials
    Then "StandardUser" clicks the login button

  Scenario: Adding products into cart
    Given "StandardUser" is on Inventory page
    When "StandardUser" adds "products" to cart
      | Sauce Labs Backpack      |
      | Sauce Labs Bolt T-Shirt  |
      | Sauce Labs Onesie        |
      | Sauce Labs Bike Light    |
      | Sauce Labs Fleece Jacket |
    And "StandardUser" clicks on the cart icon
    Then "StandardUser" checks the prices of the products
    And "StandardUser" goes to the next page
