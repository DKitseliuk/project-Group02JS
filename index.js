import{a,A as l}from"./assets/vendor-D2PysMrw.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const d={"Всі товари":"all-furniture","М'які меблі":"upholstered-furniture","Шафи та системи зберігання":"wardrobes-storage","Ліжка та матраци":"beds-mattresses",Столи:"tables","Стільці та табурети":"chairs-stools",Кухні:"kitchens","Меблі для дитячої":"kids-furniture","Меблі для офісу":"office-furniture","Меблі для передпокою":"hallway-furniture","Меблі для ванної кімнати":"bathroom-furniture","Садові та вуличні меблі":"outdoor-garden-furniture","Декор та аксесуари":"decor-accessories"},f=document.querySelector(".category-list"),g=document.querySelector(".furniture-list"),p=document.querySelector(".load-more-button");p.addEventListener("click",h);document.addEventListener("DOMContentLoaded",m);async function m(){try{const t=await y(),o=await b();L(t),A(o.furnitures)}catch(t){console.log(t.message)}}async function y(){const{data:t}=await a.get("https://furniture-store-v2.b.goit.study/api/categories");return t}async function b(t=1){const{data:o}=await a.get("https://furniture-store-v2.b.goit.study/api/furnitures",{params:{page:1,limit:8}});return o}async function h(){}function L(t){const n=[{_id:"all",name:"Всі товари"},...t].map(({_id:i,name:e})=>`
            <li class="category-item" data-category-id="${i}" data-category-type="${d[e]||"unknown"}">
                <p class="category-name">${e}</p>
            </li>
        `).join("");f.insertAdjacentHTML("beforeend",n)}function A(t){const o=t.map(({_id:n,images:i,name:e,color:r,price:s})=>{const c=r.map(u=>`<li class="furniture-color" style="background-color: ${u};"></li>`).join("");return`
    <li class="furniture-item" data-category-id="${n}">
    <img class="furniture-image" src="${i[0]}" alt="${e}"/>
    <div class="furniture-info">
      <h3 class="furniture-name">${e}</h3>
      <ul class="furniture-colors">
      ${c}
      </ul>
      <p class="furniture-price">${s} грн</p>
    </div>
    <button class="furniture-button" type="button">Детальніше</button>
    </li>`}).join("");g.insertAdjacentHTML("beforeend",o)}function C(){const t={duration:350,showMultiple:!1,elementClass:"accordion-item",triggerClass:"accordion-trigger",panelClass:"accordion-panel",activeClass:"accordion-active"};return new l(".accordion-list",t)}function v(){C()}document.addEventListener("DOMContentLoaded",v);
//# sourceMappingURL=index.js.map
