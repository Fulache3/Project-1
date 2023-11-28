function paymentGatewayInfo() {
    const paymentInfo = document.querySelector(".payment-gateway-info");
    const closeInfo = document.querySelector(".close-info");
    setTimeout(function () {
        paymentInfo.classList.remove("hidden");
        paymentInfo.classList.add("flex");
    }, 1000);

    closeInfo.addEventListener("click", function () {
        paymentInfo.classList.remove("flex");
        paymentInfo.classList.add("hidden");
    });
}

function getCurrentDate(n) {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + n);

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

function payment() {
    let order = {
        item: "",
        cost: "",
        id: "",
        orderDate: "",
        arrival: "",
        status: "",
    };
    const paymentBtn = document.querySelector(".pay-button");

    paymentBtn.addEventListener("click", function () {
        if (localStorage.getItem("checkout") === null) {
            alert("Checkout is empty");
        } else {
            let getID = generateID(10);
            let getDate = getCurrentDate(0);
            let getArrival = getCurrentDate(4);
            order = {
                item: localStorage.getItem("checkoutItem"),
                cost: localStorage.getItem("checkout"),
                id: getID,
                orderDate: getDate,
                arrival: getArrival,
                status: 'undelivered'
            };
            const currentOrder = localStorage.getItem("order");
            const tempArray = [];
            if (currentOrder === null) {
                tempArray.push(order);
                localStorage.setItem("order", JSON.stringify(tempArray));
                window.location.href = "order.html";
                localStorage.removeItem("checkoutItem");
                localStorage.removeItem("checkout");
            } else {
                const orderArray = JSON.parse(localStorage.getItem("order"));
                orderArray.push(order);
                localStorage.setItem("order", JSON.stringify(orderArray));
                window.location.href = "order.html";
                localStorage.removeItem("checkoutItem");
                localStorage.removeItem("checkout");
            }
        }
    });
}
payment();

function generateID(length) {
    const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString.toUpperCase();
}
