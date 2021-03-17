import { ref } from 'vue'
import Router from '@/router'
import DocsService from "@/services/Docs.service";
import ArrayUtils from "@/utils/Array.utils";
import LinksUtils from '@/utils/links.utils';

/**
 * @typedef {Object} Links
 * @property {string} title - Título del link
 * @property {string} path - Ruta del link
 * @property {string} slug - Título amigable
 * @property {Links[]} children - Listado de links hijos
 */

/**
 * @typedef {Object} Article
 * @property {string} render - Título del link
 * @property {string} data - Ruta del link
 */

export default class Docs {
  sectionPath = '';
  articlePath = '';
  sections = ref([]);
  articles = ref([]);
  article = ref();
  didor = {};

  constructor() {
    this.didor = window.$didor;
  }

  //
  // GETTERS
  //

  get sections() {
    return this.sections;
  }

  get articles() {
    return this.articles;
  }

  get article() {
    return this.article;
  }

  //
  // METHODS
  //

  /**
   * Obtiene todos los datos
   *
   * @param {String} section - Nombre de la sección
   * @param {String} article - Nombre del artículo
   * @throws {DocsError} - Error de Sección
   */
  async init({section, article}) {
    await this.getSections();
    await this.getArticles(section);
    this.getArticle(section, article);

    this.sectionPath = section;
    this.articlePath = article;
  }


  /**
   * Actualiza los datos
   *
   * @param {String} section - Nombre de la sección
   * @param {String} article - Nombre del artículo
   * @throws {DocsError} - Error de Sección
   */
  async update({section, article}) {

    if (this.sectionPath !== section) {
      await this.getArticles(section);
    }

    this.getArticle(section, article);

    this.sectionPath = section;
    this.articlePath = article;
  }


  /**
   * Obtiene el listado de secciones dentro de una ruta
   *
   * @param {String} path - Ruta base de las secciones
   * @return {Links[]} - Listado con las secciones
   * @throws {DocsError} - Error de Sección
   */
  async getSections() {
    const { basePath, sectionsFile } = this.didor.content;
    if (!basePath || !sectionsFile) return;
    this.sections.value = await DocsService.getLinks(`${basePath}/${sectionsFile}`);
  }

  /**
   * Obtiene el listado de artículos dentro de una ruta
   *
   * @param {String} path - Ruta base de las secciones
   * @return {Links[]} - Listado con las secciones
   * @throws {DocsError} - Error de Sección
   */
  async getArticles(sectionPath) {
    const { basePath, articlesFile } = this.didor.content;
    if (!basePath || !sectionPath || !articlesFile) return;
    this.articles.value = await DocsService.getLinks(`${basePath}/${sectionPath}/${articlesFile}`);
  }

  /**
   * Obtiene un artículo
   *
   * @param {String} path - Ruta base de las secciones
   * @return {Article} - Datos del artículo
   * @throws {DocsError} - Error de Sección
   */
  async getArticle(sectionPath, articlePath) {
    const { basePath, defaultFile } = this.didor.content;

    if (!basePath) return;

    //
    // Si recibimos una sección y un artículo devuelvo el artículo
    //
    if (sectionPath && articlePath) {
      this.article.value = await DocsService.getContent(`${basePath}/${sectionPath}/${articlePath}.md`);
      return;
    }

    //
    // Si recibimos una sección y no recibimos un artículo:
    //   - Si existe un listado de artículos, redirijo al primer artículo
    //     El listado puede contener una estructura anidada
    //     para asegurarme que obtengo el primer link, lo combierto a una estructura plana
    //
    if (sectionPath && !articlePath) {
      if (ArrayUtils.checkArray(this.articles.value)) {
        const flatNavbarLinks = ArrayUtils.flattenList(this.articles.value);
        const firstArticle = LinksUtils.removeExtension(flatNavbarLinks[0].path);
        Router.push({ path: firstArticle })
        return
      }
    }

    //
    // Si no recibo una sección ni artículo estoy en el root '/'
    // Si existe un archivo por defecto lo devuelvo
    //
    if (defaultFile) {
      this.article.value = await DocsService.getContent(`${basePath}/${defaultFile}`);
    }
  }
}
