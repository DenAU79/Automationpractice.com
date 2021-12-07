"use strict";
const { expect } = require("chai");
const Homepage = require("../pageObjects/homepage/homepage-page");
const BestSellers = require("../pageObjects/bestSellersPage/bestSellers-page");
const ShoppingCart = require("../pageObjects/shoppingCartPage/shopingCart-page");

describe("Best Sellers", () => {
  it("Get items by price, verify cart, delete items from cart", () => {
    // Open "rentalcover.com" homepage
    browser.url("./");

    // Click on Best Sellers btn
    Homepage.$bestSellersBtn.waitForDisplayed();
    Homepage.$bestSellersBtn.click();
    expect(BestSellers.$bestSellersTable).to.exist;

    // Object of suitable items with a property name as an Item title and it's value as an Item price
    const shoppingCart = BestSellers.getBestSellersItemsByPrice(30);

    // Press shopping cart button
    Homepage.$shoppingCartBtn.click();
    ShoppingCart.$proceedToCheckoutBtn.waitForDisplayed();

    // Verifying shopping cart
    expect(Object.keys(shoppingCart).length).to.equal(ShoppingCart.$$shoppingCartItemRows.length);

    ShoppingCart.$$shoppingCartItemRows.every((i) => {
      expect(shoppingCart).to.have.property(i.$(".product-name").getText());
      expect(shoppingCart[i.$(".product-name").getText()]).to.equal(parseFloat(i.$(".price .price").getText().replace("$", "")));
      expect(i.$(".cart_quantity_input").getValue()).to.equal("1");      
    });

    // Check the total of cart items
    expect(parseFloat(ShoppingCart.$shoppingCartTotalSumNoShipping.getText().replace("$", ""))).to.equal(ShoppingCart.getShoppingCartTotalWithoutSipping());
      
    // Remove all items from the cart    
    ShoppingCart.clearShoppingCart();

    // Verify that shopping cart is empty

    expect(ShoppingCart.$$shoppingCartTrashColumn).to.not.exist;
   
    
  });
});
