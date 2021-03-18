<template lang="pug">
.kbd
  | {{ content }}
  .kbd__slot
    slot
</template>

<script>
export default {
  data() {
    return {
      content: '',
    };
  },
  methods: {
    initialize() {
      let content = this.$slots.default()[0].children;

      content = content.replace('"', '');
      content = content.replace('command', '⌘');
      content = content.replace('Command', '⌘');
      content = content.replace('shift', '⇧');
      content = content.replace('Shift', '⇧');
      content = content.replace('alt', '⌥');
      content = content.replace('Alt', '⌥');
      content = content.replace('ctrl', '⌃');
      content = content.replace('Ctrl', '⌃');

      this.content = content;
    },
  },
  mounted() {
    this.initialize();
  },
};
</script>

<style src="./KBD.scss" lang="scss" scoped></style>
