<script setup lang="ts">
const {
  baseInfos: {titleDefault},
} = useAppConfig();

const props = withDefaults(
  defineProps<{
    text: string;
    trackPodcastShare?: boolean;
  }>(),
  {trackPodcastShare: false},
);

const {$posthog: posthog} = useNuxtApp();

// share btn
const share = async () => {
  try {
    await navigator.share({
      title: titleDefault,
      text: props.text,
      url: window.location.href,
    });
    if (props.trackPodcastShare) {
      posthog?.capture('podcast_shared');
    }
  } catch (err) {
    console.error(err);
  }
};
</script>

<template>
  <div class="relative flex justify-end mt-10">
    <button
      class="flex items-center justify-center gap-1 px-4 py-2 text-white rounded-md bg-secondary hover:bg-secondary/90"
      @click="share"
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
