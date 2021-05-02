'use strict';

const app = new Vue({
    el: '#app',
    data: {
        api: {
            responses: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/',
            catalogData: 'catalogData.json',
            getBasket: 'getBasket.json',
            addToBasket: 'addToBasket.json',
            deleteFromBasket: 'deleteFromBasket.json'
        },
        imgCatalog: 'https://via.placeholder.com//200x150',
        imgBasket: 'https://via.placeholder.com//70x70',
        showCart: false,
        error: false,
        errorMessage: 'Не удалось выполнить запрос к серверу',
        goods: [],
        basket: [],
        filtered: [],
        filter: ''
    },
    methods: {
        getJson(url) {
            return fetch(`${this.api.responses + url}`)
                .then(result => {
                    return result.json();
                })
                .catch(error => {
                    this.$data.error = true;
                });
        },
        addProduct(product) {
            this.getJson(this.api.addToBasket)
                .then(data => {
                    if (data.result === 1) {
                        const find = this.basket.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            this.basket.push(Object.assign({quantity: 1}, product));
                        }
                    } else {
                        alert('Error');
                    }
                });
        },
        removeProduct(product) {
            this.getJson(this.api.deleteFromBasket)
                .then(data => {
                    if (data.result === 1) {
                        const find = this.basket.find(el => el.id_product === product.id_product);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.basket.splice(this.basket.indexOf(find), 1);
                        }
                    } else {
                        alert('Error');
                    }
                });
        },
        filterGoods() {
            const regExp = new RegExp(this.filter, 'i');
            this.goods = this.filtered.filter(product => regExp.test(product.product_name));
        }
    },
    mounted() {
        this.getJson(this.api.catalogData)
            .then(data => {
                for (let el of data) {
                    this.goods.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(this.api.getBasket)
            .then(data => {
                for (let el of data.contents) {
                    this.basket.push(el);
                }
            });
    }
});
