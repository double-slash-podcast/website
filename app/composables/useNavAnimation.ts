const useNavAnimation = () => {
  const wrapperNav = ref<HTMLElement | null>(null);
  const currentPosition = ref([0, 0]);

  onMounted(() => {
    if (!wrapperNav.value) return;
    const current: HTMLAnchorElement | null = wrapperNav.value.querySelector(
      '.router-link-active',
    );
    if (current) {
      currentPosition.value = [current.offsetWidth, current.offsetLeft];
      // current element position
      wrapperNav.value.style.setProperty(
        '--underline-width',
        `${current.offsetWidth}px`,
      );
      wrapperNav.value.style.setProperty(
        '--underline-offset-x',
        `${current.offsetLeft}px`,
      );
    }
  });

  const handleHover = (e: MouseEvent) => {
    if (!wrapperNav.value) return;

    const {target} = e;
    if (!target) return;

    wrapperNav.value.style.setProperty(
      '--underline-width',
      `${(target as HTMLAnchorElement).offsetWidth}px`,
    );
    wrapperNav.value.style.setProperty(
      '--underline-offset-x',
      `${(target as HTMLAnchorElement).offsetLeft}px`,
    );
  };

  const handleOut = () => {
    if (!wrapperNav.value) return;

    wrapperNav.value.style.setProperty(
      '--underline-width',
      `${currentPosition.value[0]}px`,
    );
    wrapperNav.value.style.setProperty(
      '--underline-offset-x',
      `${currentPosition.value[1]}px`,
    );
  };

  return {
    wrapperNav,
    handleOut,
    handleHover,
  };
};

export default useNavAnimation;
