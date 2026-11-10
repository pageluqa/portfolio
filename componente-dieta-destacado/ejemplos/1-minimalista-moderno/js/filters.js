// Sistema de filtrado
let currentPersonFilter = 'all';
let currentCategoryFilter = '';

const filterButtons = document.querySelectorAll('.filter-btn');
const categorySelect = document.getElementById('category-filter');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentPersonFilter = btn.dataset.filter;
        applyFilters();
    });
});

categorySelect.addEventListener('change', (e) => {
    currentCategoryFilter = e.target.value;
    applyFilters();
});

function applyFilters() {
    let filtered = allProjects;

    // Filtro por persona
    if (currentPersonFilter !== 'all') {
        filtered = filtered.filter(project => {
            if (currentPersonFilter === 'ambos') {
                return project.participants.includes('Ambos');
            } else {
                return project.participants.includes(currentPersonFilter);
            }
        });
    }

    // Filtro por categoría
    if (currentCategoryFilter) {
        filtered = filtered.filter(project => 
            project.category.toLowerCase() === currentCategoryFilter.toLowerCase()
        );
    }

    renderProjects(filtered);
}

// Busqueda de proyectos
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = allProjects.filter(project =>
            project.title.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm)
        );
        renderProjects(filtered);
    });
}
