const header = document.querySelector(".site-header");

document.addEventListener("wheel", function(e) { 
    if (e.wheelDelta < 0) {
        header.classList.add("hide");
        header.classList.remove("show");
    }
    else {
        header.classList.add("show");
        header.classList.remove("hide");
    }
});