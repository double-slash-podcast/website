<template>
  <Listbox v-model="selectedSpeed">
    <ListboxButton
      class="relative px-2 font-bold rounded bg-yellowDs text-darkPurple hover:bg-yellow-400"
      >{{ selectedSpeed }}x</ListboxButton
    >
    <ListboxOptions
      class="absolute rounded right-2 bottom-3 bg-purple-50 text-darkPurple"
    >
      <ListboxOption
        v-for="spe in selectedSpeeds"
        :key="spe.label"
        :value="spe.value"
        class="px-4 py-2 rounded hover:bg-purple-200"
      >
        {{ spe.label }}x
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>

<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

const props = withDefaults(
  defineProps<{
    speed?: typeSpeedPlayer;
  }>(),
  {speed: 1.0},
);

const emit = defineEmits(['change']);

const selectedSpeed = ref<typeSpeedPlayer>(props.speed);

const selectedSpeeds = reactive<{value: typeSpeedPlayer; label: string}[]>([
  {value: 0.5, label: '0.5'},
  // {value: 0.75, label: '0.75'},
  {value: 1.0, label: '1'},
  // {value: 1.25, label: '1.25'},
  {value: 1.5, label: '1.5'},
  // {value: 1.75, label: '1.75'},
  {value: 2.0, label: '2'},
]);

// emit change
watch(
  () => selectedSpeed.value,
  () => emit('change', selectedSpeed.value),
);

// watch props change
watch(
  () => props.speed,
  () => (selectedSpeed.value = props.speed),
);
</script>
