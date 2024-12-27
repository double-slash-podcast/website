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
  },
  {
    href: 'https://www.deezer.com/fr/show/1245532',
    icon: 'cbi:deezer-logo',
    title: 'Deezer',
  },
  {
    href: 'https://podcasts.apple.com/fr/podcast/double-slash/id1513703178',
    icon: 'AppleIcon',
    title: 'Apple Podcast',
  },
  {
    href: 'https://tunein.com/podcasts/Technology-Podcasts/Double-Slash-p1325678/',
    icon: 'TuneinIcon',
    title: 'Tunein',
  },
  {
    href: `${siteUrl}/podcast-rss-feed.xml`,
    icon: 'vscode-icons:file-type-rss',
    title: 'RSS Feed',
  },
];
</script>

<template>
  <HeadingsSection
    :dark="dark"
    title="Abonnez-vous sur votre plateforme de podcast préférée"
  >
    <ul
      class="flex items-center justify-center mt-4 space-x-5 space-y-3 sm:space-x-8"
    >
      <li v-for="plateform in plateforms" :key="plateform.icon">
        <a :href="plateform.href" :title="plateform.title" target="_blank">
          <Icon
            class="w-12 h-12 duration-300 hover:-translate-y-2 sm:h-14 sm:w-14"
            :class="{'text-[#a238ff]' :plateform.title === 'Deezer'}"
            :name="plateform.icon"
            :title="plateform.title"
          />
        </a>
      </li>
    </ul>
  </HeadingsSection>
</template>
