import React from "react";
import { cn } from "@/lib/utils";

type TypographyProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  children: React.ReactNode;
};

const typographyVariants = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  span: "",
};

export function Typography({ as = "p", className, children }: TypographyProps) {
  const Component = as;
  const styles = typographyVariants[as] || "";

  return <Component className={cn(styles, className)}>{children}</Component>;
}
