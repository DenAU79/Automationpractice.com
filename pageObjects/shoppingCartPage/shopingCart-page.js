"use strict";
class ShoppingCart {
    get $proceedToCheckoutBtn() { return $('.standard-checkout[title="Proceed to checkout"]'); }
    get $$itemsQuantityColumn() { return $$(".cart_quantity_input"); }
    get $$itemsTitleColumn() { return $$("#cart_summary .product-name"); }
    get $$itemsPriceColumn() { return $$(".price .price"); }
    get $$itemsTotalPriceColumn() { return $$(".cart_total .price"); }   
    get $totalProductsPrice() { return $("#total_product"); }   
    get $$shoppingCartItemRows() { return $$(".cart_item"); }
    get $$shoppingCartTotalRow() { return $$(".cart_total .price"); }
    get $shoppingCartTotalSumNoShipping() { return $("#total_product"); }
    get $$shoppingCartTrashColumn() { return $$(".icon-trash"); }
    
    
    getShoppingCartTotalWithoutSipping() {
        let sum = 0;
        for (let i = 0; i < this.$$shoppingCartTotalRow.length; i++) {
          sum += parseFloat(this.$$shoppingCartTotalRow[i].getText().replace("$", ""));
        }
        return sum;
    }

    clearShoppingCart() {

        this.$$shoppingCartTrashColumn.forEach((element) => {
            element.click()
            browser.pause(2000);
            element.waitForDisplayed({ reverse: true });
            
        });
        
    }


}
module.exports = new ShoppingCart();