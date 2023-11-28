const orderContainer = document.querySelector(".order-container");
main();
function main() {
    orderRender();
    showProgress();
    deliveryStatus();
}
function orderAccessStorage() {
    let orderArray = [];
    const orderData = localStorage.getItem("order");
    if (orderData === null) {
    } else {
        let orderData1 = localStorage.getItem("order");
        orderArray = JSON.parse(orderData1);
    }
    return orderArray;
}

function orderRender() {
    let orderArray = orderAccessStorage();
    let temp = "";
    if (orderArray.length === 0) {
        temp = "";
    } else {
        for (let i = 0; i < orderArray.length; i++) {
            temp += htmlGenerator(orderArray[i]);
        }
        orderContainer.innerHTML = temp;
        temp = "";
    }
}

function showProgress() {
    const showBtn = document.querySelectorAll(".show-btn");
    showBtn.forEach((button, index) => {
        button.addEventListener("click", function () {
            const container = button.closest(".order-product-container");
            const id = container.querySelector(".order-id");
            localStorage.setItem("orderID", id.textContent.trim());
            window.location.href = "progress.html";
        });
    });
}
function deliveryStatus() {
    const order = orderAccessStorage();
    for (let i = 0; i < order.length; i++) {
        if (order[i].arrival === getCurrentDate(0)) {
            order[i].status = "delivered";
        }
    }
    localStorage.setItem("order", JSON.stringify(order));

    const orderID = document.querySelectorAll(".order-id");
    orderID.forEach((id) => {
        const container = id.closest(".order-product-container");
        let button = container.querySelector(".show-btn");
        let tempID = id.textContent.trim();
        for (let i = 0; i < orderAccessStorage().length; i++) {
            if (tempID === orderAccessStorage()[i].id) {
                if (orderAccessStorage()[i].status === "delivered") {
                    button.innerHTML = `<img class="w-10 h-10" src="Images/order-delivered.png">`;
                    button.classList.remove(
                        "bg-gradient-to-r",
                        "from-gray-400",
                        "to-yellow-600",
                        "active:opacity-80",
                        "hover:shadow-lg",
                        'cursor-pointer'
                    );
                    button.disabled = true;
                }
                break;
            }
        }
    });
}
function getCurrentDate(n) {
    let currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + n);

    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

//GENERATE COMPONENT
function htmlGenerator(product) {
    let html = `<!--PRODUCT-->
        <div
            class="order-product-container w-full flex flex-col gap-2 mb-1"
        >
            <div class="w-full h-24 flex pl-5 shadow-md pb-2 lg:text-xs">
                <div
                    class="w-1/5 h-full flex items-center lg:text-xs font-bold"
                >
                    <p class="order-id text-blue-300" style="font-size: 0.5rem">
                        ${product.id}
                    </p>
                </div>
                <!--Price here-->
                <div
                    class="w-1/5 h-full flex items-center justify-center lg:text-xs font-bold"
                >
                    <p class="" style="font-size: 0.5rem">
                        ${product.orderDate}
                    </p>
                </div>
                <!--Date here here-->
                <div
                    class="w-1/5 h-full flex items-center justify-center lg:text-xs font-bold"
                >
                    <p class="" style="font-size: 0.5rem">
                        ${product.arrival}
                    </p>
                </div>
                <div
                    class="w-1/5 h-full flex items-center justify-center lg:text-xs font-bold"
                >
                    <p class="" style="font-size: 0.5rem">
                        ${product.cost}
                    </p>
                </div>
                <div
                    class="w-1/5 h-full flex items-center justify-center lg:text-xs font-bold"
                >
                    <button
                        class="px-2 show-btn cursor-pointer text-xs font-thin text-white bg-gradient-to-r from-gray-400 to-yellow-600 w-fit p-1 rounded-full active:opacity-80 hover:shadow-lg"
                        style="font-size: 0.5rem"
                    >
                    More
                    </button>
                </div>
            </div>
        </div>`;
    return html;
}