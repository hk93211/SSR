import Router from 'vue-router';

import routes from './routes';

export default () => {
    return new Router({
        routes,
        mode: 'history',
        linkActiveClass: 'active-link', // 只要有这个路径, 就会加上
        linkExactActiveClass: 'exact-active-link', // 真正匹配, 完全匹配的时候才会加上这个class
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition;
            } else {
                return { x: 0, y: 0 };
            }
        },
        fallback: true // 当浏览器不支持history路由的形式的时候自动给我们转回hash路由的形式, false为不处理
        // parseQuery() {

        // },
        // stringifyQuery() {

        // }
    });
};
