<template>
    <div id="app">
        <div id="cover"></div>
        <Header />
        <!-- <Todo /> -->
        <h1>{{fullName}} {{count}}</h1>
        <button @click="updateFirstName('Li')">update first name</button>
        <button @click="handleUpdateCount">update count</button>

        <router-link to="/app/123">app</router-link>
        <router-link to="/login">login</router-link>
        <router-link to="/login/exact">login/exact</router-link>
        <transition name="fade">
            <router-view />
        </transition>
        <Footer />
    </div>
</template>

<script>
import Header from './layout/header.vue';
// import Todo from './views/todo/todo.vue';
import Footer from './layout/footer.jsx';
import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
} from 'vuex';

export default {
    components: {
        Header,
        // Todo,
        Footer
    },
    data() {
        return {
            cityAry: [],
            search: '',
            cityNameArray: []
        };
    },
    computed: {
        // ...mapState(['count']),
        // ...mapState({
        // count: 'count'
        // }),
        ...mapState({
            count: (state) => state.count
        }),
        ...mapGetters(['fullName']),
        cityName() {
            return this.cityNameArray.map(item => {
                return item.area_name;
            });
        }
        // count() { // 使用vuex提供的 mapState 方法更简便
        //     return this.$store.state.count;
        // },
        // fullName() { // 使用vuex提供的 mapGetters 方法更简便
        //     return this.$store.getters.fullName;
        // }
    },
    methods: {
        ...mapActions(['updateCountAsync']),
        ...mapMutations(['updateCount', 'updateFirstName']),
        handleUpdateCount() {
            const count = this.count;
            return this.updateCount(count + 1);
        }
    },
    mounted() {
        this.updateCountAsync({
            num: 4
        });
    }
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
