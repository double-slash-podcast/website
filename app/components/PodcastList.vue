<script setup>
const {
  baseInfos: {siteUrl},
} = useAppConfig();

defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
});

const plateforms = [
  {
    href: 'https://open.spotify.com/show/539N9WvnUguUzMWluPp2UK',
    icon: 'SpotifyIcon',
    title: 'Spotify',
    className: 'w-10 h-10 sm:h-11 sm:w-11',
  },
  {
    href: 'https://www.deezer.com/fr/show/1245532',
    icon: 'cbi:deezer-logo',
    title: 'Deezer',
    className: 'w-10 h-10 sm:h-12 sm:w-12 text-[#a238ff]',
  },
  {
    href: 'https://podcasts.apple.com/fr/podcast/double-slash/id1513703178',
    icon: 'AppleIcon',
    title: 'Apple Podcast',
    className: 'w-10 h-10 sm:h-12 sm:w-12',
  },
  {
    href: 'https://tunein.com/podcasts/Technology-Podcasts/Double-Slash-p1325678/',
    icon: 'TuneinIcon',
    title: 'Tunein',
    className: 'w-10 h-10 sm:h-12 sm:w-12',
  },
  {
    href: `${siteUrl}/podcast-rss-feed.xml`,
    icon: 'vscode-icons:file-type-rss',
    title: 'RSS Feed',
    className: 'w-10 h-10 sm:h-12 sm:w-12 -translate-y-1.5',
  },
];
</script>

<template>
  <HeadingsSection
    :dark="dark"
    title="Abonnez-vous sur votre plateforme de podcast préférée"
  >
    <ul
      class="flex items-center justify-center mt-7 space-x-5 space-y-3 sm:space-x-8"
    >
      <li v-for="plateform in plateforms" :key="plateform.icon">
        <a :href="plateform.href" :title="plateform.title" target="_blank">
          <Icon
            class="duration-300 hover:-translate-y-2"
            :class="plateform.className"
            :name="plateform.icon"
            :title="plateform.title"
          />
        </a>
      </li>
    </ul>
  </HeadingsSection>
</template>
