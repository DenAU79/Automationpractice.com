"use strict";
class Homepage {
    get $bestSellersBtn() { return $("#home-page-tabs .blockbestsellers"); }
    get $shoppingCartBtn() { return $('[title="View my shopping cart"]'); }


}
module.exports = new Homepage();