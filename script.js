// Рендеринг контента при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // 1. ОБЪЯВЛЯЕМ ВСЕ НУЖНЫЕ ПЕРЕМЕННЫЕ
    const form = document.getElementById('feedback-form');
    const statusEl = document.getElementById('form-status');

    // Мобильное меню
    const burgerBtn = document.getElementById('burger-btn');
    const mainNav = document.getElementById('main-nav');

    if (burgerBtn && mainNav) {
        burgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('header__nav--active');
        });
    }

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.header__nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav) mainNav.classList.remove('header__nav--active');
        });
    });

    //Функция показа ошибки
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('form__error--visible');
        }
    }

    //Функция очистки всех ошибок
    function clearFormErrors() {
        document.querySelectorAll('.form__error').forEach(error => {
            error.textContent = '';
            error.classList.remove('form__error--visible');
        });
        if (statusEl) {
            statusEl.textContent = '';
            statusEl.style.display = 'none';
            statusEl.style.color = '';
        }
    }

    // Обработчик отправки формы
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();
            clearFormErrors();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            if (name.length < 2) {
                showError('name', 'Введите имя (минимум 2 символа)');
                isValid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showError('email', 'Введите корректный email');
                isValid = false;
            }

            if (message.length < 10) {
                showError('message', 'Сообщение должно содержать минимум 10 символов');
                isValid = false;
            }

            if (isValid) {
                statusEl.textContent = 'Отправка...';
                statusEl.style.display = 'block';
                statusEl.style.color = '#aaa';

                try {
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: new FormData(form),
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        statusEl.textContent = 'Сообщение успешно отправлено! Мы свяжемся с вами.';
                        statusEl.style.color = '#10b981';
                        form.reset();
                        setTimeout(() => {
                            statusEl.textContent = '';
                            statusEl.style.display = 'none';
                        }, 3000);
                    } else {
                        const data = await response.json();
                        if (data.errors) {
                            statusEl.textContent = 'Ошибка: ' + data.errors.map(e => e.message).join(', ');
                        } else {
                            statusEl.textContent = 'Ошибка при отправке. Попробуйте позже.';
                        }
                        statusEl.style.color = '#ef4444';
                    }
                } catch (error) {
                    console.error('Ошибка сети:', error);
                    statusEl.textContent = 'Ошибка сети. Проверьте подключение к интернету.';
                    statusEl.style.color = '#ef4444';
                }
            }
        });
    }
});
