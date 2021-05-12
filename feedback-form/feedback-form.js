'use strict';

class FeedbackForm {
    constructor(selector) {
        this.form = document.querySelector(selector);
        this.patterns = {
            text: /^[a-zа-яё]+$/i,
            tel: /\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}/,
            email: /[a-z.-]{1,20}@[a-z]{2,20}\.[a-zа-я]{2,8}/
        };
        this.errorsMsg = {
            text: 'Имя должно содержать только буквы',
            tel: 'Телефон должен иметь вид +7(000)000-0000',
            email: 'E-mail должен иметь вид mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru.'
        }
        this._init();
    }

    _validateField(value, type) {
        return this.patterns[type].test(value);
    }

    _setError(type) {
        const errorInput = this.form.querySelector(`input[type="${type}"]`);
        errorInput.insertAdjacentHTML('beforebegin', `<span class="error-msg">${this.errorsMsg[type]}</span>`)
        errorInput.classList.add('error');
    }

    _removeError() {
        this.form.querySelectorAll('.error-msg').forEach(error => {
            error.remove();
        });
        this.form.querySelectorAll('input').forEach(input => {
            if (input.classList.contains('error')) {
                input.classList.remove('error');
            }
        });
    }

    _init() {
        this.form.addEventListener('submit', event => {
            for (let key in this.patterns) {
                const field = this.form.querySelector(`input[type=${key}]`);
                if (!this._validateField(field.value, field.attributes.type.value)) {
                    event.preventDefault();
                }
            }
        });

        this.form.querySelectorAll('input').forEach(field => {
            field.addEventListener('input', event => {
                this._removeError();
                if (!this._validateField(event.target.value, event.target.attributes.type.value)) {
                    this._setError(event.target.attributes.type.value);
                }
            });
        });
    }
}

new FeedbackForm('.feedback-form');