import{a as P,S as $,i as l}from"./assets/vendor-D8_O3--j.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const v="https://pixabay.com/api/",E="50853437-9ef5a88e343e45432612d628f";async function h(s,t=1){return(await P.get(v,{params:{key:E,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const g=document.querySelector(".button-more");let d=null;function O(s){return s.map(({id:t,webformatURL:r,largeImageURL:i,tags:e,likes:o,views:a,comments:q,downloads:x})=>`
    <li class="list-item" data-id="${t}">
      <a href="${i}">
        <img class="image" src="${r}" alt="${e}" width="360" />
      </a>
      <ul class="info">
        <li>
          <h3>Likes</h3>
          <p class="info-text">${o}</p>
        </li>
        <li>
          <h3>Views</h3>
          <p class="info-text">${a}</p>
        </li>
        <li>
          <h3>Comments</h3>
          <p class="info-text">${q}</p>
        </li>
        <li>
          <h3>Downloads</h3>
          <p class="info-text">${x}</p>
        </li>
      </ul>
    </li>
    `).join("")}function y(s){document.querySelector(".gallery").insertAdjacentHTML("beforeend",O(s)),d?d.refresh():d=new $(".gallery a",{captionsData:"alt",captionDelay:250})}const b=document.querySelector(".loader");function L(){b.style.display="block"}function w(){b.style.display="none"}function S(){g.classList.remove("hiddenbtn")}function u(){g.classList.add("hiddenbtn")}const f=document.querySelector(".form"),R=document.querySelector(".gallery"),c=document.querySelector(".button-more");let p="",n=1;const M=15;let m=0;f.addEventListener("submit",B);c.addEventListener("click",H);async function B(s){s.preventDefault();const t=f.elements["search-text"].value.trim();if(p=t,n=1,t===""){l.warning({message:"Введіть назву зображення!",position:"topRight"});return}R.innerHTML="",u(),L();try{const r=await h(p,n),i=r.hits;m=r.totalHits;const e=Math.ceil(m/M);i.length===0?l.info({message:"Зображень не знайдено.",position:"topRight"}):(y(i),n<e?(S(),c.disabled=!1):u())}catch(r){l.error({message:"Сталася помилка при запиті!",position:"topRight"}),console.error("Error:",r)}finally{w()}f.reset()}async function H(){n+=1,L(),c.disabled=!0;try{const t=(await h(p,n)).hits;y(t);const r=Math.ceil(m/M);n<r?(c.disabled=!1,S()):(u(),l.info({message:"Усі результати завантажено.",position:"bottomCenter",timeout:3e3}));const i=document.querySelector(".list-item");if(i){const e=i.getBoundingClientRect().height;window.scrollBy({left:0,top:e*2,behavior:"smooth"})}}catch{l.error({message:"Помилка при завантаженні додаткових зображень",position:"topRight"}),c.disabled=!1}finally{w()}}
//# sourceMappingURL=index.js.map
