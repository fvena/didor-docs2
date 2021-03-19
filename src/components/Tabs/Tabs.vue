<template lang="pug">
.tabs
  .tabs__titles
    .tabs__title(
      v-for="(tab, index) in tabs"
      :key="index"
      :class="{'tabs__title--select': index === selectedIndex }"
      @click="selectTab(index)")
      | {{ tab.props.title }}
  .tabs__content
    slot
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted, provide } from "vue";

export default {
  name: 'Tabs',
  setup(_, {slots}) {
    const state = reactive({
      selectedIndex: 0,
      tabs: [],
      count: 0
    });

    provide("TabsProvider", state);

    const selectTab = (i) => {
      state.selectedIndex = i;
    };

    onBeforeMount(() => {
      if (slots.default) {
        state.tabs = slots.default().filter((child) => child.type.name === "Tab");
      }
    });

    onMounted(() => {
      selectTab(0);
    });

    return {...toRefs(state), selectTab};
  }
};
</script>

<style src="./Tabs.scss" lang="scss" scoped></style>
