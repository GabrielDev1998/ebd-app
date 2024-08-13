'use client';

import React, { useRef } from 'react';

function useOutside<T>() {
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = useRef<T>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const elementTarget = event.target;
      const elementRef = ref.current;

      if (elementRef instanceof Element && elementTarget instanceof Element) {
        if (!elementRef.contains(elementTarget)) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return { ref, setIsOpen, isOpen };
}
export default useOutside;
