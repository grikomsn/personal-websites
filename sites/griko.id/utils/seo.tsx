import * as React from "react";

import { NextSeo, NextSeoProps } from "next-seo";

export function useSeo<T>(props: T & NextSeoProps) {
  function Seo(extraProps: NextSeoProps) {
    return <NextSeo {...props} {...extraProps} />;
  }

  return { Seo, ...props };
}