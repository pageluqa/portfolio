// Cargar datos desde data.json
let allProjects = [];
let allSkills = [];

async function loadData() {
    try {
        const response = await fetch('data/data.json');
        const data = await response.json();
        allProjects = data.projects;
        allSkills = data.skills;
        
        renderProjects(allProjects);
        renderSkills(allSkills);
    } catch (error) {
        console.error('Error cargando datos:', error);
    }
}

function renderProjects(projects) {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = '';

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <span class="project-category">${project.category}</span>
                <p class="project-participants">${project.participants}</p>
                <p class="project-date">${project.date}</p>
            </div>
        `;

        card.addEventListener('click', () => openModal(project));
        grid.appendChild(card);
    });
}

function renderSkills(skills) {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';

    skills.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        
        let starsHTML = '';
        for (let i = 0; i < 5; i++) {
            starsHTML += `<span class="star ${i < skill.level ? '' : 'empty'}">★</span>`;
        }

        card.innerHTML = `
            <h3>${skill.name}</h3>
            <p>${skill.description}</p>
            <div class="stars">${starsHTML}</div>
        `;

        container.appendChild(card);
    });
}

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', loadData);
