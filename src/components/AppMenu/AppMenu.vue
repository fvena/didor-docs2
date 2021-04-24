<template lang="pug">
nav.appMenu(:class="{'appMenu--vertical': vertical}")

  //- Menu Item
  li.appMenu__item(v-for="({path, slug, title, children}, key) in links" :key="key")

    //- Link externo
    a.appMenu__item--link(
      v-if="path && path.startsWith('http')"
      :href="path"
      target="_blanck")
      | {{ title }}

    //- Link interno
    router-link.appMenu__item--link(
      v-if="slug"
      :to="`/${slug}`")
      | {{ title }}

    //- Dropdown
    Dropdown.appMenu__item--dropdown(
      v-if="children"
      :title="title"
      :ref="'dropdown' + key"
      :options="children"
      :float="!vertical"
      :closeOutside="!vertical")
</template>

<script>
  import Dropdown from '@/components/Dropdown';

  export default {
    components: {
      Dropdown,
    },

    props: {
      vertical: {
        type: Boolean,
        default: false,
      },

      links: {
        type: Array,
        required: true,
      },
    },

    methods: {
      closeAllDropdown() {
        if (!Object.keys(this.$refs).length) return;
        Object.keys(this.$refs).forEach((item) => this.$refs[item][0].close());
      },
    },
  };
</script>

<style src="./AppMenu.scss" lang="scss" scoped></style>
