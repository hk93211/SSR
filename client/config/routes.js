// import Todo from '../views/todo/todo.vue';
// import Login from '../views/login/login.vue';

export default [
    {
        path: '/',
        redirect: '/app'
    },
    {
        // path: '/app/:id',
        path: '/app',
        props: true, // 如果是true 的话, 会把:id参数当成props传入到Todo组件内部
        component: () => import('../views/todo/todo.vue'),
        name: 'app',
        meta: {
            title: 'this is app',
            description: 'adfadfaf'
        },
        // children: [
        //     {
        //         path: 'test',
        //         component: Login
        //     }
        // ]
        beforeEnter(to, from, next) {
            console.log('app router before enter');
            next(); // 一定要执行next方法, 不然进入这个钩子后不会往下执行了
        }
    },
    {
        path: '/login',
        component: () => import('../views/login/login.vue')
    },
    {
        path: '/login/exact',
        component: () => import('../views/login/login.vue')
    }
];
