import Vue from 'vue';

// app 即为 Vue 的实例
const app = new Vue({
    template: '<div>{{text}}</div>',
    data: {
        text: 0,
        obj: {}
    }
});

app.$mount('#root');

setInterval(() => {
    app.text += 1;
}, 1000);

console.log(app.$data); // {text: 0}
console.log(app.$props); // undefined
console.log(app.$el); // id 为 root 的 dom 节点
console.log(app.$options); // new Vue时传入的对象, 及一些默认的属性
// app.$options.render = h => {
//     return h('div', {}, 'new render function');
// }; 只有修改此挂载在$options会生效
console.log(app.$root === app); // true, $root 每个.vue文件都能访问, 都是根vue节点
console.log(app.$children); // 子组件  (数组)
console.log(app.$slots); // 插槽  {对象}
console.log(app.$scopedSlots); // 作用域插槽  {对象}
console.log(app.$refs); // 一个对模板里的节点的快速引用  {对象}
console.log(app.$isServer); // 判断是否是服务端渲染, 很少用  {布尔}

// 方法
// $watch, 也可以在组件的options里面传入, 好处是可以跟随组件自行销毁, 防止内存溢出, 下面这种绑定方法需要自行销毁
const unWatch = app.$watch('text', (newValue, oldValue) => {
    console.log(newValue + ' : ' + oldValue);
    if (newValue > 10) {
        unWatch(); // 注销 $watch 方法
    }
});

// $on
app.$on('test', (a, b) => {
    console.log('test emited' + a + b);
});

// $once:  只触发一次
app.$on('test', (a, b) => {
    console.log('test emited' + a + b);
});

// $emit
app.$emit('test', '1', '2');

// $forceUpdate:   强制组件重新渲染

// $set
app.$set(app.obj, 'a', '1');

// $delete
app.$delete(app.obj, 'a');

// $nextTick
