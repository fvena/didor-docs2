<template lang="pug">
.docsLayout
  //- Header Area
  .docsLayout__header
    | Docs Header
    p {{ sections }}

  //- Sidebar Area
  .docsLayout__sidebar
    | Docs Sidebar
    p {{ articles }}

  //- Main Content
  .docsLayout__main
    | Docs Layout
    p {{ article }}
</template>

<script>
  import { watch, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import Docs from '@/models/Docs.model'

  export default {
    setup() {
      const route = useRoute();
      const docs = new Docs();

      const sections = docs.sections;
      const articles = docs.articles;
      const article = docs.article;

      watch(() => route.params, (params) => docs.update(params))

      onMounted(() => docs.init(route.params));

      return {
        sections,
        articles,
        article
      }
    },
  }
</script>

<style src="./DocsLayout.scss" lang="scss" scoped></style>
