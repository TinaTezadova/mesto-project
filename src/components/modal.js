const popups = document.querySelectorAll('.popup');
export function closePopup(popup) {
    popup.classList.remove('popup_open');
};

export function openPopup(popup) {
    popup.classList.add('popup_open');
};

export function saveEditForm(event, params) {
    event.preventDefault();
    params.userNameFromProfile.textContent = params.userNameFromPopup.value;
    params.userFieldOfActivityFromProfile.textContent = params.userFieldOfActivityFromPopup.value;
    closePopup(params.editProfilePopup)
};

export const enableClosePopup = () => {
    popups.forEach((popup) => popup.addEventListener('click', () => closePopup(popup)));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            popups.forEach((popup) => closePopup(popup))
        }
    });
}