<template>
  <div>
    <label class="sr-only" :for="selectId">Vitesse de lecture</label>
    <select
      :id="selectId"
      v-model.number="selectedSpeed"
      class="speed-player-select relative min-h-5 min-w-6 cursor-pointer appearance-none rounded-sm border-0 bg-primary bg-none px-2.5 py-1 text-sm font-semibold leading-none text-dark shadow-none hover:bg-yellow-400 focus:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <option
        v-for="spe in selectedSpeeds"
        :key="spe.label"
        :value="spe.value"
      >
        {{ spe.label }}x
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
/**
 * Native playback-rate select for the audio player.
 * Uses a real <select> so keyboard, screen readers and mobile pickers work
 * without Headless UI. The closed control matches the yellow player chip;
 * supporting browsers also style the picker via appearance: base-select.
 */
const props = withDefaults(
  defineProps<{
    speed?: typeSpeedPlayer;
  }>(),
  {speed: 1.0},
);

const emit = defineEmits(['change']);

/** Unique id so the visually hidden label stays associated if several players mount. */
const selectId = useId();

const selectedSpeed = ref<typeSpeedPlayer>(props.speed);

const selectedSpeeds: {value: typeSpeedPlayer; label: string}[] = [
  {value: 0.5, label: '0.5'},
  // {value: 0.75, label: '0.75'},
  {value: 1.0, label: '1'},
  // {value: 1.25, label: '1.25'},
  {value: 1.5, label: '1.5'},
  // {value: 1.75, label: '1.75'},
  {value: 2.0, label: '2'},
];

watch(
  () => selectedSpeed.value,
  () => emit('change', selectedSpeed.value),
);

watch(
  () => props.speed,
  () => (selectedSpeed.value = props.speed),
);
</script>

<style scoped>
/*
  Opt the picker into customizable select where supported (Chrome 135+, Safari 27+).
  Other browsers keep a classic OS list while the closed chip stays styled.
*/
@supports (appearance: base-select) {
  .speed-player-select,
  .speed-player-select::picker(select) {
    appearance: base-select;
  }

  .speed-player-select::picker-icon,
  .speed-player-select option::checkmark {
    display: none;
    content: none;
  }

  .speed-player-select::picker(select) {
    border: none;
    border-radius: 0.125rem;
    background-color: var(--color-purple-50, #faf5ff);
    color: var(--color-dark);
  }

  .speed-player-select option {
    padding-block: 0.5rem;
    padding-inline: 1rem;
    border-radius: 0.125rem;
  }

  .speed-player-select option:is(:hover, :focus, :checked) {
    background-color: var(--color-purple-200, #e9d5ff);
  }
}
</style>
