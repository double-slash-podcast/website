<script setup>
const plateforms = [
  {href: '#',icon:'simple-icons:googlepodcasts'},
  {href: '#',icon:'simple-icons:spotify'},
  {href: '#',icon:'fa-brands:deezer'},
  {href: '#',icon:'simple-icons:applepodcasts'},
  {href: '#',icon:'arcticons:tunein-radio'},
  {href: '#',icon:'simple-icons:overcast'},];
</script>

<template>
    <HeadingsSection title="abonnez vous sur votre plateforme de podcast préféré">
      <ul class="flex justify-center space-x-8">
        <li v-for="plateform in plateforms" :key="plateform.icon">
          <a href="plateform.href">
            <Icon
              class="text-white duration-300 fill-white hover:text-gray-400 hover:-translate-y-2"
              :name="plateform.icon"
              size="54"
            />
          </a>
        </li>
      </ul>
    </HeadingsSection>
</template>
