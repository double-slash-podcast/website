<script setup lang="ts">
const {
  baseInfos: {titleDefault},
} = useAppConfig();

const props = defineProps<{
  text: string;
}>();

// share btn
const share = async () => {
  try {
    await navigator.share({
      title: titleDefault,
      text: props.text,
      url: window.location.href,
    });
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div class="relative flex justify-end mt-10">
    <button
      @click="share"
      class="flex items-center justify-center gap-1 px-4 py-2 text-white rounded-md bg-purpleDs hover:bg-purpleDs/90"
    >
      <span>Partager</span>
      <Icon
        name="material-symbols:ios-share"
        width="20"
        height="20"
        class="relative -top-0.5"
      />
    </button>
  </div>
</template>
