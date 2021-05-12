'use strict';

Vue.component('error', {
    props: ['message', 'error'],
    template: `<div v-show="error" class="error">
                   <error-message :error-message="message"></error-message>
                   <button @click="error=!error" class="error__close">&times;</button>
               </div>`
});

Vue.component('error-message', {
    props: ['errorMessage'],
    template: `<span class="error__message">{{ errorMessage }}</span>`
});
