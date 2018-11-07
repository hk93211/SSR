import Vue from 'vue';

new Vue({
    el: '#root',
    template: `
        <div>
            {{isActive ? 'active' : 'not active'}}
            <br />
            {{html}}
            <br />
            <p v-html="html"></p>
        </div>
    `,
    data: {
        isActive: false,
        html: `<span>123</span>`
    }
});
