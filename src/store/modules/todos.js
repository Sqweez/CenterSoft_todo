import MUTATIONS from "../MUTATIONS";
import ACTIONS from "../ACTIONS";
import STORAGE_KEYS from "@/common/enums/STORAGE_KEYS";

export default {
    state: {
        todos: [],
    },
    getters: {
    },
    mutations: {
        [MUTATIONS.TODO_INIT] (state, todos) {
            state.todos = todos;
        },
        [MUTATIONS.ADD_TODO](state, todo) {
            state.todos = [todo, ...state.todos].map((item, key) => {
                return {
                    ...item,
                    order: key + 1
                }
            })
        },
        [MUTATIONS.DELETE_TODO](state, id) {
            state.todos = state.todos
                .filter(todo => todo.id !== id)
                .map((todo, key) => {
                    todo.order = key + 1;
                    return todo;
                });
        },
        [MUTATIONS.EDIT_TODO](state, payload) {
            if (typeof payload === 'object') {
                state.todos = state.todos.map((todo, idx, array) => {
                    if (todo.id === payload.id) {
                        payload.order = ((todo.isDone && payload.isDone) || !payload.isDone)
                            ? todo.order
                            : array[array.length - 1].order + 1;
                        todo = payload;
                    }
                    return todo;
                }).sort((a, b) => a.order - b.order);
            }
            if (Array.isArray(payload)) {
                state.todos = payload.map((todo, key) => {
                    return {
                        ...todo,
                        order: key + 1,
                    };
                })
            }
         }
    },
    actions: {
        [ACTIONS.TODO_INIT] ({commit}) {
            let localTodos = localStorage.getItem(STORAGE_KEYS.TODOS);
            let todos = localTodos ? JSON.parse(localTodos) : [];
            commit(MUTATIONS.TODO_INIT, todos);
        },
        [ACTIONS.ADD_TODO] ({commit, state}, todo) {
            if (todo.title.trim().length) {
                commit(MUTATIONS.ADD_TODO, {
                    ...todo,
                    isDone: false,
                    id: Date.now().toString(),
                });
            }
        },
        [ACTIONS.EDIT_TODO] ({commit}, payload) {
            commit(MUTATIONS.EDIT_TODO, payload);
        },
        [ACTIONS.DELETE_TODO] ({commit}, id) {
            commit(MUTATIONS.DELETE_TODO, id);
        }
    },
}
