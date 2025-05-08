export interface PageProps {
  title?: React.ReactNode;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  rowSpan?: number;
  colSpan?: number;
  onClick?: () => void;
}
