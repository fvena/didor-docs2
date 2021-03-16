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
    p {{ content }}
</template>

<script>
  import useSections from '@/composables/useSections'
  import useArticles from '@/composables/useArticles'
  import useArticle from '@/composables/useArticle'

  export default {
    setup() {
      const { sections } = useSections()
      const { articles } = useArticles()
      const { content } = useArticle()

      return {
        sections,
        articles,
        content
      }
    },
  }
</script>

<style src="./DocsLayout.scss" lang="scss" scoped></style>
