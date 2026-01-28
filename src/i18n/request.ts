import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale = "hr" }) => {
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
