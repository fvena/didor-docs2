import FileService from "@/services/File.service";
import MarkdownUtils from '@/utils/Markdown.utils';

const getArticles = async (path) => {
  const response = await FileService.get(path);
  return await MarkdownUtils.renderMarkdown(response.data);
}

export default { getArticles };
