import { ReactNode } from "react";
import { usePlausible } from "next-plausible";

type TrackedLinkProps = {
  id: string;
  href: string;
  className?: string;
  children: ReactNode;
};

// Track external clicks on links using plausible
export default function TrackedLink({ id, href, className, children }: TrackedLinkProps) {
  const plausible = usePlausible();
  console.log(id);

  return (
    <a
      href={href}
      target="_blanck"
      rel="noreferrer"
      className={className}
      onClick={() => plausible("click", { props: { id } })}
    >
      {children}
    </a>
  );
}
