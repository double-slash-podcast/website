<script setup lang="ts">
/**
 * Fetches and renders GitHub Sponsors. Awaited so `nuxi generate` embeds
 * the listing; a failed fetch stays empty instead of failing the page.
 */
import {parseGithubSponsorsListing} from '~/utils/githubSponsors';

const props = withDefaults(
  defineProps<{
    withList?: boolean;
  }>(),
  {withList: true},
);

const {data} = await useAsyncData('github-sponsor', () =>
  $fetch('/github-sponsor.json').catch(() => null),
);

const organizationSponsors = computed(() =>
  parseGithubSponsorsListing(data.value),
);

const listSponsor = computed(
  () => organizationSponsors.value?.sponsorable?.sponsors?.edges,
);
</script>

<template>
  <div v-if="organizationSponsors">
    <div
      v-if="organizationSponsors.activeGoal != null"
      class=""
    >
      <h2>
        {{ organizationSponsors.activeGoal?.percentComplete }}% vers l'objectif
        de {{ organizationSponsors.activeGoal?.targetValue }}$ par mois
      </h2>
      <div class="w-full h-1.5 mb-4 rounded-full bg-primary">
        <div
          class="rounded-full h-1.5 bg-secondary text-[10px] font-medium text-blue-100 text-center p-0.5 leading-none"
          :style="`width: ${organizationSponsors.activeGoal?.percentComplete}%`"
        />
      </div>
    </div>
    <div class="leading-5">
      {{ organizationSponsors.activeGoal?.description }}
    </div>
    <div class="py-4 mt-6 text-center">
      <a
        target="_blank"
        :href="organizationSponsors.url"
        class="inline-flex items-center px-4 py-3 text-gray-800 no-underline transition-all bg-gray-100 border border-gray-300 rounded-md hover:opacity-80 duration-400 group no-arrow"
        ><Icon
          name="ri:heart-3-fill"
          size="24"
          class="mr-3 transition-color group-hover:text-red-700"
        />
        Soutenir Double Slash</a
      >
    </div>
  </div>
  <div
    v-if="props.withList === true"
    class="pb-8 mt-8 border-t border-gray-300"
  >
    <h2>Ils nous soutiennent !</h2>
    <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
      <a
        v-for="sponsor of listSponsor"
        v-show="sponsor.node.name !== null"
        :key="sponsor.node.id"
        :href="sponsor.node.url"
        target="_blank"
        :title="sponsor.node.name"
        class="flex flex-col items-center justify-center object-cover"
      >
        <img
          width="80px"
          height="80px"
          loading="lazy"
          decoding="async"
          :src="sponsor.node.avatarUrl"
          :alt="sponsor.node.name"
          class="border-4 border-purple-500 rounded-full w-28 h-28 mt-0 mb-0"
        />
        <strong class="mt-2 text-xs text-gray-500 text-wrap">{{
          sponsor.node.name
        }}</strong>
      </a>
    </div>
  </div>
</template>
