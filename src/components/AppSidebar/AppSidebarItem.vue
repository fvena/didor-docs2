<template lang="pug">
li.sidebarItem(:class="levelClass")
  router-link.sidebarItem__link(:to="link.slug" v-if="link.slug" :class="{'sidebarItem__title': isLinkTitle}") {{ link.title }}
  .sidebarItem__title(v-else) {{ link.title }}

  AppSidebarLink(
    v-if="link.children && link.children.length"
    v-for="(children,key) in link.children"
    :key="key"
    :link="children"
    :deep="deep + 1")
</template>

<script>
  export default {
    name: 'AppSidebarLink',
    props: {
      link: {
        type: Object,
        required: true,
      },
      deep: {
        type: Number,
        default: 1,
      },
    },
    computed: {
      levelClass() {
        return `sidebarItem--level${this.deep}`;
      },
      isLinkTitle() {
        return this.deep === 1 && !!this.link.file;
      },
    },

    created() {
      console.log(this.link);
      console.log(this.deep);
    },
  };
</script>

<style src="./AppSidebarItem.scss" lang="scss" scoped></style>
