import FileService from "@/services/File.service";
import LinksUtils from '@/utils/Links.utils';
import MarkdownUtils from '@/utils/Markdown.utils';

const getLinks = async (path) => {
  const response = await FileService.get(path);
  return LinksUtils.getListLinks(response.data);
}

const getContent = async (path) => {
  const response = await FileService.get(path);
  return await MarkdownUtils.renderMarkdown(response.data);
}

export default { getLinks, getContent };
