// Функция для создания HTML-элемента карточки (DOM)
function createCardElement(data) {
    const card = document.createElement('div');
    card.classList.add('card');

    const title = document.createElement('h3');
    title.classList.add('card__title');
    title.textContent = data.title;

    const text = document.createElement('p');
    text.classList.add('card__text');
    text.textContent = data.text;

    card.appendChild(title);
    card.appendChild(text);

    return card;
}

// Рендеринг контента при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const ridersContainer = document.getElementById('riders-container');
    const teamsContainer = document.getElementById('teams-container');

    // Мобильное меню
    const burgerBtn = document.getElementById('burger-btn');
    const mainNav = document.getElementById('main-nav');

    burgerBtn.addEventListener('click', () => {
        mainNav.classList.toggle('header__nav--active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.header__nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('header__nav--active');
        });
    });

    //форма обратной связи
    const form = document.getElementById('feedback-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращаем стандартную отправку

        // Сброс предыдущих ошибок
        document.querySelectorAll('.form__error').forEach(err => {
            err.textContent = '';
            err.classList.remove('form__error--visible');
        });
        formStatus.textContent = '';

        let isValid = true;

        // Получение значений
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Валидация имени
        if (nameInput.value.trim().length < 2) {
            showError('name-error', '[Текст ошибки: введите корректное имя]');
            isValid = false;
        }

        // Валидация Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError('email-error', '[Текст ошибки: введите корректный email]');
            isValid = false;
        }

        // Валидация сообщения 
        if (messageInput.value.trim().length < 10) {
            showError('message-error', '[Текст ошибки: сообщение слишком короткое]');
            isValid = false;
        }

        // Если все валидно
        if (isValid) {
            // Имитация отправки данных на сервер
            formStatus.textContent = '[Сообщение: Данные успешно отправлены!]';
            formStatus.style.color = 'green';
            form.reset(); // Очистка формы

            // Очистка сообщения об успехе через 3 секунды
            setTimeout(() => {
                formStatus.textContent = '';
            }, 3000);
        }
    });

    // Вспомогательная функция для показа ошибок
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.classList.add('form__error--visible');
    }
});