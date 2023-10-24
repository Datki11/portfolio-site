import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

type CustomLinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export default function CustomLink(props: CustomLinkProps) {
  const { className, href, ...rest } = props;
  return (
    <a
      href={href ?? "#"}
      className={`underline hover:no-underline ${className}`}
      {...rest}
    />
  );
}
