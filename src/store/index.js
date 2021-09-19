import Vue from 'vue'
import Vuex from 'vuex'
import todos from "./modules/todos";
import localStoragePlugin from "./plugins/localStoragePlugin";
Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [localStoragePlugin],
  modules: {
    todos: {
      ...todos,
    }
  }
})
