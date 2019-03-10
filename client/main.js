import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import './assets/styles/global.less';
import createRouter from './config/router';
import createStore from './store/store';
Vue.use(Vuex);

const router = createRouter();
const store = createStore();

// vuex的watch方法, 第一个参数是一个Function, 第二个参数也是一个Function
// store.watch(state => state.count + 1, (newValue) => {
//     console.log('count watch: ', newValue);
// });

// vuex的订阅方法, 监听mutation
// store.subscribe((mutation, state) => {
//     console.log(mutation.type);
//     console.log(mutation.payload);
// });

// vuex的订阅方法, 监听action

store.subscribeAction((action, state) => {
    console.log(action.type);
    console.log(action.payload);
});

router.beforeEach((to, from, next) => {
    console.log('before each invoked');
    next();
});

router.beforeResolve((to, from, next) => {
    console.log('before resolve invoked');
    next();
});

router.afterEach((to, from) => {
    console.log('after each invoked');
});

Vue.use(VueRouter);

// eslint-disable-next-line no-new
new Vue({
    el: '#root',
    // template: '<div>this is content</div>', // 如果使用template, 会替换掉对应的 id 为 root 的标签
    store,
    router,
    render: h => h(App)
});
