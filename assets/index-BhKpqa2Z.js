(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const c=[{name:"Balls and Collisions",dirName:"balls-and-collisions",description:"A collision detecting and resolver",image:"../assets/balls-and-collisions.png"}],a=document.getElementById("project-grid");l(c);function l(n){n.forEach(t=>{const i=d(t);a.appendChild(i)})}function d(n){const t=document.createElement("a");t.className="card",t.href=`/projects/${n.dirName}/index.html`;const i=n.image?`<img src="${n.image}" alt="${n.name}" class="card-image" loading="lazy" />`:'<div class="card-image" style="background: linear-gradient(45deg, #1e293b, #0f172a); display:flex; align-items:center; justify-content:center; color:#334155;">No Preview</div>';return t.innerHTML=`
    ${i}
    <div class="card-content">
      <h2>${n.name}</h2>
      <p>${n.description}</p>
      <span class="card-link">Launch Experiment</span>
    </div>
  `,t}
