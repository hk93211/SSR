<template>
    <section class="real-app">
        <input 
            type="text" 
            class="add-input"
            autofocus="true"
            placeholder="接下来干什么?"
            @keydown.enter="addTodo">

        <Item 
            @deleteTodo="deleteTodo" 
            v-for="todo in filteredTodos"
            :todo="todo"
            :key="todo.id" />

        <Tabs 
            :filter="filter"
            :todos="todos"
            @toggle="toggelFilter"
            @clearAllCompleted="clearAllCompleted" />
    </section>
</template>

<script>
import Item from './item.vue';
import Tabs from './tabs.vue';

export default {
    components: {
        Item,
        Tabs
    },
    data() {
        return {
            todos: [
                {
                    id: '1',
                    content: '吃饭',
                    completed: false
                },
                {
                    id: '2',
                    content: '睡觉',
                    completed: false
                },
                {
                    id: '3',
                    content: '打豆豆',
                    completed: true
                }
            ],
            filter: 'all'
        };
    },
    computed: {
        filteredTodos() {
            if (this.filter === 'all') return this.todos;
            const completed = this.filter === 'completed';
            return this.todos.filter(item => completed === item.completed);
        }
    },
    methods: {
        randomStr() {
            return new Date().getTime().toString();
        },
        addTodo(e) {
            this.todos.unshift({
                id: this.randomStr(),
                content: e.target.value.trim(),
                completed: false
            });
            e.target.value = '';
        },
        deleteTodo(id) {
            this.todos = this.todos.filter(item => item.id !== id);
        },
        toggelFilter(state) {
            this.filter = state;
        },
        clearAllCompleted() {
            this.todos = this.todos.filter(item => !item.completed);
        }
    }
};
</script>

<style lang="less" scoped>
.real-app {
    width: 600px;
    margin: 0 auto;
    box-shadow: 0 0 5px #666;

  .add-input {
    position: relative;
    margin: 0;
    width: 100%;
    font-size: 24px;
    font-family: inherit;
    font-weight: inherit;
    line-height: 1.4em;
    border: 0;
    outline: none;
    color: inherit;
    padding: 6px;
    border: 1px solid #999;
    box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
}
</style>
