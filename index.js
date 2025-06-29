import{a as P,S as $,i as l}from"./assets/vendor-D8_O3--j.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const v="https://pixabay.com/api/",B="50853437-9ef5a88e343e45432612d628f";async function g(r,t=1){return(await P.get(v,{params:{key:B,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}})).data}const c=document.querySelector(".button-more");let u=null;function E(r){return r.map(({id:t,webformatURL:n,largeImageURL:i,tags:e,likes:o,views:a,comments:q,downloads:x})=>`
    <li class="list-item" data-id="${t}">
      <a href="${i}">
        <img class="image" src="${n}" alt="${e}" width="360" />
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
    `).join("")}function y(r){document.querySelector(".gallery").insertAdjacentHTML("beforeend",E(r)),u?u.refresh():u=new $(".gallery a",{captionsData:"alt",captionDelay:250})}function O(){const r=document.querySelector(".gallery");r.innerHTML=""}const b=document.querySelector(".loader");function L(){b.style.display="block"}function w(){b.style.display="none"}function M(){c.classList.remove("hiddenbtn")}function d(){c.classList.add("hiddenbtn")}function f(){c.disabled=!1}function R(){c.disabled=!0}const p=document.querySelector(".form"),H=document.querySelector(".button-more");let m="",s=1;const S=15;let h=0;p.addEventListener("submit",A);H.addEventListener("click",D);async function A(r){r.preventDefault();const t=p.elements["search-text"].value.trim();if(m=t,s=1,t===""){l.warning({message:"Введіть назву зображення!",position:"topRight"});return}O(),d(),L();try{const n=await g(m,s),i=n.hits;h=n.totalHits;const e=Math.ceil(h/S);i.length===0?l.info({message:"Зображень не знайдено.",position:"topRight"}):(y(i),s<e?(M(),f()):d())}catch(n){l.error({message:"Сталася помилка при запиті!",position:"topRight"}),console.error("Error:",n)}finally{w()}p.reset()}async function D(){s+=1,L(),R();try{const t=(await g(m,s)).hits;y(t);const n=Math.ceil(h/S);s<n?(f(),M()):(d(),l.info({message:"Усі результати завантажено.",position:"bottomCenter",timeout:3e3}));const i=document.querySelector(".list-item");if(i){const e=i.getBoundingClientRect().height;window.scrollBy({left:0,top:e*2,behavior:"smooth"})}}catch{l.error({message:"Помилка при завантаженні додаткових зображень",position:"topRight"}),f()}finally{w()}}
//# sourceMappingURL=index.js.map
