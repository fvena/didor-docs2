import axios from 'axios';

const FileService = {
  init() {
    axios.interceptors.response.use(
      response => response,
      async error => {
        /*
         * Sin conexión a internet
         *
         * La petición no puede realizarse porque no hay conexión a internet
         * redirijo a la página de error
         */
        if (error.message === 'Network Error') {
          console.error('Network Error');
        }

        /*
         * Tiempo excedido
         *
         * La petición es abortada porque ha tardado más del tiempo definido en la variable 'timeout'
         */
        else if (error.code === 'ECONNABORTED') {
          console.error('ECONNABORTED');
        }

        /*
         * Backend no responde
         *
         * La petición no puede realizarse porque el backend no nos responde
         * redirijo a la página de error
         */
        else if (!error.response) {
          console.error('backendDown');
        }

        /*
         * Archivo no encontrado
         *
         * La petición no puede realizarse porque el archivo no se ha encontrado,
         */
        else if (error.response.status === 404) {
          return { data: '' };
        }
      }
    )
  },

  /**
   * Devuelve el contenido de un archivo
   *
   * @param {String} path - Ruta del archivo
   * @return {String} - Contenido del archivo
   */
  get(resource) {
    return axios.get(resource);
  },
};

export default FileService;
