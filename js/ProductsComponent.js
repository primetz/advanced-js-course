'use strict';

Vue.component('products',{
    props: ['products', 'img'],
    template: `<div class="products">
                   <product v-for="product in products" :key="product.id_product" :img="img" :product="product"></product>
               </div>`
});

Vue.component('product',{
    props: ['product', 'img'],
    template: `<div class="product-item">
                   <img :src="img" class="product-item__photo" alt="Some img">
                   <h3 class="product-item__title">{{ product.product_name }}</h3>
                   <p class="product-item__price">{{ product.price }}</p>
                   <button @click="$parent.$emit('add-product', product)" class="buy-btn">Купить</button>
               </div>`
});
