import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

import VxeUITable from 'vxe-table';
import 'vxe-table/lib/style.css';

createApp(App).use(VxeUITable).mount('#app');