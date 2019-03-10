import Vue from 'vue';

const component = {
    props: ['value'],
    template: `
        <div>
            <input type="text" @input="handleInput" :value="value"/>
        </div>
    `,
    methods: {
        handleInput(e) {
            this.$emit('input', e.target.value);
        }
    }
};

// 或者是value这个值要绑定其他的值那么i
const component2 = {
    // 自定义vmodel的一些名称
    model: {
        prop: 'hehe',
        event: 'change1'
    },
    props: ['hehe'],
    template: `
        <div>
            <input type="text" @input="handleInput" :value="hehe" />
        </div>
    `,
    methods: {
        handleInput(e) {
            this.$emit('change1', e.target.value);
        }
    }
};

new Vue({
    components: {
        CompOne: component,
        CompTwo: component2
    },
    el: '#root',
    data() {
        return {
            value: '1'
        };
    },
    template: `
        <div>
            <comp-one :value="value" @input="value = arguments[0]"></comp-one>
            <comp-two v-model="value"></comp-two>
            <span>{{value}}</span>
        </div>
    `,
    methods: {
        // handleInput(value) {
        //     this.value = value;
        // }
    }
});

// v-model="value" 等于在使用的组件上加了一个 :value="value" 和 @input="value = argument[0]"
// 所以实现一个v-model最简单的方式就是在子组件内 指定一个props 和在指定的时候用 $emit 方法把指定的值传出去
// 使用场景, 有可能要实现一个功能强大的编辑器, 编辑器里面肯定有input框, 还要扩展一些功能, 就会用到v-model
