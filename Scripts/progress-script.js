const orderID = document.querySelector(".order-id");
const expectedArrival = document.querySelector(".expected-arrival");
const progressBar = document.querySelector(".progress-bar");
const zero = document.querySelector(".zero-percent");
const three5 = document.querySelector(".three-5");
const six5 = document.querySelector(".six-5");
const hundred = document.querySelector(".hundred");
const zeroCheck = document.querySelector(".zero-check");
const threeCheck = document.querySelector(".three-check");
const sixCheck = document.querySelector(".six-check");
const hundredCheck = document.querySelector(".hundred-check");
main();
function main() {
    progress();
    itemDisplay();
}

function orderAccessStorage() {
    let orderArray = [];
    const orderData = localStorage.getItem("order");
    if (orderData === null) {
        alert("You did not ordered yet");
    } else {
        let orderData1 = localStorage.getItem("order");
        orderArray = JSON.parse(orderData1);
    }
    return orderArray;
}

function progress() {
    const getID = localStorage.getItem("orderID");
    const orderArray = orderAccessStorage();
    for (let i = 0; i < orderArray.length; i++) {
        if (orderArray[i].id === getID) {
            orderID.textContent = `# ${orderArray[i].id}`;
            expectedArrival.textContent = `${orderArray[i].arrival}`;
            let arrival = orderArray[i].arrival;
            let currentDate = getCurrentDate(0);
            let days = calculateDateDifference(currentDate, arrival);
            if (days === 4) {
                zero.classList.remove("bg-gray-600");
                zero.classList.add(
                    "bg-gradient-to-r",
                    "from-yellow-600",
                    "to-gray-400"
                );
                zeroCheck.classList.remove("hidden");
                progressBar.style.width = "0%";
            } else if (days === 3) {
                zero.classList.remove("bg-gray-600");
                zero.classList.add(
                    "bg-gradient-to-r",
                    "from-yellow-600",
                    "to-gray-400"
                );
                three5.classList.add(
                    "bg-gradient-to-r",
                    "from-yellow-600",
                    "to-gray-400"
                );
                zeroCheck.classList.remove("hidden");
                threeCheck.classList.remove("hidden");
                progressBar.style.width = "35%";
            } else if (days === 2) {
                zero.classList.remove("bg-gray-600");
                zero.classList.add(
                    "bg-gradient-to-r",
                    "from-yellow-600",
                    "to-gray-400"
                );
                three5.classList.add(
                    "bg-gradient-to-r",
                    "from-yellow-600",
                    "to-gray-400"
                );
                six5.classList.add(
                    "bg-gradient-to-r",
                    "from-yellow-600",
                    "to-gray-400"
                );
                zeroCheck.classList.remove("hidden");
                threeCheck.classList.remove("hidden");
                sixCheck.classList.remove("hidden");
                progressBar.style.width = "67%";
            } else if (days === 1) {
                zero.classList.remove("bg-gray-600");
                zero.classList.add(
                    "bg-gradient-to-r",
                    "from-yellow-600",
                    "to-gray-400"
                );
                three5.classList.add(
                    "bg-gradient-to-r",
                    "from-yellow-600",
                    "to-gray-400"
                );
                six5.classList.add(
                    "bg-gradient-to-r",
                    "from-yellow-600",
                    "to-gray-400"
                );
                hundred.classList.add(
                    "bg-gradient-to-r",
                    "from-yellow-600",
                    "to-gray-400"
                );
                zeroCheck.classList.remove("hidden");
                threeCheck.classList.remove("hidden");
                sixCheck.classList.remove("hidden");
                hundredCheck.classList.remove("hidden");
                progressBar.style.width = "100%";
            }
        }
    }
}

function calculateDateDifference(dateString1, dateString2) {
    let [day1, month1, year1] = dateString1.split("/");
    let [day2, month2, year2] = dateString2.split("/");

    let date1 = new Date(`${month1}/${day1}/${year1}`);
    let date2 = new Date(`${month2}/${day2}/${year2}`);

    let timeDifference = date2.getTime() - date1.getTime();

    let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
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

function itemDisplay(){
    const itemContainer = document.querySelector('.progress-item-container');
    let temp = "";
    const getID = localStorage.getItem("orderID");
    const orderArray = orderAccessStorage();
    for(let i = 0;i<orderArray.length;i++){
        if(orderArray[i].id === getID){
            let parsedItem = JSON.parse(orderArray[i].item);
            for(let j = 0;j<parsedItem.length;j++){
                temp += `<img class = "w-36 h-36" src = "${parsedItem[j].imgSource}">`;
                
            }

        }
    }
    itemContainer.innerHTML = temp;
}