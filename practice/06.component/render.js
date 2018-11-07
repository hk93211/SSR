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
            <slot value="123" text="aaa"></slot>
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
    },
    render(createElement) {
        return createElement(
            'div',
            {
                style: this.style
            },
            this.$slots.header
        );
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
    // template: `
    //     <div>
    //         <comp-one>
    //             <span slot="header">aaa</span>
    //             <span slot="body">headerbbb</span>
    //         </comp-one>
    //         <comp-two>
    //             <span slot-scope="propObj">{{propObj.value}} {{propObj.text}}</span>
    //         </comp-two>
    //     </div>
    // `,
    render(createElement) {
        return createElement(
            'div',
            {},
            [
                createElement(
                    'comp-one',
                    {},
                    [
                        createElement(
                            'span',
                            {
                                slot: 'header'
                            },
                            'aaa'
                        ),
                        createElement(
                            'span',
                            {
                                slot: 'body'
                            },
                            this.value
                        )
                    ]
                ),
                createElement(
                    'comp-two',
                    {},
                    [
                        createElement(
                            'span',
                            {
                                scopedSlots: 'propObj'
                            },
                            [this.value, this.text]
                        )
                    ]
                )
            ]
        );
    }
});

// template 只是一个字符串, 是怎么转化成html里面的节点的呢?
