<template>
    <div>
        <draggable
                v-if="todos.length"
                class="list-group"
                tag="ul"
                v-model="todos"
                v-bind="dragOptions"
                @start="isDragging = true"
                @end="isDragging = false"
        >
            <transition-group type="transition" name="flip-list">
                <li
                    class="list-group-item"
                    :class="{
                        'checked': element.isDone,
                    }"
                    v-for="element in todos"
                    :key="element.id"
                >
                    <div class="list-item-wrapper" v-if="!isEditing(element)">
                        <span class="task-name">
                            {{ element.title }}
                        </span>
                        <div class="button-group">
                            <a-button type="primary" icon="edit" @click="toggleEdit(element)" v-if="!element.isDone"/>
                            <a-button type="primary" icon="check" @click="onComplete(element)" v-if="!element.isDone"/>
                            <a-button type="danger" icon="delete" @click="onDelete(element.id)"/>
                        </div>
                    </div>
                    <div class="list-item-wrapper" v-else>
                        <div style="width: 85%;">
                            <a-input v-model="currentTodo.title" />
                        </div>
                        <div class="button-group">
                            <a-button type="danger" icon="close" @click="cancelEdit"/>
                            <a-button type="primary" :disabled="!currentTodo.title.trim().length" icon="check" @click="onEdit"/>
                        </div>
                    </div>
                </li>
            </transition-group>
        </draggable>
        <h4 v-else>
            Нет задач...
        </h4>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    import ACTIONS from "@/store/ACTIONS";
    export default {
        components: {
            draggable
        },
        data: () => ({
            editing: false,
            currentTodo: null,
        }),
        methods: {
            cancelEdit() {
                this.currentTodo = null;
                this.editing = false;
            },
            toggleEdit(todo) {
                this.currentTodo = {...todo};
                this.editing = true;
            },
            onEdit() {
                this.todos = this.currentTodo;
                this.editing = false;
            },
            onDelete(id) {
                this.$store.dispatch(ACTIONS.DELETE_TODO, id);
            },
            onComplete(todo) {
                this.todos = { ...todo, isDone: true };
            },
            isEditing({ id }) {
                return this.editing && this.currentTodo.id === id;
            }
        },
        computed: {
            todos: {
                get() {
                    return this.$store.state.todos.todos;
                },
                set(value) {
                    this.$store.dispatch(ACTIONS.EDIT_TODO, value);
                }
            },
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                };
            }
        }
    }
</script>

<style scoped>
    .button {
        margin-top: 35px;
    }
    .flip-list-move {
        transition: transform 0.5s;
    }
    .no-move {
        transition: transform 0s;
    }
    .ghost {
        opacity: 0.5;
        background: #c8ebfb;
    }
    .list-group {
        margin: 0;
        padding: 0;
        min-height: 20px;
        list-style: none;
    }
    .list-group-item {
        cursor: move;
        padding: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    .list-group-item.checked {
        background-color: aquamarine;
    }

    .list-group-item.checked .task-name {
        text-decoration: line-through;
    }

    .list-item-wrapper {
        display: flex;
        justify-content: space-between;
    }

    .button-group {
        display: flex;
        gap: 8px;
    }
</style>
