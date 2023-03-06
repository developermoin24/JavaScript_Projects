let devWrapper = document.querySelector(".dev-wrapper");
let formWrapper = document.querySelector(".form-wrapper");
let formContainerInput = document.querySelector(".form-container input");
let profileWrapper = document.querySelector(".profile-wrapper");
let nameJoinFirstp = document.querySelector(".name-join p:first-of-type");
let nameJoinLastp = document.querySelector(".name-join p:last-of-type");
let descriptionPara = document.querySelector(".description p");
let followingWrapper = document.querySelector(".following-wrapper");
let detailsFirstP = document.querySelectorAll(".details p:first-of-type");
let links = document.querySelector(".links");
let modeChangeBtn = document.querySelector(".mode-change");
let lightMode = document.querySelector(".light-mode");
let darkMode = document.querySelector(".dark-mode");
let SearchBtn = document.querySelector(".form-wrapper button");
let profileImg = document.querySelector(".profile-img img");
let titleAnchor = document.querySelector(".title a");
let dataRepos = document.querySelector("[data-repos]");
let dataFollwers = document.querySelector("[data-follwers]");
let dataFollwing = document.querySelector("[data-follwing]");
let dataAddress = document.querySelector("[data-address]");
let dataEmail = document.querySelector("[data-email]");
let dataTwitter = document.querySelector("[data-twitter]");
let dataCompany = document.querySelector("[data-company]");
let errorConatinter = document.querySelector(".error-conatinter");

lightMode.classList.add("active");

function modeCahnge(){
    if(!lightMode.classList.contains("active")){
        darkMode.classList.remove("active");
        lightMode.classList.add("active");
    }else{
        darkMode.classList.add("active");
        lightMode.classList.remove("active");
    }
    document.body.classList.toggle("dark");
    darkMode.classList.add("dark");
    devWrapper.classList.toggle("dark");
    formWrapper.classList.toggle("dark");
    formContainerInput.classList.toggle("dark");
    profileWrapper.classList.toggle("dark");
    nameJoinFirstp.classList.toggle("dark");
    nameJoinLastp.classList.toggle("dark");
    descriptionPara.classList.toggle("dark");
    followingWrapper.classList.toggle("dark");
    links.classList.toggle("dark");
    for(let detailsPara of detailsFirstP){
        detailsPara.classList.toggle("dark");
    }
}

function showUserData(data){
    let curdate = new Date(data.created_at);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let creYear = curdate.getFullYear();
    let creMonth = months[curdate.getMonth()];
    let creDate = curdate.getDate(); 
    profileWrapper.classList.add("active");
    profileImg.src = data.avatar_url;
    nameJoinFirstp.textContent = data.name;
    nameJoinLastp.textContent = `Joined ${creDate} ${creMonth} ${creYear}`;
    titleAnchor.textContent = data.login;
    titleAnchor.href = data.html_url;
    descriptionPara.textContent = data.bio;
    dataRepos.textContent = data.public_repos;
    dataFollwers.textContent = data.followers;
    dataFollwing.textContent = data.following;
    if(data.location==null){dataAddress.textContent="not_available"}else{dataAddress.textContent = data.location;}
    if(data.email==null){dataEmail.textContent="not_available"}else{dataEmail.textContent = data.email;}
    if(data.twitter_username==null){dataTwitter.textContent="not_available"}else{dataTwitter.textContent = data.twitter_username;}
    if(data.company==null){dataCompany.textContent="not_available"}else{dataCompany.textContent = data.company;}
    if(data.message=="Not Found"){errorHandle()}
}

function errorHandle(){
    profileWrapper.classList.remove("active");
    errorConatinter.classList.add("active");
}

async function getUserData(username){
   try{
    errorConatinter.classList.remove("active");
    let response = await fetch(`https://api.github.com/users/${username}`);
    let data = await response.json();
    showUserData(data);
   }
   catch(error){
    errorHandle();
   }
}

function getInput(){
    let username = formContainerInput.value;
    getUserData(username);
}

modeChangeBtn.addEventListener('click',modeCahnge);
SearchBtn.addEventListener('click',getInput);
formContainerInput.addEventListener('change', getInput);





