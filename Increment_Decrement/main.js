let imgLinks = document.querySelectorAll(".more-img img");
let counter = document.querySelector('[data-counter]');
let minusBtn = document.querySelector('[data-minus="minus"]');
let plusBtn = document.querySelector('[data-plus]');
let errorShow = document.querySelector('#error');
let pieceShow = document.querySelector('#piece');
let afterDiscountPrice = document.querySelector('#after-discount-price');
let actualPrice = document.querySelector('#actual-price');
counter.innerHTML = 1;
let mainImg = document.querySelector('.main-img img');
let handleImgBtn = (event) =>{
    let targetElem = event.target;
    for(let element of imgLinks){
        element.classList.remove('active');
    }
    targetElem.classList.add('active');
    mainImg.src = event.target.src;
    
}
imgLinks.forEach(imgBtn => imgBtn.addEventListener('click', handleImgBtn));
function calculatePrice(){
    pieceShow.innerHTML = counter.innerHTML;
    afterDiscountPrice.innerHTML = `₹${Math.floor((84/100)*(counter.innerHTML)*65)}`;
    actualPrice.innerHTML = `₹${(counter.innerHTML)*65}`;
}
minusBtn.addEventListener('click',function(){
    if(counter.innerHTML>1){
        counter.innerHTML--;
    }else{
        errorShow.innerHTML = "Can not reduce from 1"
        setTimeout(function(){
            errorShow.innerHTML = ""
        },2000);
    }
    calculatePrice()

})
plusBtn.addEventListener('click',function(){
    if(counter.innerHTML<15){
        counter.innerHTML++;
    }else{
        errorShow.innerHTML = "Can not buy above 15 together"
        setTimeout(function(){
            errorShow.innerHTML = ""
        },2000);
    }
    calculatePrice()
})

