import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemWidth?: number;
  gap?: number;
}

export function Carousel<T>({
  items,
  renderItem,
  itemWidth = 280,
  gap = 20,
}: CarouselProps<T>) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = itemWidth + gap;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={styles.carouselWrapper}>
      <div
        ref={scrollRef}
        style={{
          ...styles.scrollContainer,
          gap: `${gap}px`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} style={{ flexShrink: 0 }}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      <div style={styles.controlsRow}>
        <div style={styles.navControls}>
          <button
            type="button"
            onClick={() => handleScroll('left')}
            style={styles.arrowBtn}
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll('right')}
            style={styles.arrowBtn}
            aria-label="Próximo"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  carouselWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    paddingBottom: '10px',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  controlsRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navControls: {
    display: 'flex',
    gap: '10px',
  },
  arrowBtn: {
    backgroundColor: '#7c3aed',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
    transition: 'transform 0.1s, background-color 0.2s',
  },
};