'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductsList {
    constructor(goodsContainer = '.products') {
        this.goodsContainer = goodsContainer;
        this.goods = [];
        this._getProducts('catalogData.json')
            .then(data => {
                this.goods = data;
                this.render(this.goodsContainer, this.goods, ProductItem, 'https://via.placeholder.com//200x150');
            });
    }

    _getProducts(products) {
        return fetch(`${API}/${products}`)
            .then(result => result.json())
            .catch(error => console.log(error));
    }

    render(container, arr, item, img) {
        const block = document.querySelector(container);
        for (let product of arr) {
            const productObj = new item(product, img);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    getSum(list) {
        return list.reduce((sum, product) => sum + product.price * product.quantity, 0);
    }
}

class Cart extends ProductsList {
    constructor(goodsContainer, basketContainer = '.cart-menu') {
        super(goodsContainer);
        this.basketContainer = basketContainer;
        this.basket = [];
        this._getProducts('getBasket.json')
            .then(data => {
                this.basket = data.contents;
                this.render(this.basketContainer, this.basket, CartItem, 'https://via.placeholder.com//70x70');
            });
        this._init();
    }

    _addProduct(id) {
        const find = this.basket.find(product => product.id_product === +id);
        if (find) {
            find.quantity++;
            this._updateCart(find);
        } else {
            const product = this.goods.find(product => product.id_product === +id);
            product.quantity = 1;
            this.render(this.basketContainer, [product], CartItem, 'https://via.placeholder.com//70x70');
            this.basket.push(product);
        }
    }

    _removeProduct(id) {
        const find = this.basket.find(product => product.id_product === +id);
        if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
        } else {
            document.querySelector(`.cart-item[data-id="${id}"]`).remove();
            this.basket.splice(this.basket.indexOf(find), 1);
        }
    }

    _updateCart(product) {
        const block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.cart-item__quantity').textContent = `${product.quantity}`;
        block.querySelector('.cart-item__price').textContent = `${product.price * product.quantity}`;
    }

    _init() {
        const goods = document.querySelector(this.goodsContainer);
        goods.addEventListener('click', event => {
            if (event.target.classList.contains('buy-btn')) {
                this._addProduct(event.target.parentNode.dataset.id);
            }
        });

        const basket = document.querySelector(this.basketContainer);
        basket.addEventListener('click', event => {
            if (event.target.classList.contains('remove-btn')) {
                this._removeProduct(event.target.parentNode.dataset.id);
            }
        });

        const basketShow = document.querySelector('.btn-cart');
        basketShow.addEventListener('click', event => {
            event.target.classList.toggle('active');
        });
    }
}

class ProductItem {
    constructor(product, img) {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <img src="${this.img}" class="product-item__photo" alt="Some img">
                    <h3 class="product-item__title">${this.title}</h3>
                    <p class="product-item__price">${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`;
    }
}

class CartItem extends ProductItem {
    constructor(product, img) {
        super(product, img);
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="cart-item" data-id="${this.id}">
                    <img src="${this.img}" class="cart-item__img" alt="Some img">
                    <h3 class="cart-item__title">${this.title}</h3>
                    <span class="cart-item__quantity">${this.quantity}</span>
                    <p class="cart-item__price">${this.price}</p>
                    <button class="remove-btn">&times;</button>
                </div>`;
    }
}

const cart = new Cart();
