<template lang="pug">
.appThemeMode
  //- Icono light
  SvgIcon.appThemeMode__icon(
    name="sun"
    scale="0.6"
    :class="{'appThemeMode__icon--select': mode === 'light'}")

  //- Switch
  .appThemeMode__switch(
    :class="{'appThemeMode__switch--on': mode === 'dark'}"
    @click="toggleMode")
    .appThemeMode__switch__node

  //- Icono dark
  SvgIcon.appThemeMode__icon(
    name="moon"
    scale="0.6"
    :class="{'appThemeMode__icon--select': mode === 'dark'}")
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'AppThemeMode',

  setup(props, context) {
    const mode = ref();

    /**
     * Obtiene el modo de la aplicación
     */
    const getMode = () => {
      //
      // Obtengo el modo definido en los ajustes y almacenado en local
      //
      const settingMode = window.$didor.customize.mode;
      const localMode = localStorage.getItem('didor-theme');
      const systemMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

      //
      // Asigno el modo dando preferencia al local,
      // después al de los ajustes de la documentación
      // luego al del sistema
      // y si no obtengo ninguno, utilizo el 'light' por defecto
      //
      const newMode = localMode || settingMode || systemMode || 'light';

      setMode(newMode);
    };

    /**
     * Alterna el modo de la aplicación
     */
    const toggleMode = () => {
      const newMode = mode.value === 'light' ? 'dark' : 'light';
      setMode(newMode);
    };

    /**
     * Actualiza el modo de la aplicación
     */
    const setMode = (newMode) => {
      mode.value = newMode;
      document.getElementsByTagName('html')[0].setAttribute('data-theme', mode.value);
      localStorage.setItem('didor-theme', mode.value);
      context.emit('toggleMode', mode.value);
    };

    onMounted(() => {
      getMode();
    });

    return {
      mode,
      toggleMode
    }
  }
};
</script>

<style src="./AppThemeMode.scss" lang="scss" scoped></style>
