<template lang="pug">
.tab(v-show="isActive")
  slot
</template>

<script>
import { ref, watch, inject, onBeforeMount } from "vue";

export default {
  name: 'Tab',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const index = ref(0);
    const isActive = ref(false);

    const tabs = inject("TabsProvider");

    watch(
      () => tabs.selectedIndex,
      () => {
        isActive.value = index.value === tabs.selectedIndex;
      }
    );

    onBeforeMount(() => {
      index.value = tabs.count;
      tabs.count++;
      isActive.value = index.value === tabs.selectedIndex;
    });

    return {index, isActive};
  }
};
</script>
