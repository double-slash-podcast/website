<script setup lang="ts">
const props = defineProps<{
  name: string;
  size: string;
}>();

const SVGCode = ref();
// create path for icon
const path = props.name ? `${props.name.replace(':', '/')}.svg` : null;
onMounted(async () => {
  if (!path) return;
  // load icon
  const {data: svgIcon} = await useAsyncData(props.name, () => {
    return $fetch(`https://api.iconify.design/${path}`);
  });

  // create url
  if (svgIcon.value) {
    // SVGCode.value = await new Response(svgIcon.value as Blob).text();
    SVGCode.value = URL.createObjectURL(svgIcon.value as Blob);
  }
});
</script>

<template>
  <span
    v-if="SVGCode"
    :style="`width: ${size}px;height: ${size}px;background-image: url(${SVGCode});`"
    :class="`block bg-no-repeat bg-contain`"
    :src="SVGCode"
  ></span>
</template>
