export interface Props {
  children: React.ReactNode;
  styles?: React.CSSProperties;
  title: string;
  className?: string;
  zIndex?: number;
  onClose: () => void;
  open: boolean;
}