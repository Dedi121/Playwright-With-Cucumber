Feature: Adding products to cart

  Background: 
    Given User navigates to the application
    When User "StandardUser" enters his credentials
    Then "StandardUser" clicks the login button

  Scenario: Adding products into cart
    Given "StandardUser" is on Inventory page
    When "StandardUser" adds "products" with "prices" to cart
      | Sauce Labs Backpack      | $29.99 |
      | Sauce Labs Bolt T-Shirt  | $9.99  |
      | Sauce Labs Onesie        | $15.99 |
      | Sauce Labs Bike Light    | $49.99 |
      | Sauce Labs Fleece Jacket | $7.99  |
    And "StandardUser" clicks on the cart icon
    Then "StandardUser" checks the prices of the products
    And "StandardUser" goes to the next page
