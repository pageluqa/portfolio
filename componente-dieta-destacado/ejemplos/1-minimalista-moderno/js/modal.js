// Modal functionality
const modal = document.getElementById('modal');
const closeBtn = document.querySelector('.close');

function openModal(project) {
    document.getElementById('modalImg').src = project.image;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalParticipants').textContent = `👥 Participantes: ${project.participants}`;
    document.getElementById('modalDate').textContent = `📅 Fecha: ${project.date}`;
    document.getElementById('modalCategory').textContent = `🏷️ Categoría: ${project.category}`;
    modal.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
