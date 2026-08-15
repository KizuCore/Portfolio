import type { ComponentType, ReactNode, SVGProps } from "react";

type IconLinkProps = {
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  children?: ReactNode;
  className: string;
  ariaLabel?: string;
  iconClassName?: string;
  external?: boolean;
};

function IconLink({
  href,
  icon: Icon,
  children,
  className,
  ariaLabel,
  iconClassName,
  external = href.startsWith("http"),
}: IconLinkProps) {
  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
    >
      <Icon aria-hidden="true" className={iconClassName} />
      {children}
    </a>
  );
}

export default IconLink;
