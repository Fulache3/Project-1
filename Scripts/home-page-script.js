//OBJECT OVERALL DOM IN THE HOMEPAGE
const home = {
    footerMenu: {
        menuMain: {
            menu: document.querySelector(".main-menu"),
            btn: document.querySelector(".main-menu-btn"),
            lst: document.querySelector(".main-menu-list"),
        },
        menuCostumer: {
            menu: document.querySelector(".customer-service-menu"),
            btn: document.querySelector(".customer-service-btn"),
            lst: document.querySelector(".customer-service-list"),
        },
        menuContacts: {
            menu: document.querySelector(".contacts-menu"),
            btn: document.querySelector(".contacts-btn"),
            lst: document.querySelector(".contacts-list"),
        },
    },
};

//FUNCTIONS
function main() {

    //LOGIN PAGE DELAY 
    /*
    setTimeout(function () {
    login.section.classList.remove("hidden");
    login.section.classList.add("flex");
    }, 2000);
    */
    //CART RENDER
    cartRender();
    wishlistRender();
    menORWomen();
    //FOOTER SLIDE MENU
    slideDownMenu(
        home.footerMenu.menuMain.menu,
        home.footerMenu.menuMain.btn,
        home.footerMenu.menuMain.lst
    );
    slideDownMenu(
        home.footerMenu.menuCostumer.menu,
        home.footerMenu.menuCostumer.btn,
        home.footerMenu.menuCostumer.lst
    );
    slideDownMenu(
        home.footerMenu.menuContacts.menu,
        home.footerMenu.menuContacts.btn,
        home.footerMenu.menuContacts.lst
    );
}

//USE MAIN HERE
main();

//FOOTER MENU SLIDE DOWN FOR SMALL SCREEN
function slideDownMenu(menu, btn, lst) {
    btn.addEventListener("click", function () {
        if (lst.classList.contains("hidden")) {
            menu.classList.add("h-48");
            if (menu.classList.contains("h-48")) {
                lst.classList.remove("hidden");
                lst.classList.add("flex");
                btn.src = "Images/up-arrow.png";
            }
        } else if (lst.classList.contains("flex")) {
            menu.classList.remove("h-48");
            lst.classList.remove("flex");
            lst.classList.add("hidden");
            btn.src = "Images/down-arrow.png";
        }
    });
}

//CART RENDER TO GET THE LATEST CART QUANTITY
function cartRender() {
    const cart = localStorage.getItem("cart");
    if (cart === null) {
        let tempCart = "[]";
        localStorage.setItem("cart", tempCart);
    } else {
        let cartData = localStorage.getItem("cart");
        let cartArray = JSON.parse(cartData);
        document.querySelector(".cart-quantity-home").textContent =
            cartArray.length;
    }
}
//WISHLIST RENDER TO GET THE LATEST WISHLIST QUANTITY
function wishlistRender() {
    const wishlist = localStorage.getItem("wishlist");
    if (wishlist === null) {
        let tempWishlist = "[]";
        localStorage.setItem("wishlist", tempWishlist);
    } else {
        let wlData = localStorage.getItem("wishlist");
        let wlArray = JSON.parse(wlData);
        document.querySelector(".wishlist-quantity").textContent =
            wlArray.length;
    }
}

//MEN OR WOMEN SHOP CATEGORY
function menORWomen(){
    const men = document.querySelector('.men-shop-btn');
    const women = document.querySelector('.women-shop-btn');
    localStorage.setItem('genderStorage','');
    men.addEventListener('click',function(){
        const genderStorage = localStorage.getItem("genderStorage");
        if (genderStorage === null) {
            let tempCart = "";
            localStorage.setItem("cart", tempCart);
        } else {
            localStorage.setItem('genderStorage','men');

        }
    });
    women.addEventListener('click',function(){
        const genderStorage = localStorage.getItem("genderStorage");
        if (genderStorage === null) {
            let tempCart = "";
            localStorage.setItem("cart", tempCart);
        } else {
            localStorage.setItem('genderStorage','women');

        }
    });
}