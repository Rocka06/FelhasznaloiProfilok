const modal = document.getElementById('modal');
const modalForm = document.getElementById('newProfile-form');

function openModal() {
    modal.classList.add('modal-open');
}

function closeModal() {
    modal.classList.remove('modal-open');
    modalForm.reset()
    
}