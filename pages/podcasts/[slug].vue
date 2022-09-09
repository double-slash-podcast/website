<script setup>
const {path} = useRoute();
const {data} = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({_path: path}).only(['title']).findOne();
});
if (!data) {
  throw createError({statusCode: 404, statusMessage: 'Page Not Found'});
}
</script>
<template>
  <main v-if="data">
    <h1>{{ data.title }}</h1>
  </main>
</template>
