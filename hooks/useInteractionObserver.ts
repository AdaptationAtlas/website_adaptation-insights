import { useEffect, useState } from 'react';

export const useIntersectionObserver = (ref: any, options = {}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;

    if (target) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsVisible(entry.isIntersecting);
      }, options);

      observer.observe(target);

      return () => observer.unobserve(target);
    }

    return undefined;
  }, [ref, options]);

  return isVisible;
};
