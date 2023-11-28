
//OBJECTS
const login = {
    page: document.querySelector(".login-page"),
    btn: document.querySelector(".login-btn"),
    section: document.querySelector(".login-section"),
    btnClose: document.querySelector(".close-login-sec-btn"),
    password: document.querySelector(".password-login"),
    email: document.querySelector(".email-login"),
    passVisibility: document.querySelector(".pass-visibility"),
    signupLink: document.querySelector(".signup-link"),
};
const signup = {
    page: document.querySelector(".signup-page"),
    email: document.querySelector(".email-signup"),
    btnClose: document.querySelector(".close-signup-sec-btn"),
    password: document.querySelector(".password-signup"),
    reEnterPass: document.querySelector(".re-enter-password-signup"),
    passVisibility: document.querySelector(".pass-signup-visibility"),
    rePassVisibility: document.querySelector(
        ".re-enter-pass-signup-visibility"
    ),
    loginLink: document.querySelector(".login-link"),
};

//FUNCTIONS

//Login Section function show and hide
loginFunction(
    login.btn,
    login.btnClose,
    login.passVisibility,
    login.signupLink
);
function loginFunction(btn, closeBtn, passVisibility, link) {
    btn.addEventListener("click", function () {
        if (login.section.classList.contains("hidden")) {
            login.section.classList.remove("hidden");
            login.section.classList.add("flex");
        }
    });
    closeBtn.addEventListener("click", function () {
        if (login.section.classList.contains("flex")) {
            login.section.classList.remove("flex");
            login.section.classList.add("hidden");
            login.password.setAttribute("type", "password");
            passVisibility.setAttribute("src", "Images/visible.png");
            login.password.value = "";
            login.email.value = "";
        }
    });
    passVisibility.addEventListener("click", function () {
        if (login.password.getAttribute("type") === "password") {
            login.password.setAttribute("type", "text");
            passVisibility.setAttribute("src", "Images/hidden.png");
        } else if (login.password.getAttribute("type") === "text") {
            login.password.setAttribute("type", "password");
            passVisibility.setAttribute("src", "Images/visible.png");
        }
    });
    link.addEventListener("click", function () {
        login.page.classList.remove("flex");
        login.page.classList.add("hidden");
        signup.page.classList.remove("hidden");
        signup.page.classList.add("flex");
        login.password.value = "";
        login.email.value = "";
    });
}

signupFunction(
    signup.btnClose,
    signup.loginLink,
    signup.passVisibility,
    signup.rePassVisibility
);
function signupFunction(closeBtn, link, passVisibility, rePassVisibility) {
    link.addEventListener("click", function () {
        signup.page.classList.remove("flex");
        signup.page.classList.add("hidden");
        login.page.classList.remove("hidden");
        login.page.classList.add("flex");
        signup.password.value = "";
        signup.email.value = "";
        signup.reEnterPass.value = "";
    });
    passVisibility.addEventListener("click", function () {
        if (signup.password.getAttribute("type") === "password") {
            signup.password.setAttribute("type", "text");
            passVisibility.setAttribute("src", "Images/hidden.png");
        } else if (signup.password.getAttribute("type") === "text") {
            signup.password.setAttribute("type", "password");
            passVisibility.setAttribute("src", "Images/visible.png");
        }
    });
    rePassVisibility.addEventListener("click", function () {
        if (signup.reEnterPass.getAttribute("type") === "password") {
            signup.reEnterPass.setAttribute("type", "text");
            rePassVisibility.setAttribute("src", "Images/hidden.png");
        } else if (signup.reEnterPass.getAttribute("type") === "text") {
            signup.reEnterPass.setAttribute("type", "password");
            rePassVisibility.setAttribute("src", "Images/visible.png");
        }
    });
    closeBtn.addEventListener("click", function () {
        if (login.section.classList.contains("flex")) {
            login.section.classList.remove("flex");
            login.section.classList.add("hidden");
            signup.password.setAttribute("type", "password");
            signup.reEnterPass.setAttribute("type", "password");
            passVisibility.setAttribute("src", "Images/visible.png");
            rePassVisibility.setAttribute("src", "Images/visible.png");
            signup.password.value = "";
            signup.reEnterPass.value = "";
            signup.email.value = "";
            signup.page.classList.remove("flex");
            signup.page.classList.add("hidden");
            login.page.classList.remove("hidden");
            login.page.classList.add("flex");
        }
    });
}
