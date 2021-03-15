import { createApp } from 'vue';
import router from './router';

// Aplicación
import App from './App.vue';

// Estilos de la aplicación
import './design/main.scss';

const app = createApp(App);
app.use(router);
app.mount('#app');
