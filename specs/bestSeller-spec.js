"use strict";
const { expect } = require("chai");
const Homepage = require("../pageObjects/homepage/homepage-page");
const BestSellers = require("../pageObjects/bestSellersPage/bestSellers-page");
const ShoppingCart = require("../pageObjects/shoppingCartPage/shopingCart-page");

describe("Best Sellers", () => {
  it("Get items by price, verify cart, delete items from cart", () => {
    // Open "Automationpractice.com" homepage
    browser.url("./");

    // Click on Best Sellers btn
    Homepage.$bestSellersBtn.waitForDisplayed();
    Homepage.$bestSellersBtn.click();
    expect(BestSellers.$bestSellersTable).to.exist;

    // Add items to the shopping cart
    const shoppingCart = BestSellers.getBestSellersItemsByPrice(30);

    // Press shopping cart button
    Homepage.$shoppingCartBtn.click();
    ShoppingCart.$proceedToCheckoutBtn.waitForDisplayed();

    // Verify that shopping cart contains each item added with the correct quantity and price
    expect(Object.keys(shoppingCart).length).to.equal(
      ShoppingCart.$$shoppingCartItemRows.length
    );
    ShoppingCart.$$shoppingCartItemRows.every((i) => {
      expect(shoppingCart).to.have.property(i.$(".product-name").getText());
      expect(shoppingCart[i.$(".product-name").getText()]).to.equal(
        parseFloat(i.$(".price .price").getText().replace("$", ""))
      );
      expect(i.$(".cart_quantity_input").getValue()).to.equal("1");
    });

    // Check the total price of cart items is correct
    expect(
      parseFloat(
        ShoppingCart.$shoppingCartTotalSumNoShipping.getText().replace("$", "")
      )
    ).to.equal(ShoppingCart.getShoppingCartTotalWithoutShipping());

    // Remove all items from the shopping cart
    ShoppingCart.clearShoppingCart();

    // Verify that shopping cart is empty
    expect(ShoppingCart.$shoppingCartEmptyLbl.getText()).to.equal("(empty)");
  });
});
