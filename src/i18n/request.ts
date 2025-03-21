import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const localeCookie = cookies().get('NEXT_LOCALE')?.value || 'en';
  const locale = localeCookie;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
