/**
 * Underline hover animation for the main nav.
 * Avoid Vue template refs: async page setup (Suspense) leaves setRef with a
 * null owner in Vue 3.5 production (`Cannot read properties of null (reading
 * 'refs')`).
 */
const useNavAnimation = () => {
  const instance = getCurrentInstance();
  const currentPosition = ref([0, 0]);

  /**
   * Inner links row, resolved from the navbar root without a template ref.
   */
  function getWrapper(): HTMLElement | null {
    const root = instance?.vnode.el;
    if (!(root instanceof HTMLElement)) return null;
    const inner = root.querySelector('.js-nav-links');
    return inner instanceof HTMLElement ? inner : null;
  }

  onMounted(() => {
    const wrapper = getWrapper();
    if (!wrapper) return;
    const current: HTMLAnchorElement | null = wrapper.querySelector(
      '.router-link-active',
    );
    if (current) {
      currentPosition.value = [current.offsetWidth, current.offsetLeft];
      wrapper.style.setProperty('--underline-width', `${current.offsetWidth}px`);
      wrapper.style.setProperty(
        '--underline-offset-x',
        `${current.offsetLeft}px`,
      );
    }
  });

  const handleHover = (e: MouseEvent) => {
    const wrapper = getWrapper();
    if (!wrapper) return;

    const {target} = e;
    if (!target) return;

    wrapper.style.setProperty(
      '--underline-width',
      `${(target as HTMLAnchorElement).offsetWidth}px`,
    );
    wrapper.style.setProperty(
      '--underline-offset-x',
      `${(target as HTMLAnchorElement).offsetLeft}px`,
    );
  };

  const handleOut = () => {
    const wrapper = getWrapper();
    if (!wrapper) return;

    wrapper.style.setProperty(
      '--underline-width',
      `${currentPosition.value[0]}px`,
    );
    wrapper.style.setProperty(
      '--underline-offset-x',
      `${currentPosition.value[1]}px`,
    );
  };

  return {
    handleOut,
    handleHover,
  };
};

export default useNavAnimation;
