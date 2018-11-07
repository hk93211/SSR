import Vue from 'vue';

new Vue({
    el: '#root',
    template: `
        <div>{{fullName}}
            <input v-model="firstName" />
        </div>
    `,
    data: {
        firstName: 'H',
        lastName: 'K',
        fullName: ''
    },
    computed: {
        // fullName: {
        //     get() {
        //         console.log('fullName');
        //         return this.firstName + this.lastName;
        //     },
        //     set(name) { // 不推荐computed的设值, 因为computed本来就是将多个数据组合在一起而来的, 组合数据要给他拆开了再重新赋值, 容易出错, 可能导致computed重复计算, 无限循环
        //         const names = name.split(' ');
        //         this.firstName = names[0];
        //         this.lastName = names[1];
        //     }
        // }
    },
    watch: {
        // firstName(newValue, oldValue) { // 此中watch写法不会再组件初始化的时候执行一次, 要在初始化的时候执行一次, 请看下面一种写法
        //     this.fullName = newValue + this.lastName;
        // },
        firstName: {
            handler(newValue, oldValue) {
                this.fullName = newValue + this.lastName;
            },
            immediate: true, // 组件初始化的时候执行一次该 watch 的 handler
            deep: true // 深度监听
        }
    }
});

// computed 对应可以在 methods 里面去创建一个方法, 在模板中调用这个方法, 得到的结果是一样的, 但是使用 computed 会有一个缓存的机制, 组件重新 render 了也不会重新计算, methods 是一定要重新调用的了
// 那什么时候 computed 才会重新计算呢 ? 只有计算属性中依赖的对应的值变化了才会重新计算了

// 显示默写数据的时候用computed

// 监听某个数据变化, 然后给后台发请求的时候用watch

// 注意: 千万不要在computed和watch里面修改传入的值, 有可能导致无限循环的watch
