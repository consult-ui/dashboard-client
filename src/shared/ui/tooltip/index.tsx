import styles from './Tooltip.module.css';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

const Tooltip = ({ children, content }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = (event: React.MouseEvent) => {
    const { top, left, width } = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setCoords({ top: top, left: left + width / 2 });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (tooltipRef?.current) {
      const { width, height } = tooltipRef.current.getBoundingClientRect();
      setCoords((prevCoords) => ({
        top: prevCoords.top - height - 3,
        left: prevCoords.left - width / 2,
      }));
    }
  }, [isVisible]);

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'flex', cursor: 'pointer' }}
      >
        {children}
      </div>
      {isVisible &&
        ReactDOM.createPortal(
          <div className={styles.tooltip} ref={tooltipRef} style={{ top: `${coords.top}px`, left: `${coords.left}px` }}>
            {content}
          </div>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
