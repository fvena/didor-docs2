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
  article = ref('');
  nextArticle = ref();
  prevArticle = ref();
  data = ref([]);
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

  get nextArticle() {
    return this.nextArticle;
  }

  get prevArticle() {
    return this.prevArticle;
  }

  get data() {
    return this.data;
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
    //
    // Necesitamos tener el listado de secciones para obtener la ruta de la sección
    //
    if(!ArrayUtils.checkArray(this.sections.value)) return

    const { basePath, articlesFile } = this.didor.content;
    if (!basePath || !sectionPath || !articlesFile) return;

    const section = this.getCurrentSection(sectionPath);

    if (!section?.path) {
      this.clear();
      return;
    }

    this.articles.value = await DocsService.getLinks(`${basePath}/${section.path}/${articlesFile}`);
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
    // Si recibimos una sección y tengo un listado de artículos
    //
    if (sectionPath && ArrayUtils.checkArray(this.articles.value)) {
      //
      // Si no recibimos un artículo, redirijo al primer artículo de la sección
      //
      if (!articlePath) {
        const firstArticle = this.getFirstArticle();
        Router.push({ path: `/${sectionPath}/${firstArticle.slug}` })
        return
      }

      //
      // Obtengo los datos del artículo correspondiente a la ruta actual
      // y si existen los artículos previo y siguiente
      //
      const {current, next, prev} = this.getCurrentArticle(articlePath);

      if (!current.path) {
        this.clear();
        return;
      }

      const content = await DocsService.getContent(`${basePath}/${current.path}`);
      this.article.value = content.render;
      this.data.value = content.data;

      this.prevArticle.value = prev;
      this.nextArticle.value = next;
      return
    }

    // //
    // // Si recibimos una sección y un artículo devuelvo el artículo
    // //
    // if (sectionPath && articlePath) {
    //   console.log('sectionPath', sectionPath)
    //   console.log('articlePath', articlePath)

    //   const content = await DocsService.getContent(`${basePath}/${sectionPath}/${articlePath}.md`);
    //   this.article.value = content.render;
    //   this.data.value = content.data;
    //   return;
    // }

    // //
    // // Si recibimos una sección y no recibimos un artículo:
    // //   - Si existe un listado de artículos, redirijo al primer artículo
    // //     El listado puede contener una estructura anidada
    // //     para asegurarme que obtengo el primer link, lo combierto a una estructura plana
    // //
    // if (sectionPath && !articlePath) {
    //   if (ArrayUtils.checkArray(this.articles.value)) {
    //     const flatNavbarLinks = ArrayUtils.flattenList(this.articles.value);
    //     const firstArticle = LinksUtils.removeExtension(flatNavbarLinks[0].path);
    //     Router.push({ path: firstArticle })
    //     return
    //   }
    // }

    //
    // Si no recibo una sección ni artículo estoy en el root '/'
    // Si existe un archivo por defecto lo devuelvo
    //
    if (!sectionPath && !articlePath && defaultFile) {
      const content = await DocsService.getContent(`${basePath}/${defaultFile}`);
      this.article.value = content.render;
      this.data.value = content.data;
    }

    //
    // En cualquier otro caso no se encuentra la ruta y reinicio los datos
    //
    this.clear()
  }

  getCurrentSection(sectionPath) {
    const flatList = ArrayUtils.flattenList(this.sections.value);
    const slug = `${sectionPath}`;
    const index = flatList.findIndex(item => item.slug === slug);

    return index >= 0 ? flatList[index] : null;
  }

  getCurrentArticle(articlePath) {
    const flatList = ArrayUtils.flattenList(this.articles.value);
    const slug = `${articlePath}`;
    const index = flatList.findIndex(item => item.slug === slug);

    let current = null;
    let prev = null;
    let next = null;

    if(index >= 0) {
      current = flatList[index];
      prev = index - 1 >= 0 ? flatList[index - 1] : null;
      next = index + 1 < flatList.length ? flatList[index + 1] : null;
    }

    return { current, prev, next };
  }

  getFirstArticle() {
    const flatList = ArrayUtils.flattenList(this.articles.value);
    return flatList[0];
  }

  clear() {
    this.articles.value = [];
    this.article.value = null;
    this.nextArticle.value = null;
    this.prevArticle.value = null;
    this.data.value = [];
  }
}
