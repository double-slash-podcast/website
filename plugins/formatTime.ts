export default defineNuxtPlugin(() => {
  return {
    provide: {
      formatTime: (num: number) => num.toString().padStart(2, '0'),
    },
  };
});
