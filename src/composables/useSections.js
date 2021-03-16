import { ref, onMounted } from 'vue'
import Section from '@/models/Section.model'

export default function useSections() {
  const sections = ref([]);

  const getSections = async() => {
    sections.value = await Section.getSections('/docs');
  }

  onMounted(getSections);

  return {
    sections,
  }
}
