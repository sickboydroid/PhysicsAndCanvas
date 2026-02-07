import"./modulepreload-polyfill-B5Qt9EMX.js";const i=[{name:"Balls and Collisions",dirName:"balls-and-collisions",description:"A collision detecting and resolver",image:"../assets/balls-and-collisions.png"}],s=document.getElementById("project-grid");c(i);function c(e){e.forEach(n=>{const a=r(n);s.appendChild(a)})}function r(e){const n=document.createElement("a");n.className="card",n.href=`../projects/${e.dirName}/index.html`;const a=e.image?`<img src="${e.image}" alt="${e.name}" class="card-image" loading="lazy" />`:'<div class="card-image" style="background: linear-gradient(45deg, #1e293b, #0f172a); display:flex; align-items:center; justify-content:center; color:#334155;">No Preview</div>';return n.innerHTML=`
    ${a}
    <div class="card-content">
      <h2>${e.name}</h2>
      <p>${e.description}</p>
      <span class="card-link">Launch Experiment</span>
    </div>
  `,n}
