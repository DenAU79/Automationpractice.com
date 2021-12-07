"use strict";
const Homepage = require("../homepage/homepage-page");

class BestSellers {
    get $bestSellersTable() { return $("#blockbestsellers.active"); }        
    get $$bestSellersItems() { return $$("#blockbestsellers .ajax_block_product .right-block"); }
    get $closeAddItemWindowBtn() { return $('[title="Close window"]'); }    

    // Helper method to add an item to cart from Best Sellers by price
    getBestSellersItemsByPrice(price) {
      // Object of suitable items with a property name as an Item title and it's value as an Item price
      let cart = {};

      // Loop through an array of Best Sellers items
      this.$$bestSellersItems.forEach((element) => {
        let itemPrice = parseFloat(element.$(".price").getText().replace("$", ""));
        element.moveTo();
        if (itemPrice < price) {
          cart[element.$(".product-name").getText()] = itemPrice;
          element.$(".ajax_add_to_cart_button").waitForDisplayed();
          element.$(".ajax_add_to_cart_button").click();
          this.$closeAddItemWindowBtn.waitForDisplayed();
          this.$closeAddItemWindowBtn.click();
          this.$closeAddItemWindowBtn.waitForDisplayed({ reverse: true });
        }
      });
      this.$closeAddItemWindowBtn.waitForDisplayed({ reverse: true });
      Homepage.$shoppingCartBtn.scrollIntoView();
      return cart;
    }      
}
module.exports = new BestSellers();