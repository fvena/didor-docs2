<template lang="pug">
.docsLayout(:class="{ 'docsLayout--sidebar-hidden': !articles.length, 'docsLayout--device-menu-visible': showDeviceMenu }")

  //- Header Area
  AppHeader.docsLayout__header#header(
    v-hide-on-scroll
    @toggleMenu="toggleMenu"
    :showMenu="showDeviceMenu"
    :mode="mode"
    :title="title")
    template(v-slot:headerSearch)
      //- Dark/Light Mode
      AppThemeMode(
        v-if="showToggleMode"
        @toggleMode="toggleMode")

      //- Buscador
      Search.appHeader__search
    template(v-slot:headerMenu)
      AppMenu(
        ref="headerMenuRef"
        :links="sections"
        v-observe-visibility="{callback: closeHeaderMenus, intersection: { threshold: 0.9 }}")

  //- Sidebar Area
  AppSidebar.docsLayout__sidebar(:links="articles")

  //- Scroll Tracking
  //- ScrollTracking(:blocks="toc" v-if="article && toc && toc.length > 1")

  //- Main Content
  .docsLayout__main#main(ref="main")
    .docsLayout__wrapper(v-if="article")
      //- Article Area
      AppArticle.docsLayout__article(:data="article")


      //- Footer Area
      AppPagination.docsLayout__pagination(
        v-if="prevArticle || nextArticle"
        :prevArticle="prevArticle"
        :nextArticle="nextArticle")

    AppNotFound(:title="title" v-else)
</template>

<script>
  import { watch, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import Docs from '@/models/Docs.model'
  import AppHeader from '@/components/AppHeader';
  import AppSidebar from '@/components/AppSidebar';
  import AppMenu from '@/components/AppMenu';
  import AppSocialLinks from '@/components/AppSocialLinks';
  import AppArticle from '@/components/AppArticle';
  import AppPagination from '@/components/AppPagination';
  import AppNotFound from '@/components/AppNotFound';
  import AppThemeMode from '@/components/AppThemeMode';
  import Search from '@/components/Search.component.vue';
  // import ScrollTracking from '@/components/ScrollTracking';
  import { ObserveVisibility } from 'vue-observe-visibility';

  export default {
    directives: {
      ObserveVisibility,
    },
    components: {
      AppHeader,
      AppSidebar,
      AppMenu,
      AppSocialLinks,
      AppArticle,
      AppPagination,
      AppNotFound,
      AppThemeMode,
      Search,
      // ScrollTracking,
    },
    setup() {
      const route = useRoute();
      const docs = new Docs();

      const config = window.$didor;
      const title = config.customize.title;
      const showToggleMode = config.customize.toggleMode;

      const sections = docs.sections;
      const articles = docs.articles;
      const article = docs.article;
      const prevArticle = docs.prevArticle;
      const nextArticle = docs.nextArticle;
      const data = docs.data;
      const toc = data.toc;
      // const toc = computed(() => article.data && article.data.toc ? article.data.toc : []);


      const headerMenuRef = ref(null);
      const mode = ref('light');
      let showDeviceMenu = ref(false);

      const toggleMode = (value) => {
        mode.value = value
      }

      const toggleMenu = () => {
        showDeviceMenu = !showDeviceMenu;
      };

      const closeHeaderMenus = () => {
        headerMenuRef.closeAllDropdown();
      };

      watch(() => route.params, (params) => {
        showDeviceMenu = false;
        docs.update(params);
      })

      onMounted(() => {
        docs.init(route.params);
      });

      return {
        sections,
        articles,
        article,
        prevArticle,
        nextArticle,
        toggleMenu,
        showDeviceMenu,
        showToggleMode,
        toggleMode,
        mode,
        title,
        closeHeaderMenus,
        headerMenuRef,
        toc
      }
    },
  }
</script>

<style src="./DocsLayout.scss" lang="scss" scoped></style>
