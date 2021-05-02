'use strict';

Vue.component('filter-form', {
    props: ['filter'],
    template: `<form @submit.prevent="$root.filterGoods" action="#" class="search-form">
                   <input v-model="$root.filter" type="search" id="search" class="search-form__input">
                   <button class="search-form__btn fas fa-search"></button>
               </form>`
});
