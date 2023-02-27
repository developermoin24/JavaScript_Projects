let passwordLength = document.querySelector('[data-lengthNumber]');
let slider = document.querySelector('[data-lengthSlider]');
let checkBtn = document.querySelectorAll('.check input');
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
let generateButton = document.querySelector('.generateButton');
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
passwordLength.innerHTML = 10;
let checkCount = 0;
slider.style.backgroundSize = "50% 100%";
let symbols = "/^[!@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?]*$/";
setIndicator("#ccc");

function handleSlider(event){
  let  sliderCurValue = event.target.value;
  passwordLength.innerHTML = sliderCurValue;
  slider.style.backgroundSize = (sliderCurValue*5) + "% 100%";
}
function randomInt(min, max){
    let randomInt = Math.floor(Math.random()*(max-min) + min);
    return randomInt;
}
function randomUpperCase(){
    let randomUpperCase = String.fromCharCode(randomInt(65, 91));
    return randomUpperCase;
}
function randomLowerCase(){
    let randomLowerCase = String.fromCharCode(randomInt(97, 123));
    return randomLowerCase;
}
function randomNumber(){
    let randomNumber = randomInt(0, 9);
    return randomNumber;
}
function randomSymbol(){
    let randomSymbolIndex = randomInt(0, symbols.length);
    return symbols[randomSymbolIndex];
}
function handleChecks(){
    checkCount = 0;
    checkBtn.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })
    if(passwordLength.innerHTML < checkCount ) {
        passwordLength.innerHTML = checkCount;
        handleSlider();
    }

}
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})
function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);

}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength.innerHTML >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength.innerHTML >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
checkBtn.forEach(element => {
    element.addEventListener('click' , handleChecks);
});
slider.addEventListener('input', handleSlider);
generateButton.addEventListener('click', function(){
    if(checkCount==0)
    return;
    
    if(passwordLength.innerHTML < checkCount) {
        passwordLength.innerHTML = checkCount;
        handleSlider();
    }

    password = "";

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(randomUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(randomLowerCase);

    if(numbersCheck.checked)
        funcArr.push(randomNumber);

    if(symbolsCheck.checked)
        funcArr.push(randomSymbol);

    let randomAraayPick = funcArr.length;

    for(let i=0; i<passwordLength.innerHTML; i++){
        let randomIndex = randomInt(0, randomAraayPick);
        password += funcArr[randomIndex]();
    }
    passwordDisplay.value = password;
    calcStrength();
})

