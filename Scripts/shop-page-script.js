import { products } from "./products.js";

//OBJECTS
const smCat = {
    showButton: document.querySelector(".sm-category-btn"),
    backButton: document.querySelector(".sm-back-btn"),
    nav: document.querySelector(".sm-category-nav"),
};

const LGcategory = {
    btn: document.querySelector(".lg-category-find-btn"),
    collections: {
        men: document.querySelector(".lg-men-collections-cb"),
        women: document.querySelector(".lg-women-collections-cb"),
    },
    type: {
        all: document.querySelector(".lg-all-jewel"),
        necklace: document.querySelector(".lg-necklace"),
        earring: document.querySelector(".lg-earring"),
        bracelet: document.querySelector(".lg-bracelet"),
        ring: document.querySelector(".lg-ring-c"),
        earCuff: document.querySelector(".lg-earcuff"),
        anklet: document.querySelector(".lg-anklet"),
    },
    material: {
        k24gold: document.querySelector(".lg-24kgold"),
        k18gold: document.querySelector(".lg-18kgold"),
        silver: document.querySelector(".lg-silver"),
        pearl: document.querySelector(".lg-pearl"),
        onyxstone: document.querySelector(".lg-onyxstone"),
    },
};
const SMcategory = {
    btn: document.querySelector(".sm-category-find-btn"),
    collections: {
        men: document.querySelector(".sm-men-collections-cb"),
        women: document.querySelector(".sm-women-collections-cb"),
    },
    type: {
        all: document.querySelector(".sm-all-jewel"),
        necklace: document.querySelector(".sm-necklace"),
        earring: document.querySelector(".sm-earring"),
        bracelet: document.querySelector(".sm-bracelet"),
        ring: document.querySelector(".sm-ring-c"),
        earCuff: document.querySelector(".sm-earcuff"),
        anklet: document.querySelector(".sm-anklet"),
    },
    material: {
        k24gold: document.querySelector(".sm-24kgold"),
        k18gold: document.querySelector(".sm-18kgold"),
        silver: document.querySelector(".sm-silver"),
        pearl: document.querySelector(".sm-pearl"),
        onyxstone: document.querySelector(".sm-onyxstone"),
    },
};

const addToCartMessage = document.querySelector(".shop-cart-message");
const productDisplay = document.querySelector(".product-display");
const loading = document.querySelector(".loading-section");
//FUNCTIONS
function main() {
    //Remove body fixed position
    window.addEventListener("resize", function () {
        if (this.window.innerWidth > 1000) {
            document.querySelector("body").classList.remove("fixed");
        }
    });
    //SMALL CATEGORY NAV BAR
    openSmallScreenNav(smCat.showButton, smCat.backButton);

    //PRODUCT DISPLAY
    genderCategoryClicked();
    addToCart();
    wishlist();
    wishlistLogoChanger();
    ShowProduct(LGcategory);
    ShowProduct(SMcategory);
    cartRender();
    wishlistRender();
}
main();

function genderCategoryClicked() {
    const genderChose = localStorage.getItem("genderStorage");
    if (genderChose === "") {
        productFinder(false, false, false);
    } else if (genderChose === "men") {
        productFinder("Male", false, false);
        localStorage.setItem("genderStorage", "");
    } else if (genderChose === "women") {
        productFinder("Female", false, false);
        localStorage.setItem("genderStorage", "");
    }
}
//Open small screen nav bar
function openSmallScreenNav(showBtn, backBtn) {
    showBtn.addEventListener("click", function () {
        smCat.nav.classList.remove("hidden");
        document.querySelector("body").classList.add("fixed");
    });
    backBtn.addEventListener("click", function () {
        smCat.nav.classList.add("hidden");
        document.querySelector("body").classList.remove("fixed");
        const allCheckBox = document.querySelectorAll('input[type="checkbox"]');
        allCheckBox.forEach((checkboxElement) => {
            checkboxElement.checked = false;
        });
    });
}

//This function will show the products depends on the category that has been chose
function ShowProduct(obj) {
    const men = obj.collections.men;
    const women = obj.collections.women;
    const all = obj.type.all;
    const necklace = obj.type.necklace;
    const earring = obj.type.earring;
    const bracelet = obj.type.bracelet;
    const ring = obj.type.ring;
    const earCuff = obj.type.earCuff;
    const anklet = obj.type.anklet;
    const k24gold = obj.material.k24gold;
    const k18gold = obj.material.k18gold;
    const silver = obj.material.silver;
    const pearl = obj.material.pearl;
    const onyxstone = obj.material.onyxstone;
    const categoryBtn = obj.btn;
    //MEN CATEGORY
    men.addEventListener("click", function () {
        categoryChecker(obj, true, false, false, "men");
    });

    //WOMEN CATEGORY
    women.addEventListener("click", function () {
        categoryChecker(obj, true, false, false, "women");
    });

    //TYPE CATEGORY
    all.addEventListener("click", function () {
        categoryChecker(obj, false, true, false, "all");
    });
    necklace.addEventListener("click", function () {
        categoryChecker(obj, false, true, false, "necklace");
    });
    earring.addEventListener("click", function () {
        categoryChecker(obj, false, true, false, "earring");
    });
    bracelet.addEventListener("click", function () {
        categoryChecker(obj, false, true, false, "bracelet");
    });
    ring.addEventListener("click", function () {
        categoryChecker(obj, false, true, false, "ring");
    });
    earCuff.addEventListener("click", function () {
        categoryChecker(obj, false, true, false, "earCuff");
    });
    anklet.addEventListener("click", function () {
        categoryChecker(obj, false, true, false, "anklet");
    });

    //MATERIAL CATEGORY
    k24gold.addEventListener("click", function () {
        categoryChecker(obj, false, false, true, "k24gold");
    });
    k18gold.addEventListener("click", function () {
        categoryChecker(obj, false, false, true, "k18gold");
    });
    silver.addEventListener("click", function () {
        categoryChecker(obj, false, false, true, "silver");
    });
    pearl.addEventListener("click", function () {
        categoryChecker(obj, false, false, true, "pearl");
    });
    onyxstone.addEventListener("click", function () {
        categoryChecker(obj, false, false, true, "onyxstone");
    });

    categoryBtn.addEventListener("click", async function () {
        findProduct(obj);
        smCat.nav.classList.add("hidden");
        document.querySelector("body").classList.remove("fixed");
        const allCheckBox = document.querySelectorAll('input[type="checkbox"]');
        allCheckBox.forEach((checkboxElement) => {
            checkboxElement.checked = false;
        });
        addToCart();
        wishlist();
        wishlistLogoChanger();
    });
}

async function findProduct(main) {
    const categoryArray = [];
    const finalProduct = {
        collections: false,
        type: false,
        material: false,
    };
    //Loop in the collection category
    for (let key in main.collections) {
        if (main.collections[key].checked === true) {
            categoryArray.push(key);
        }
    }
    //Loop in the type category
    for (let key in main.type) {
        if (main.type[key].checked === true) {
            categoryArray.push(key);
        }
    }
    //Loop in the material category
    for (let key in main.material) {
        if (main.material[key].checked === true) {
            categoryArray.push(key);
        }
    }

    for (let i = 0; i < categoryArray.length; i++) {
        for (let key in main.collections) {
            if (categoryArray[i] === key) {
                finalProduct.collections = main.collections[key].value;
            }
        }
        for (let key in main.type) {
            if (categoryArray[i] === key) {
                if (main.type[key].value === "All Jewelries") {
                    finalProduct.type = false;
                } else {
                    finalProduct.type = main.type[key].value;
                }
            }
        }
        for (let key in main.material) {
            if (categoryArray[i] === key) {
                finalProduct.material = main.material[key].value;
            }
        }
    }
    productFinder(
        finalProduct.collections,
        finalProduct.type,
        finalProduct.material
    );
}

//Category checker and uncheck
function categoryChecker(main, collections, type, material, typeSelected) {
    if (collections) {
        for (let key in main.collections) {
            if (key !== typeSelected) {
                main.collections[key].checked = false;
            }
        }
    } else if (type) {
        for (let key in main.type) {
            if (key !== typeSelected) {
                main.type[key].checked = false;
            }
        }
    } else if (material) {
        for (let key in main.material) {
            if (key !== typeSelected) {
                main.material[key].checked = false;
            }
        }
    }
}

//PRODUCT FINDER (ASYNC FOR BACKGROUND PROCESSING)
async function productFinder(gender = false, type = false, material = false) {
    startLoadingScreen();
    productDisplay.innerHTML = "";
    let temporary = "";

    // PROMISE
    return new Promise((resolve) => {
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            // CHECK THE PRODUCTS BASED ON THE CATEGORY CHOSE
            if (
                (gender === false || product.gender === gender) &&
                (type === false || product.type === type) &&
                (material === false || product.material === material)
            ) {
                temporary += htmlGenerator(product);
            }
        }
        productDisplay.innerHTML = temporary;
        temporary = "";
        tilt();

        setTimeout(function () {
            stopLoadingScreen();
        }, 500);
        //RESOLVE WHEN SEARCH IS COMPLETE
        resolve();
    });
}

//LOADING SCREEN
function startLoadingScreen() {
    loading.classList.remove("hidden");
    loading.classList.add("flex");
}
function stopLoadingScreen() {
    loading.classList.remove("flex");
    loading.classList.add("hidden");
}
//TILT
function tilt() {
    const element = document.querySelectorAll(".product-card");
    VanillaTilt.init(element);
}

//ADD TO CART FUNCTION
function addToCart() {
    let productSelected = {
        gender: "",
        type: "",
        material: "",
        productNumber: 0,
        price: 0,
        imgSource: "",
        quantity: 1,
    };
    let addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
    addToCartBtn.forEach((button, index) => {
        button.addEventListener("click", () => {
            const container = button.closest(".product-card");
            let productImgSource = container.querySelector(".product-img");
            for (let i = 0; i < products.length; i++) {
                if (
                    products[i].imgSource ===
                    productImgSource.getAttribute("src")
                ) {
                    productSelected.gender = products[i].gender;
                    productSelected.type = products[i].type;
                    productSelected.material = products[i].material;
                    productSelected.productNumber = products[i].productNumber;
                    productSelected.price = products[i].price;
                    productSelected.imgSource = products[i].imgSource;
                    break;
                }
            }
            const cart = localStorage.getItem("cart");
            let productAlreadyInCart = false;
            if (cart === null) {
                const tempCart = [];
                tempCart.push(productSelected);
                localStorage.setItem("cart", JSON.stringify(tempCart));
            } else {
                let cartData = localStorage.getItem("cart");
                let cartArray = JSON.parse(cartData);
                for (let i = 0; i < cartArray.length; i++) {
                    if (cartArray[i].imgSource === productSelected.imgSource) {
                        cartArray[i].quantity += 1;
                        productAlreadyInCart = true;
                        break;
                    }
                }
                if (!productAlreadyInCart) {
                    cartArray.push(productSelected);
                }
                document.querySelector(".cart-quantity-shop").textContent =
                    cartArray.length;
                let cartString = JSON.stringify(cartArray);
                localStorage.setItem("cart", cartString);
            }
            productSelected = {
                gender: "",
                type: "",
                material: "",
                productNumber: 0,
                price: 0,
                imgSource: "",
                quantity: 1,
            };
            addToCartMessage.classList.remove("hidden");
            addToCartMessage.classList.add("flex");
            document.querySelector(".cart-btn").classList.add("animate-ping");
            document
                .querySelector(".cart-animation")
                .classList.add("animate-spin");
            setTimeout(function () {
                addToCartMessage.classList.remove("flex");
                addToCartMessage.classList.add("hidden");
                document
                    .querySelector(".cart-animation")
                    .classList.remove("animate-spin");
                document
                    .querySelector(".cart-btn")
                    .classList.remove("animate-ping");
            }, 500);
        });
    });
}
//cart render to render the cart icon number
function cartRender() {
    const cart = localStorage.getItem("cart");
    if (cart === null) {
        let tempCart = "[]";
        localStorage.setItem("cart", tempCart);
    } else {
        let cartData = localStorage.getItem("cart");
        let cartArray = JSON.parse(cartData);
        document.querySelector(".cart-quantity-shop").textContent =
            cartArray.length;
    }
}
function wishlist() {
    let date = getDate();
    let productSelected = {
        gender: "",
        type: "",
        material: "",
        productNumber: 0,
        price: 0,
        imgSource: "",
        date: date,
    };
    let addToWishlist = document.querySelectorAll(".wishlist-btn");
    addToWishlist.forEach((button, index) => {
        button.addEventListener("click", () => {
            const container = button.closest(".product-card");
            let productImgSource = container.querySelector(".product-img");
            for (let i = 0; i < products.length; i++) {
                if (
                    products[i].imgSource ===
                    productImgSource.getAttribute("src")
                ) {
                    productSelected.gender = products[i].gender;
                    productSelected.type = products[i].type;
                    productSelected.material = products[i].material;
                    productSelected.productNumber = products[i].productNumber;
                    productSelected.price = products[i].price;
                    productSelected.imgSource = products[i].imgSource;
                    break;
                }
            }
            const wl = localStorage.getItem("wishlist");
            if (wl === null) {
                const tempWl = [];
                tempWl.push(productSelected);
                localStorage.setItem("wishlist", JSON.stringify(tempWl));
            } else {
                const wlData = localStorage.getItem("wishlist");
                const wlArray = JSON.parse(wlData);
                let isRemoved = false;
                for (let i = 0; i < wlArray.length; i++) {
                    let wlTemp = wlArray[i];
                    if (wlTemp.imgSource === productSelected.imgSource) {
                        wlArray.splice(i, 1);
                        isRemoved = true;
                        break;
                    }
                }
                if (!isRemoved) {
                    wlArray.push(productSelected);
                    isRemoved = false;
                }
                localStorage.setItem("wishlist", JSON.stringify(wlArray));
                wishlistLogoChanger();
                document.querySelector(".wishlist-quantity").textContent =
                    wlArray.length;

                if (!isRemoved) {
                    document
                        .querySelector(".shop-wishlist-message")
                        .classList.remove("hidden");
                    document
                        .querySelector(".shop-wishlist-message")
                        .classList.add("flex");
                    document
                        .querySelector(".wishlist-btn")
                        .classList.add("animate-ping");
                    setTimeout(function () {
                        document
                            .querySelector(".shop-wishlist-message")
                            .classList.remove("flex");
                        document
                            .querySelector(".shop-wishlist-message")
                            .classList.add("hidden");
                        document
                            .querySelector(".wishlist-animation")
                            .classList.add("animate-ping");
                        document
                            .querySelector(".wishlist-btn")
                            .classList.remove("animate-ping");
                    }, 900);
                    document
                        .querySelector(".wishlist-animation")
                        .classList.add("animate-ping");
                }
            }
        });
    });
}

//GET THE CURRENT DATE IN THE LOCAL MACHINE
function getDate() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1; 
    let year = currentDate.getFullYear();

    let formattedDate =
        (day < 10 ? "0" : "") +
        day +
        "-" +
        (month < 10 ? "0" : "") +
        month +
        "-" +
        year;

        return formattedDate;
}
console.log(getDate());
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

function wishlistLogoChanger() {
    const wishlistLogo = document.querySelectorAll(".wishlist-logo");
    wishlistLogo.forEach((element, index) => {
        const container = element.closest(".product-card");
        let productImgSource = container.querySelector(".product-img");
        const wishlist = localStorage.getItem("wishlist");
        let wishlistArray = JSON.parse(wishlist);
        element.setAttribute("src", "Images/unwishlist.png");

        for (let i = 0; i < wishlistArray.length; i++) {
            let wlTemp = wishlistArray[i];
            if (wlTemp.imgSource === productImgSource.getAttribute("src")) {
                element.setAttribute("src", "Images/wishlist.png");
                break;
            }
        }
    });
}
//HTML CARD STRUCTURE
function htmlGenerator(productObject) {
    let html = `<div class="product-card shadow-md w-60 h-80 border-gray-200 border-solid border-2 flex flex-col" title = "${productObject.saying}">
                <div class="w-full h-full overflow-hidden cursor-pointer">
                    <img class="product-img overflow-hidden" src="${productObject.imgSource}" alt="">
                </div>
                <div class="w-full h-40 flex flex-col gap-2 items-center relative cursor-not-allowed">
                    <p class="text-xs text-center absolute top-0 mt-1">
                        ${productObject.saying}
                    </p>
                    <h1 class="product-price font-bold text-sm absolute bottom-0 top-12">₱${productObject.price}</h1>
                    <div class="flex gap-2">
                    
                    </div>
                    <button
                        class="highlight-remove add-to-cart-btn cursor-pointer absolute bottom-1 text-xs text-white bg-gradient-to-r from-gray-400 to-yellow-600 w-fit p-1 rounded-full active:shadow-lg active:opacity-80 hover:shadow-lg"
                        title = "Add to cart?">
                        Add to cart
                    </button>
                    <button class="wishlist-btn">
                    <img class="wishlist-logo highlight-remove absolute bottom-1 right-8 h-7" src="Images/unwishlist.png" alt=""title = "Add to Wishlist?">
                    </button>
                </div>
            </div>`;
    return html;
}
