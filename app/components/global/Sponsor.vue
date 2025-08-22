<script setup lang="ts">
// eslint-disable vue/no-v-html
withDefaults(
  defineProps<{
    withList?: boolean;
  }>(),
  {withList: true},
);
const organizationSponsors = ref();
const {data} = await useAsyncData('github-sponsor', () =>
  $fetch('/github-sponsor.json'),
);
if (data.value) {
  const prs = JSON.parse(data.value as string);
  organizationSponsors.value = prs.data.organization.sponsorsListing;
}
// list person
const listSponsor = computed(
  () => organizationSponsors.value?.sponsorable?.sponsors?.edges,
);
</script>

<template>
  <!-- <div class="leading-5" v-html="organizationSponsors.fullDescriptionHTML" /> -->
  <div
    v-if="organizationSponsors.activeGoal != null"
    class="border-t border-gray-300"
  >
    <h2>
      {{ organizationSponsors.activeGoal?.percentComplete }}% vers l'objectif de
      {{ organizationSponsors.activeGoal?.targetValue }}$ par mois
    </h2>
    <div class="w-full h-1.5 mb-4 rounded-full bg-yellowDs">
      <div
        class="rounded-full h-1.5 bg-purpleDs text-[10px] font-medium text-blue-100 text-center p-0.5 leading-none"
        :style="`width: ${organizationSponsors.activeGoal?.percentComplete}%`"
      ></div>
    </div>
  </div>
  <div class="leading-5">
    {{ organizationSponsors.activeGoal?.description }}
  </div>
  <div class="py-4 mt-6 text-center">
    <a
      target="_blank"
      :href="organizationSponsors.url"
      class="px-4 py-3 text-gray-800 no-underline transition-all bg-gray-100 border border-gray-300 rounded-md hover:opacity-80 duration-400 group"
      ><Icon
        name="ri:heart-3-fill"
        size="24"
        class="mr-1 transition-color group-hover:text-red-700"
      />
      Soutenir Double Slash</a
    >
  </div>
  <div v-if="withList === true" class="pb-8 mt-8 border-t border-gray-300">
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
          class="m-0 border-4 border-purple-500 rounded-full w-28 h-28"
        />
        <strong class="mt-2 text-xs text-gray-500 text-wrap">{{
          sponsor.node.name
        }}</strong>
      </a>
    </div>
  </div>
</template>
