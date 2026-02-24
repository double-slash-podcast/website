import { ref, onMounted } from 'vue';
import { throttle} from 'throttle-debounce';

const useScrollDirection = () => {
  
  const scrollDirection = ref<'up' | 'down' | null>(null);
  const scrollPosition = ref(0);
  
  
  const defineDirection = () => {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > scrollPosition.value) {
      scrollDirection.value = 'down';
    } else {
      scrollDirection.value = 'up';
    }
    scrollPosition.value = currentScrollPosition;
  }
  
  
  onMounted(() => {
    document.addEventListener('scroll', throttle(100, defineDirection));
  })

  return {
    scrollDirection,
    scrollPosition,
  };
}


export default useScrollDirection