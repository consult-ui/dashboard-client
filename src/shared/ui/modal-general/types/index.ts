export interface Props {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  title?: string;
  className?: string;
  zIndex?: number;
  visibleCloseButton?: boolean;
  onClose: () => void;
  open: boolean;
  gradient?: boolean;
}
