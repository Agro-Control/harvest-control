"use client";

import { CookiesProvider } from "next-client-cookies/server";

export const ClientCookiesProvider: typeof CookiesProvider = (props) => (
  <CookiesProvider {...props} />
);