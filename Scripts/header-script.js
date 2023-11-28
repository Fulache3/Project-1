//OBJECTS
const header = {
    lowerHeader: document.querySelector(".lower-header"),
    icons: document.querySelector(".clickable-icons"),
    searchBar: document.querySelector(".search-bar"),
    searchBtn: document.querySelector(".search-btn"),
    searchBtnClose: document.querySelector(".search-bar-close"),
    headerComp: document.querySelector(".content-header"),
    texts: document.querySelector(".clickable-text"),
};

//FUNCTIONS

//Show and remove lower header
window.addEventListener("scroll", function () {
    if (window.scrollY > 150) {
        header.lowerHeader.classList.add("opacity-0");
    } else if (window.scrollY === 0) {
        header.lowerHeader.classList.remove("opacity-0");
    }
});
//Search bar function
searchHeader(header.searchBtn, header.searchBtnClose);
function searchHeader(btn, btnClose) {
    btn.addEventListener("click", function () {
        header.icons.classList.add("hidden");
        header.searchBar.classList.remove("hidden");
        header.searchBar.classList.add("flex");
        header.headerComp.classList.remove("px-20");
        header.headerComp.classList.add("px-10");
        header.texts.classList.remove("lg:flex");
        header.texts.classList.add("lg:hidden");
    });
    btnClose.addEventListener("click", function () {
        header.icons.classList.remove("hidden");
        header.icons.classList.add("flex");
        header.searchBar.classList.remove("flex");
        header.searchBar.classList.add("hidden");
        header.headerComp.classList.remove("px-10");
        header.headerComp.classList.add("px-20");
        header.texts.classList.remove("lg:hidden");
        header.texts.classList.add("lg:flex");
    });
}

