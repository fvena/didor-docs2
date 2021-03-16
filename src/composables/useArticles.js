import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Article from '@/models/Article.model'

export default function useArticles() {
  const route = useRoute();
  const articles = ref([]);

  const getArticles = async() => {
    const section = route.params.section || null;
    articles.value = await Article.getArticles(`/docs/${section}`);
  }

  watch(() => route.params, getArticles)


  onMounted(getArticles);

  return {
    articles,
  }
}
