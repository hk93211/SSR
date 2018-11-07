import Vue from 'vue';

// 具名插槽
const component1 = {
    template: `
        <div :style="style">
            <div class="header">
                <slot name="header"></slot>
            </div>
            <div class="body">
                <slot name="body"></slot>
            </div>
        </div>
    `,
    data() {
        return {
            style: {
                overflow: 'hidden',
                display: 'inline-block',
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            }
        };
    }
};

// 作用域插槽
const component2 = {
    template: `
        <div :style="style">
            <div class="header">
                <slot value="123" text="aaa"></slot>
            </div>
        </div>
    `,
    data() {
        return {
            style: {
                overflow: 'hidden',
                display: 'inline-block',
                width: '200px',
                height: '200px',
                border: '1px solid #aaa'
            }
        };
    }
};

new Vue({
    components: {
        CompOne: component1,
        CompTwo: component2
    },
    el: '#root',
    data() {
        return {
            value: '123'
        };
    },
    template: `
        <div>
            <comp-two>
                <span slot-scope="propObj">{{propObj.value}} {{propObj.text}}</span>
            </comp-two>
            <comp-one>
                <span slot="header">aaa</span>
                <span slot="body">headerbbb</span>
            </comp-one>
            
        </div>
    `
});
