import FileService from "@/services/File.service";
import LinksUtils from '@/utils/Links.utils';

const getSections = async (path) => {
  const response = await FileService.get(path);
  return LinksUtils.getListLinks(response.data);
}

export default { getSections };
