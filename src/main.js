import { createApp } from 'vue';
import router from './router';
import FileService from '@/services/File.service';
import HideOnScroll from '@/directives/HideOnScroll.directive';

// Aplicación
import App from './App.vue';

// Componentes
// import Alarm from '@/components/Alarm';
import Animation from '@/components/Animation';
import Codegroup from '@/components/Codegroup';
// import Collapse from '@/components/Collapse';
// import Copy from '@/components/Copy';
// import Embed from '@/components/Embed';
import FileTree from '@/components/FileTree';
import KBD from '@/components/KBD';
// import Tabs from '@/components/Tabs';
// import Tab from '@/components/Tabs/Tab.vue';
import SvgIcon from '@/components/SvgIcon';

// Estilos de la aplicación
import './design/main.scss';
import './assets/icons';

// Inicializo el servicio API
//
// Crea una instancia de Axios con la configuración base del entorno seleccionado
FileService.init();

const app = createApp(App);
app.use(router);
app.use(SvgIcon, {
  tagName: 'dd-icon',
  classPrefix: 'dd-',
  isStroke: true,
});
app.directive('hideOnScroll', HideOnScroll);
// app.component('Alarm', Alarm);
app.component('Animation', Animation);
app.component('Codegroup', Codegroup);
// app.component('Collapse', Collapse);
app.component('FileTree', FileTree);
app.component('DDKBD', KBD);
// app.component('Copy', Copy);
// app.component('Embed', Embed);
// app.component('Tabs', Tabs);
// app.component('Tab', Tab);
// app.component('SvgIcon', SvgIcon)
app.mount('#app');
