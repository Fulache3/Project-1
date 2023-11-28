//OBJECTS
const ScreenSM = {
    btn: document.querySelector(".menu-btn"),
    btnClose: document.querySelector(".close-menu-btn"),
    menu: document.querySelector(".menu-sm-screen"),
};
const smallMenu = {
    login: document.querySelector(".sm-menu-login"),
    shop: document.querySelector(".sm-menu-shop"),
    collections: document.querySelector(".sm-menu-collections"),
    about: document.querySelector(".sm-menu-about"),
    contacts: document.querySelector(".sm-menu-contacts"),
};

//FUNCTIONS

//Small screen size menu
smallScreen(ScreenSM.btn, ScreenSM.btnClose, ScreenSM.menu);

function smallScreen(btn, closeBtn, menu) {
    btn.addEventListener("click", function () {
        menu.classList.remove("hidden");
        menu.classList.add("flex");
    });
    closeBtn.addEventListener("click", function () {
        menu.classList.remove("flex");
        menu.classList.add("hidden");
    });
}
//Small screen menu function
smMenuFunction(smallMenu.login);

function smMenuFunction(loginBTN) {
    loginBTN.addEventListener("click", function () {
        if (login.section.classList.contains("hidden")) {
            login.section.classList.remove("hidden");
            login.section.classList.add("flex");
        }
    });
}
