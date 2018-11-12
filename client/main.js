import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';

import './assets/styles/global.less';
import createRouter from './config/router';

const router = createRouter();

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
    router,
    render: h => h(App)
});
