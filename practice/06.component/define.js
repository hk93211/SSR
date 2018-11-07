import Vue from 'vue';

const component = {
    template: `<div>this is component
    <p v-show="active">this is show</p>
    </div>`,
    props: {
        active: {
            type: Boolean,
            required: true
        },
        // active: Boolean,
        propOne: String
    }
};

Vue.component('CompOne', component); // 组件相当于类, 所以组件名建议大写

new Vue({
    el: '#root',
    template: `<comp-one :active="true"></comp-one>`
});

// vue 组件使用驼峰或者中划线的写法都是可以的, 官方推荐是用驼峰的写法

// 主要不要在组件内改动props的内容(虽然可以修改成功), 官网推荐要改可以定义在data中

// props的属性的default值如果是一个对象的话, 也要使用function的写法return出一个对象, 不然也会像data值一样, 如果两个地方用了这个组件, 两个地方的default会同时变动

// 也可以是用validator方法更严格的校验传入的props, 该方法接受一个参数是传入的参数
