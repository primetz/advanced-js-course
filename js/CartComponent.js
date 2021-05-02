'use strict';

Vue.component('cart', {
    props: ['products', 'img', "showCart"],
    template: `<div class="cart">
                   <button @click="$root.showCart=!$root.showCart" class="btn-cart" type="button">Корзина</button>
                   <div v-show="showCart" class="cart-menu">
                       <span v-show="!products.length" class="no-data">Нет данных</span>
                       <cart-item v-for="product in products" :key="product.id_product" :img="img" :product="product"></cart-item>
                   </div>
               </div>`
});

Vue.component('cart-item', {
    props: ['product', 'img'],
    template: `<div class="cart-item">
                   <img :src="img" class="cart-item__img" alt="Some img">
                   <h3 class="cart-item__title">{{ product.product_name }}</h3>
                   <span class="cart-item__quantity">{{ product.quantity }}</span>
                   <p class="cart-item__price">{{ product.price * product.quantity }}</p>
                   <button @click="$parent.$emit('remove-product', product)" class="remove-btn">&times;</button>
               </div>`
});
