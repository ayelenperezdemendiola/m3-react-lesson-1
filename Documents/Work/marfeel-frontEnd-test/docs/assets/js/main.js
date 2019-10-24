"use strict";const userCard=document.querySelector(".user--card"),userReposContainer=document.querySelector(".user--repos"),filter=document.querySelector(".filter--field"),searchButton=document.querySelector(".filter--button"),logoContainer=document.querySelector(".logo"),userContainer=document.querySelector(".user--container");function createNewElement(e,t,n){const r=document.createElement(e);r.classList.add(t);const s=document.createTextNode(n);return r.appendChild(s),userCard.appendChild(r),r}function createNewReposElement(e,t,n){const r=document.createElement(e);r.classList.add(t);const s=document.createTextNode(n);return r.appendChild(s),userReposContainer.appendChild(r),r}function cleanCard(){userCard.innerHTML="",logoContainer.innerHTML="",userReposContainer.innerHTML=""}function createUserElements(e,t){logoContainer.innerHTML='<i class="fab fa-github-square"></i>',createNewElement("p","user--userName",`@${t}`),createNewElement("h1","user--fullName",e||"Name not defined"),createNewElement("p","user--description","This is the bio...")}function createReposElements(e){createNewReposElement("ul","user--repos__list","");for(let t=1;t<e.length;t++){document.querySelector(".user--repos__list").innerHTML+=`<li class="repos__list--item"> \n                <a class ="repos__list--link" href=${e[t].html_url}>Repo ${t}</a>\n                    <ul class="list--puntuation">\n                        <li class="item--puntuation">\n                            <i class="fas fa-star"></i>\n                            ${e[t].stargazers_count}\n                            <i class="fas fa-code-branch"></i>\n                             ${e[t].forks_count}\n                            </li>\n                        </ul>            \n             </li>`}}function getUserData(){const e=filter.value;return fetch("https://api.github.com/users/"+e).then(e=>e.json())}function getGitHubData(){getUserData().then(e=>{if(cleanCard(),"Not Found"!==e.message){createUserElements(e.name,e.login);const t=e.repos_url;return fetch(t)}userCard.innerHTML='<div class="add--container"><p class="add--notFound">Does not exist</p></div>'}).then(e=>e.json()).then(e=>{createNewReposElement("h3","repos--title","Repositories"),0===e.length?createNewElement("p","add--notFound","No repositories found"):createReposElements(e)})}searchButton.addEventListener("click",getGitHubData);