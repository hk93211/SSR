import Vue from 'vue';

const component = {
    template: `<div>this is component
    <input v-model="text" />
    <p v-show="active">this is show</p>
    </div>`,
    props: {
        active: Boolean,
        propOne: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            text: 1
        };
    }
};

const CompVue = Vue.extend(component);

new CompVue({
    el: '#root',
    props: {
        propOne: String
    },
    data() {
        return {
            text: '123'
        };
    }
});

// 新写的data会覆盖原来的, mounted等生命周期方法不是覆盖, 而是合并

// 可以在子组件修改$parent的内容, 但是强烈不推荐这样做, 因为子组件多的时候, 根本不知道是那个子组件修改的
