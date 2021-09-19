<template>
    <div id="app">
       <TodoApp />
    </div>
</template>

<script>
    import TodoApp from "./views/TodoApp";
    import ACTIONS from "./store/ACTIONS";

    export default {
        components: {
            TodoApp
        },
        data: () => ({}),
        mounted() {
            this.$store.dispatch(ACTIONS.TODO_INIT)
        }
    }
</script>

<style lang="scss">

</style>
