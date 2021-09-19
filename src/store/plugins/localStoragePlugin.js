import MUTATIONS from "../MUTATIONS";
import STORAGE_KEYS from "@/common/enums/STORAGE_KEYS";

export default function localStoragePlugin(store) {
    store.subscribe((mutation, state) => {
        if (mutation.type.includes(STORAGE_KEYS.TODOS) && mutation.type !== MUTATIONS.TODO_INIT) {
            localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(state.todos.todos));
            return;
        }
    })
}
