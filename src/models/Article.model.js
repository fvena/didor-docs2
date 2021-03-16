import ArticleService from "@/services/Article.service";
import constant from "@/constant";

/**
 * @typedef {Object} Article
 * @property {string} title - Título del artículo
 * @property {string} path - Ruta del artículo
 * @property {string} slug - Título amigable
 * @property {Article[]} children - Listado de artículos hijos
 */

export default class Article {

  /**
   * Obtiene el listado de secciones dentro de una ruta
   *
   * @param {String} path - Ruta base de las secciones
   * @return {Article[]} - Listado con las secciones
   * @throws {ArticleError} - Error de Sección
   */
  static async getArticles(path) {
    const articlePath = `${path}/${constant.ARTICLES_FILE}`;
    return await ArticleService.getArticles(articlePath);
  }

  /**
   * Obtiene un artículo
   *
   * @param {String} path - Ruta base de las secciones
   * @return {Article} - Datos del artículo
   * @throws {ArticleError} - Error de Sección
   */
   static async getArticle(path) {
    return await ArticleService.getArticles(path);
  }
}
