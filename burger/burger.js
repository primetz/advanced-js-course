'use strict';

class Burger {
    constructor(selector) {
        this.form = document.querySelector(selector);
        this.priceList = [];
        this.caloriesList = [];
        this.init()

    }

    init() {
        this.form.querySelector('button').addEventListener('click', () => {
            this.priceList = [];
            this.caloriesList = [];
            this.form.querySelectorAll('input:checked').forEach(item => {
                this.priceList.push(item.dataset.price);
                this.caloriesList.push(item.dataset.calories);
            });
            this.getSum(this.priceList, '#price');
            this.getSum(this.caloriesList, '#calories');
        });
    }

    getSum(list, selector) {
        this.form.querySelector(selector).textContent = list.reduce((sum, item) => {
            return sum + +item;
        }, 0);
    }
}

const burger = new Burger('.form-burger');
