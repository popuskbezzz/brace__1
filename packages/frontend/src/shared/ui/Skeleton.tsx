import { clsx } from 'clsx';

type Props = {
  className?: string;
};

export const Skeleton = ({ className }: Props) => (
  <div className={clsx('animate-pulse rounded bg-white/10', className)} />
);
