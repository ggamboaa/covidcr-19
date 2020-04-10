import Vue from 'vue';
import App from './App.vue';
import VueGraph from 'vue-graph';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import NoteWidget from 'vue-graph/src/widgets/note.js';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import LegendWidget from 'vue-graph/src/widgets/legends.js';
import GraphLine3D from 'vue-graph/src/components/line3d.js';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(IconsPlugin);

Vue.use(VueGraph);

Vue.component(GraphLine3D.name, GraphLine3D);

Vue.component(NoteWidget.name, NoteWidget);

Vue.component(LegendWidget.name, LegendWidget);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
