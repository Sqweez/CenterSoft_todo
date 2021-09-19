import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { Button, Card, Input, Form, Divider} from 'ant-design-vue';

Vue.component(Button.name, Button);
Vue.component(Card.name, Card);
Vue.component(Input.name, Input);
Vue.component(Form.name, Form);
Vue.component(Form.Item.name, Form.Item);
Vue.component(Divider.name, Divider);


Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
