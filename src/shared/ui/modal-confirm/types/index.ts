export type Props = {
  open: boolean;
  onClose: () => void;
  styles?: React.CSSProperties;
  zIndex?: number;
  className?: string;
  desc?: string;
};