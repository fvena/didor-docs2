import { createApp } from 'vue';
import router from './router';
import FileService from '@/services/File.service';

// Aplicación
import App from './App.vue';

// Estilos de la aplicación
import './design/main.scss';

// Inicializo el servicio API
//
// Crea una instancia de Axios con la configuración base del entorno seleccionado
FileService.init();

const app = createApp(App);
app.use(router);
app.mount('#app');
