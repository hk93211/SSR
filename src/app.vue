<template>
    <div id="app">
        <div id="cover"></div>
        <Header />
        <Todo />
        <Footer />
    </div>
</template>

<script>
import Header from './todo/header.vue';
import Todo from './todo/todo.vue';
import Footer from './todo/footer.jsx';

export default {
    components: {
        Header,
        Todo,
        Footer
    },
    data() {
        return {
            cityAry: [],
            search: '',
            cityNameArray: []
        }
    },
    computed: {
        cityName() {
            return this.cityNameArray.map(item => {
                return item.area_name;
            })
        }
    },
};
</script>

<style lang="less" scoped>
#app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    #cover {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: #999;
        opacity: 0.9;
        z-index: -1;
    }
}
</style>
