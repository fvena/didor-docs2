import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Article from '@/models/Article.model'

export default function useArticle() {
  const route = useRoute();
  const content = ref({});

  const getArticle = async() => {
    const section = route.params.section || null;
    const article = route.params.article || null;
    content.value = await Article.getArticle(`/docs/${section}/${article}.md`);
  }

  watch(() => route.params, getArticle)


  onMounted(getArticle);

  return {
    content,
  }
}
