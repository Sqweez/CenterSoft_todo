<template>
    <div class="wrapper">
        <a-card title="Todo App" class="card">
            <TodoList />
            <a-divider />
            <TodoForm />
        </a-card>
    </div>
</template>

<script>
    import TodoList from "@/components/todos/TodoList";
    import TodoForm from "@/components/todos/TodoForm";
    export default {
        components: {
            TodoList, TodoForm
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        width: 100%;
        height: 100vh;
        background-color: #C2BBF0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .card {
        width: 900px;
    }
</style>
