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
        goods: [],
        basket: [],
        filter: ''
    },
    methods: {
        getJson(url) {
            return fetch(`${this.api.responses + url}`)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        addProduct(product) {
            this.getJson(this.api.addToBasket)
                .then(data => {
                    if (data.result === 1) {
                        const find = this.basket.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            const basketProduct = {
                                id_product: product.id_product,
                                product_name: product.product_name,
                                price: product.price,
                                quantity: 1
                            };
                            this.basket.push(basketProduct);
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
            if (this.filter) {
                this.getJson(this.api.catalogData)
                    .then(data => {
                        this.goods = data.filter(product => regExp.test(product.product_name));
                    });
            } else {
                this.getJson(this.api.catalogData)
                    .then(data => {
                        this.goods = data;
                    })
            }
        }
    },
    mounted() {
        this.getJson(this.api.catalogData)
            .then(data => {
                for (let el of data) {
                    this.goods.push(el);
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
