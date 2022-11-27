<script setup lang="ts">
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
  <div class="border-t border-gray-300">
    <h2>
      {{ organizationSponsors.activeGoal.percentComplete }}% vers l'objectif de
      {{ organizationSponsors.activeGoal.targetValue }}$ par mois
    </h2>
    <div class="w-full h-1.5 mb-4 rounded-full bg-yellowDs">
      <div
        class="rounded-full h-1.5 bg-purpleDs text-[10px] font-medium text-blue-100 text-center p-0.5 leading-none"
        :style="`width: ${organizationSponsors.activeGoal.percentComplete}%`"
      ></div>
    </div>
  </div>
  <div class="leading-5" v-html="organizationSponsors.activeGoal.description" />
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
    <div class="flex flex-wrap items-stretch justify-start">
      <a
        v-for="sponsor of listSponsor"
        :key="sponsor.node.id"
        :href="sponsor.node.url"
        target="_blank"
        :title="sponsor.node.name"
        class="flex flex-wrap items-center justify-center object-cover w-1/3 md:w-1/5"
      >
        <img
          width="100px"
          height="100px"
          loading="lazy"
          decoding="async"
          :src="sponsor.node.avatarUrl"
          :alt="sponsor.node.name"
          class="w-20 h-20 m-0 rounded-full md:w-28 md:h-28"
        />
        <strong class="mt-2 text-xs text-gray-500">{{
          sponsor.node.name
        }}</strong>
      </a>
    </div>
  </div>
</template>
