<script setup>
defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
});

const plateforms = [
  {
    href: 'https://podcasts.google.com/?feed=aHR0cHM6Ly9zbGFzaC1wb2RjYXN0LmZyL3BvZGNhc3QtcnNzLWZlZWQueG1s&ved=2ahUKEwigiuTNrNTpAhUR8hoKHTJnDIQQ4aUDegQIARAC&hl=fr',
    icon: 'GoogleIcon',
  },
  {
    href: 'https://open.spotify.com/show/539N9WvnUguUzMWluPp2UK',
    icon: 'SpotifyIcon',
  },
  {href: 'https://www.deezer.com/fr/show/1245532', icon: 'DeezerIcon'},
  {
    href: 'https://podcasts.apple.com/fr/podcast/double-slash/id1513703178',
    icon: 'AppleIcon',
  },
  {
    href: 'https://tunein.com/podcasts/Technology-Podcasts/Double-Slash-p1325678/',
    icon: 'TuneinIcon',
  },
];
</script>

<template>
  <HeadingsSection
    :dark="dark"
    title="abonnez vous sur votre plateforme de podcast préféré"
  >
    <ul class="flex justify-center space-x-8">
      <li v-for="plateform in plateforms" :key="plateform.icon">
        <a href="plateform.href">
          <Icon
            class="w-12 h-12 text-white duration-300 fill-white hover:text-gray-400 hover:-translate-y-2 sm:h-14 sm:w-14"
            :class="{'text-haiti': dark}"
            :name="plateform.icon"
          />
        </a>
      </li>
    </ul>
  </HeadingsSection>
</template>
