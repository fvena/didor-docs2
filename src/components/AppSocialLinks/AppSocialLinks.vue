<template lang="pug">
.appSocialLinks
  a.appSocialLinks__item(
    v-for="(link, name) in social"
    :key="name"
    :href="link"
    target="_blank"
  )
    dd-icon(:name="name" scale="0.7")
</template>

<script>

export default {
  data() {
    return {
      social: {},
    };
  },

  created() {
    this.social = window.$didor.customize.social;
  },
};
</script>

<style src="./AppSocialLinks.scss" lang="scss" scoped></style>
