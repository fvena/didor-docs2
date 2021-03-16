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

      const getData = async (newParams, oldParams) => {
        //
        // Primera carga de la página
        //
        if (!oldParams) {
          await docs.getSections();
          await docs.getArticles(newParams.section);
          docs.getArticle(newParams.section, newParams.article);
          return
        }

        //
        // Cambiamos de sección
        //
        if (newParams.section !== oldParams.section) {
          await docs.getArticles(newParams.section);
          docs.getArticle(newParams.section, newParams.article);
          return
        }

        //
        // Cambiamos de artículo
        //
        docs.getArticle(newParams.section, newParams.article);
      }

      watch(() => route.params, getData)

      onMounted(() => getData(route.params));

      return {
        sections,
        articles,
        article
      }
    },
  }
</script>

<style src="./DocsLayout.scss" lang="scss" scoped></style>
