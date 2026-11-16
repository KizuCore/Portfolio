type Props = { small?: boolean; className?: string };

export default function LoadingSpinner({ small = false, className = "" }: Props) {
  return <span aria-hidden="true" className={`inline-block shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none ${small ? "size-4" : "size-6"} ${className}`} />;
}
