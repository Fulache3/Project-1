import { products } from "./products.js";

const wishlist = {
    container: document.querySelector(".wishlist-container"),
    item: {
        remove: {
            removeBtn: document.querySelectorAll(".wishlist-remove-btn"),
            yes: document.querySelector(".yes-btn"),
            no: document.querySelector(".no-btn"),
            section: document.querySelector(".remove-item-section"),
        },
    },
};

//TO ACCESS WISHLIST STORAGE
function accessStorage() {
    const wishlistData = localStorage.getItem("wishlist");
    let wishlistArray = "";
    if (wishlistData === null) {
        let tempWishlist = "[]";
        localStorage.setItem("wishlist", tempWishlist);
    } else {
        let wishlistData2 = localStorage.getItem("wishlist");
        wishlistArray = JSON.parse(wishlistData2);
    }
    return wishlistArray;
}
//TO ACCESS CART STORAGE
function cartAccessStorage() {
    const cartData1 = localStorage.getItem("cart");
    let cartArray = "";
    if (cartData1 === null) {
        let tempCart = "[]";
        localStorage.setItem("cart", tempCart);
    } else {
        let cartData2 = localStorage.getItem("cart");
        cartArray = JSON.parse(cartData2);
    }
    return cartArray;
}
function main() {
    wishlistRender(wishlist);
    removeItem();
    addToCart();
    isInCart();
}
main();

//WISHLIST RENDERING
function wishlistRender(w) {
    let wishlistArray = accessStorage();
    let temp = "";
    if (wishlistArray.length === 0) {
        temp = "";
    } else {
        for (let i = 0; i < wishlistArray.length; i++) {
            temp += htmlGenerator(wishlistArray[i]);
        }
        w.container.innerHTML = temp;
        temp = "";
    }
}

//REMOVING ITEM IN THE CART
function removeItem() {
    function attachRemoveListeners() {
        wishlist.item.remove.removeBtn = document.querySelectorAll(
            ".wishlist-remove-btn"
        );
        wishlist.item.remove.removeBtn.forEach((button, index) => {
            button.addEventListener("click", () => {
                wishlist.item.remove.section.classList.remove("hidden");
                wishlist.item.remove.section.classList.add("flex");

                wishlist.item.remove.yes.addEventListener("click", function () {
                    const container = button.closest(".wishlist-container");
                    let item = container.querySelector(".item-image-source");
                    const wishlistArray = accessStorage();
                    container.remove();
                    for (let i = 0; i < wishlistArray.length; i++) {
                        if (
                            item.getAttribute("src") ===
                            wishlistArray[i].imgSource
                        ) {
                            wishlistArray.splice(i, 1);
                            let updateWishlist = JSON.stringify(wishlistArray);
                            localStorage.setItem("wishlist", updateWishlist);
                            wishlistRender(wishlist);
                            addToCart();
                            attachRemoveListeners();
                            break;
                        }
                    }
                    wishlist.item.remove.section.classList.remove("flex");
                    wishlist.item.remove.section.classList.add("hidden");
                });
                wishlist.item.remove.no.addEventListener('click',function(){
                    wishlist.item.remove.section.classList.remove("flex");
                    wishlist.item.remove.section.classList.add("hidden");
                })
            });
        });
    }

    attachRemoveListeners();
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
            const container = button.closest(".wishlist-container");
            let productImgSource =
                container.querySelector(".item-image-source");
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
            isInCart();
        });
    });
}

//CHECK ITEM IF IT'S IN THE CART ALREADY
function isInCart() {
    let addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
    let cartArray = cartAccessStorage();
    addToCartBtn.forEach((button, index) => {
        const container = button.closest(".wishlist-container");
        const item = container.querySelector(".item-image-source");
        for (let i = 0; i < cartArray.length; i++) {
            if (item.getAttribute("src") === cartArray[i].imgSource) {
                button.classList = [];
                button.disabled = true;
                button.innerHTML = `<img class="w-5 h-5" src="Images/checked.png">`;
            }
        }
    });
}

//GENERATE COMPONENT
function htmlGenerator(product) {
    let html = `<!--PRODUCT-->
                <div class="wishlist-container w-full flex flex-col gap-2 mb-1">
                    <div class="w-full h-24 flex pl-5 shadow-md pb-2">
                        <div class="w-1/4 h-full flex">
                            <div
                                class="h-full flex items-center justify-center lg:items-start"
                            >
                                <img
                                    class="item-image-source w-10 h-10 lg:w-20 lg:h-20"
                                    src="${product.imgSource}"
                                    alt=""
                                />
                            </div>
                            <div class="h-full flex flex-col pl-2 pt-2">
                                <p class="lg:text-xs font-bold" style="font-size: 0.5rem;">${product.type}</p>
                                <p class="lg:text-xs text-yellow-600" style="font-size: 0.5rem;">
                                    ${product.material}
                                </p>
                                <p class="lg:text-xs" style="font-size: 0.5rem;">${product.gender}</p>
                                <hr class="mt-1 mr-1" />
                                <button
                                    class="wishlist-remove-btn lg:mt-2 w-fit cursor-pointer hover:opacity-70"
                                >
                                    <img
                                        class="w-3 h-3"
                                        src="Images/trash-can.png"
                                    />
                                </button>
                            </div>
                        </div>
                        <!--Price here-->
                        <div
                            class="w-1/4 h-full flex items-center justify-center lg:text-xs font-bold"
                        >
                            <p class="" style="font-size: 0.5rem;">₱${product.price}</p>
                        </div>
                        <!--Date here here-->
                        <div
                            class="w-1/4 h-full flex items-center justify-center lg:text-xs font-bold"
                        >
                            <p class="" style="font-size: 0.5rem;">${product.date}</p>
                        </div>
                        <div
                            class="w-1/4 h-full flex items-center justify-center lg:text-xs font-bold"
                        >
                            <button
                                class="add-to-cart-btn cursor-pointer text-xs font-thin text-white bg-gradient-to-r from-gray-400 to-yellow-600 w-fit p-1 rounded-full active:shadow-lg active:opacity-80 hover:shadow-lg"
                                style="font-size: 0.5rem;">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>`;
    return html;
}
