export interface PageProps {
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onScroll?: (isScrolled: boolean) => void;
}
