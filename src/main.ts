interface Project {
  name: string;
  dirName: string;
  description: string;
  image?: string;
}

/**
 * Ensure the 'dirName' matches the folder name in ./projects/
 */
const projects: Project[] = [
  {
    name: "Balls and Collisions",
    dirName: "balls-and-collisions",
    description: "A collision detecting and resolver",
    image: "../assets/balls-and-collisions.png",
  },
];

const gridContainer = document.getElementById("project-grid");

renderProjects(projects);

function renderProjects(data: Project[]) {
  data.forEach((project) => {
    const card = createProjectCard(project);
    gridContainer!.appendChild(card);
  });
}

function createProjectCard(project: Project): HTMLElement {
  const cardLink = document.createElement("a");
  cardLink.className = "card";
  cardLink.href = `/projects/${project.dirName}/index.html`;

  // Use a fallback gradient if no image is provided
  const imageHTML = project.image
    ? `<img src="${project.image}" alt="${project.name}" class="card-image" loading="lazy" />`
    : `<div class="card-image" style="background: linear-gradient(45deg, #1e293b, #0f172a); display:flex; align-items:center; justify-content:center; color:#334155;">No Preview</div>`;

  cardLink.innerHTML = `
    ${imageHTML}
    <div class="card-content">
      <h2>${project.name}</h2>
      <p>${project.description}</p>
      <span class="card-link">Launch Experiment</span>
    </div>
  `;

  return cardLink;
}
