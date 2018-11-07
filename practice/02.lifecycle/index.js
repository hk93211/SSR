import Vue from 'vue';

new Vue({
    el: '#root',
    template: '<div>{{text}}</div>',
    data: {
        text: 1
    },
    beforeCreate() {
        console.log('beforeCreate', this);
        console.log(this.$el); // undefined
    },
    created() {
        console.log('created', this);
        console.log(this.$el); // undefined
    },
    beforeMount() { // 服务端渲染是没有的
        console.log('beforeMount', this);
        console.log(this.$el); // <div id="root"></div>
    },
    mounted() { // 服务端渲染是没有的
        // 将组件挂载到对应的dom节点完成的生命周期, 指定了 el 或者 调用 $mount 方法时才会执行
        console.log('mounted', this);
        console.log(this.$el); // <div>1</div>
    },
    beforeUpdate() {
        console.log('beforeUpdate', this);
    },
    updated() {
        console.log('updated', this);
    },
    activated() {
        console.log('activated', this);
    },
    deactivated() {
        console.log('deactivated', this);
    },
    beforeDestroy() {
        console.log('beforeDestroy', this);
    },
    destroyed() {
        console.log('destroyed', this);
    },
    render(h) {
        // 会将 template 解析成 render 方法, .vue 文件是vue-loader帮我们处理<template></template>标签
        console.log('render function');
        throw new TypeError('render error');
        // return h('div', {}, this.text);
    },
    renderError(h, error) {
        // 不会向上冒泡, 只会捕获当前组件的render 错误
        return h('div', {}, error.stack);
    },
    errorCaptured() {
        // 会向上冒泡, 子组件的报错会在父组件捕获, 除非子组件手动设置停止事件冒泡
    }
});

// setInterval(() => {
//     app.text += 1;
// }, 1000);

// app.destroy();
