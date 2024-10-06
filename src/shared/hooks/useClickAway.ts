import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

export const useClickAway = (
  element: MutableRefObject<HTMLElement | null>,
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const closeOpenMenus = (e: Event) => {
    if (!e?.target) return;
    if (element?.current && isOpen && !element.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('mousedown', closeOpenMenus);
    return () => {
      document.removeEventListener('mousedown', closeOpenMenus);
    };
  }, [element, isOpen]);
};
