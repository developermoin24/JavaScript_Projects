const overlay = document.querySelector(".overlay");
function openModal(){
    let modal = document.querySelector('.modal');
    modal.style.cssText = "transform:scale(1)";
    overlay.classList.add("overlayactive");
}
function closeModal(){
    let modal = document.querySelector('.modal');
    modal.style.cssText = "transform:scale(0)";
    overlay.classList.remove("overlayactive");
}