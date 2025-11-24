Feature: Ecommerce validations

    @Regression
    Scenario Outline: Placing the order
        Given login to Ecommerce application with "<email>" and "<password>"
        When Add "<productName>" to the Cart
        Then Verify "<productName>" is displayed in the Cart
        When Enter valid details and Palace the order
        Then Verify order is present in OrderHistory
        Then Delete the order

        Examples:
            | email            | password  | productName   |
            | jimlarry@test.io | Test7890? | iphone 13 pro |

