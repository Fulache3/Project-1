const cart = {
    quantity: document.querySelector(".cart-quantity"),
    container: document.querySelector(".cart-container"),
    item: {
        removeBtn: document.querySelectorAll(".remove-item-btn"),
        itemQuantity: document.querySelectorAll(".quantity-value"),
    },
    summary: {
        upperCost: document.querySelector(".upper-total-item-cost"),
        shippingCostBtn: document.querySelector(".shipping-confirm-btn"),
        shippingCheckBox: document.querySelectorAll(".shipping-checkbox"),
        lowerCost: document.querySelector(".lower-total-item-cost"),
        shippingCost: document.querySelector(".shipping-cost"),
        discountInfoIcon: document.querySelector(".discount-info-icon"),
        discountInfo: document.querySelector(".discount-info"),
        discountText: document.querySelector(".discount-text"),
        overall: document.querySelector(".overall-total-cost"),
        item: document.querySelector(".summary-item"),
        total: {
            cost: 0,
            shippingCost: 0,
            discount: [],
            overall: 0,
        },
    },
};

const removeConfirm = {
    section: document.querySelector(".remove-item-section"),
    remove: {
        yes: document.querySelector(".yes-btn"),
        no: document.querySelector(".no-btn"),
    },
};
//For accessing the local storage where the cart data is stored
function accessStorage() {
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
    //CART ITEM
    cartRender(cart);
    removeItem();
    quantityChanger();
    //ORDER SUMMARY
    cost();
    shippingCategory();
    discounter();
    discountInfoView();
}
main();

//CART ITEMS
//CART RENDERING TO GET THE LATEST ITEM DATA
function cartRender(obj) {
    let cartArray = accessStorage();
    obj.quantity.textContent = `${cartArray.length} ITEMS`;
    obj.summary.item.textContent = `${cartArray.length} ITEMS`;
    let temp = "";
    if (cartArray.length === 0) {
        temp = "";
    } else {
        for (let i = 0; i < cartArray.length; i++) {
            temp += htmlGenerator(cartArray[i]);
        }
        obj.container.innerHTML = temp;
        obj.item.removeBtn = document.querySelectorAll(".remove-item-btn");
        temp = "";
    }
}

//REMOVING ITEM IN THE CART
function removeItem() {
    function attachRemoveListeners() {
        quantityChanger();
        cart.item.removeBtn = document.querySelectorAll(".remove-item-btn");
        cart.item.removeBtn.forEach((button, index) => {
            button.addEventListener("click", () => {
                removeConfirm.section.classList.remove("hidden");
                removeConfirm.section.classList.add("flex");
                removeConfirm.remove.yes.addEventListener("click", function () {
                    const container = button.closest(".cart-item");
                    let item = container.querySelector(".item-image-source");
                    const cartArray = accessStorage();
                    container.remove();
                    for (let i = 0; i < cartArray.length; i++) {
                        if (
                            item.getAttribute("src") === cartArray[i].imgSource
                        ) {
                            cartArray.splice(i, 1);
                            let updatedCart = JSON.stringify(cartArray);
                            localStorage.setItem("cart", updatedCart);
                            cartRender(cart);
                            cost();
                            discounter();
                            totalCost();
                            attachRemoveListeners(); // Reset listeners after rendering
                            break;
                        }
                    }
                    removeConfirm.section.classList.remove("flex");
                    removeConfirm.section.classList.add("hidden");
                });
                removeConfirm.remove.no.addEventListener("click", function () {
                    removeConfirm.section.classList.remove("flex");
                    removeConfirm.section.classList.add("hidden");
                });
            });
        });
    }

    attachRemoveListeners();
}

//QUANTITY CHANGER OF THE ITEM
function quantityChanger() {
    cart.item.itemQuantity = document.querySelectorAll(".quantity-value");
    cart.item.itemQuantity.forEach((input, index) => {
        input.addEventListener("input", () => {
            const container = input.closest(".cart-item");
            let item = container.querySelector(".item-image-source");
            const cartArray = accessStorage();
            const verifyBtn = container.querySelector(".verify-quantity-btn");
            verifyBtn.classList.remove("hidden");
            verifyBtn.addEventListener("click", function () {
                for (let i = 0; i < cartArray.length; i++) {
                    if (item.getAttribute("src") === cartArray[i].imgSource) {
                        cartArray[i].quantity = parseInt(input.value);
                        let updatedCart = JSON.stringify(cartArray);
                        localStorage.setItem("cart", updatedCart);
                        cartRender(cart);
                        removeItem();
                        cost();
                        discounter();
                        totalCost();
                        verifyBtn.classList.add("hidden");
                        break;
                    }
                }
            });
        });
    });
}

//HTML GENERATOR TO GENERATE ITEMS IN THE CART
function htmlGenerator(productObject) {
    let html = `<!--Product-->
            <div class="cart-item w-full h-24 flex pl-5 shadow-md pb-2">
                <div class="w-1/4 h-full flex">
                    <div class="w-1/2 h-full flex items-center lg:items-start">
                        <img 
                        class="item-image-source w-10 h-10 lg:w-full lg:h-full"
                        src="${productObject.imgSource}"
                        alt=""
                    />
                    </div>
                    <div
                        class="w-1/2 h-full flex flex-col pl-2 pt-2"
                    >
                        <p class="item-type lg:text-xs font-bold">${
                            productObject.type
                        }</p>
                        <p class="item-material lg:text-xs text-yellow-600">${
                            productObject.material
                        }</p>
                        <p class="item-gender lg:text-xs">${
                            productObject.gender
                        }</p>
                        <hr class="mt-1 mr-1" />
                        <button class="remove-item-btn lg:mt-2 w-fit cursor-pointer hover:opacity-70">
                        <img class="w-3 h-3" src="Images/trash-can.png">
                        </button>
                    </div>
                </div>
                <div
                    class="w-1/4 h-full flex items-center justify-center"
                >
                    <div
                        class="flex w-full items-center justify-center gap-3"
                    >
                        <input
                            class="quantity-value w-10 h-5 text-center text-xs cursor-pointer"
                            type="number"
                            value="${productObject.quantity}"
                        />
                        <button class = "verify-quantity-btn w-4 hover:opacity-80 active:opacity-50 hidden">
                        <img
                        src="Images/verified.png"
                        alt=""
                    /></button>

                    </div>
                </div>
                <div
                    class="item-price w-1/4 h-full flex items-center justify-center lg:text-xs font-bold"
                >
                    <p>₱${productObject.price}</p>
                </div>
                <div
                    class="total-item-cost w-1/4 h-full flex items-center justify-center lg:text-xs font-bold"
                >
                    <p class = "total-cost-item" >₱${
                        productObject.price * productObject.quantity
                    }</p>
                </div>
            </div>`;
    return html;
}

//ORDER SUMMARY

//UPPER COST DISPLAY AND LOWER COST DISPLAY
function cost() {
    const totalCost = document.querySelectorAll(".total-item-cost");
    let numericTotal = 0;
    totalCost.forEach((element, index) => {
        let numeric = parseInt(element.textContent.replace(/[^\d]/g, ""), 10);

        numericTotal += numeric;
    });
    cart.summary.upperCost.textContent = `₱${numericTotal}`;
    cart.summary.lowerCost.textContent = `Subtotal: ₱${numericTotal}`;
    cart.summary.total.cost = numericTotal;
}

//SHIPPING CATEGORY FUNCTIONALITY UNCHECK AND CHECK
function shippingCategory() {
    const shippingCheckBoxes = cart.summary.shippingCheckBox;
    shippingCheckBoxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            // Uncheck all checkboxes
            shippingCheckBoxes.forEach(function (otherCheckbox) {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
            if (checkbox.checked) {
                cart.summary.total.shippingCost = parseFloat(checkbox.value);
                cart.summary.shippingCost.textContent = `Shipping cost: ₱${cart.summary.total.shippingCost} - ${checkbox.name}`;
                discounter();
                totalCost();
            }
            if (checkbox.checked === false) {
                cart.summary.shippingCost.innerHTML = `Shipping cost: <span class="text-red-500">Please select a shipping method</span>`;
                cart.summary.total.shippingCost = 0.0;
                totalCost();
                discounter();
            }
        });
    });
}

//AMOUNT DISCOUNT
function discounter() {
    if (cart.summary.total.cost >= 10000) {
        cart.summary.total.discount = [0.3, 0.1];
        cart.summary.discountText.textContent = `Active - You saved  ₱${parseFloat(
            cart.summary.total.cost * 0.3 +
                cart.summary.total.shippingCost * 0.1
        ).toFixed(2)}`;
    } else {
        cart.summary.discountText.textContent = `Disabled - Your total item cost only: ₱${cart.summary.total.cost}`;
        cart.summary.total.discount = 0;
    }
}

//DISCOUNT INFORMATION VIEWER
function discountInfoView() {
    cart.summary.discountInfoIcon.addEventListener("mouseover", function () {
        cart.summary.discountInfo.classList.remove("hidden");
    });

    cart.summary.discountInfoIcon.addEventListener("mouseout", function () {
        cart.summary.discountInfo.classList.add("hidden");
    });
}

//OVERALL COST DISPLAY
function totalCost() {
    if (!cart.summary.total.discount.length == 0) {
        cart.summary.total.discount =
            cart.summary.total.cost * 0.3 +
            cart.summary.total.shippingCost * 0.1;
        cart.summary.total.overall =
            cart.summary.total.cost +
            cart.summary.total.shippingCost -
            cart.summary.total.discount;
        cart.summary.overall.textContent = `Total Cost: ₱${parseFloat(
            cart.summary.total.overall.toFixed(2)
        )}`;
    } else {
        cart.summary.total.overall =
            cart.summary.total.cost + cart.summary.total.shippingCost;
        cart.summary.overall.textContent = `Total Cost: ₱${parseFloat(
            cart.summary.total.overall.toFixed(2)
        )}`;
    }
}

function checkoutOrder() {
    const checkoutBtn = document.querySelector(".checkout-order-btn");
    const warningCon = document.querySelector(".warning-info-con");
    const warningInfo = document.querySelector(".warning-info-text");
    checkoutBtn.addEventListener("click", function () {
        if (
            cart.summary.total.cost === 0 &&
            cart.summary.total.shippingCost === 0
        ) {
            warningCon.classList.remove("hidden");
            warningCon.classList.add("flex");
            warningInfo.textContent =
                "Cart is empty & Please select a shipping method.";
        } else if (cart.summary.total.cost === 0) {
            warningCon.classList.remove("hidden");
            warningCon.classList.add("flex");
            warningInfo.textContent = "Cart is empty.";
        } else if (cart.summary.total.shippingCost === 0) {
            warningCon.classList.remove("hidden");
            warningCon.classList.add("flex");
            warningInfo.textContent = "Please select a shipping method.";
        } else {
            let totalCost = cart.summary.overall.textContent;
            let costFinal = totalCost.replace("Total Cost: ", "");
            localStorage.setItem("checkout",costFinal );
            localStorage.setItem("checkoutItem", localStorage.getItem("cart"));
            localStorage.removeItem('cart');
            window.location.href = "payment-gateway.html";
        }
    });
}
checkoutOrder();
