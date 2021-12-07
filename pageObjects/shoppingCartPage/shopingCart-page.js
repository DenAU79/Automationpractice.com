"use strict";
class ShoppingCart {
    get $proceedToCheckoutBtn() { return $('.standard-checkout[title="Proceed to checkout"]'); }      
    get $$shoppingCartItemRows() { return $$(".cart_item"); }
    get $$shoppingCartTotalRow() { return $$(".cart_total .price"); }
    get $shoppingCartTotalSumNoShipping() { return $("#total_product"); }
    get $$shoppingCartTrashColumn() { return $$(".icon-trash"); }
    get $shoppingCartEmptyLbl() { return $(".ajax_cart_no_product"); }

    // Method to calculate total price for the items in the Cart without shipping costs
    getShoppingCartTotalWithoutSipping() {
        let sum = 0;
        for (let i = 0; i < this.$$shoppingCartTotalRow.length; i++) {
          sum += parseFloat(this.$$shoppingCartTotalRow[i].getText().replace("$", ""));
        }
        return sum;
    }

    // Method to delete each item from the Cart
    clearShoppingCart() {
        this.$$shoppingCartTrashColumn.forEach((element) => {
            element.click()
            browser.pause(2000);            
        });        
    }
}
module.exports = new ShoppingCart();