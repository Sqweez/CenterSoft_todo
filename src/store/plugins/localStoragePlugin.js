import MUTATIONS from "../MUTATIONS";

export default function localStoragePlugin(store) {
    store.subscribe((mutation, state) => {
        if (mutation.type.includes('todos') && mutation.type !== MUTATIONS.TODO_INIT) {
            localStorage.setItem('todos', JSON.stringify(state.todos.todos));
            return;
        }
    })
}
