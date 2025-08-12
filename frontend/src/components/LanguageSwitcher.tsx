// components/LanguageSwitcher.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { locales } from '../i18n/config';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = pathname.split('/')[1]; // 提取当前语言

  const handleChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale; // 替换语言段
    const newPath = segments.join('/');
    router.push(newPath);
  };

  return (
    <div className="flex gap-2 p-2">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`border px-3 py-1 rounded ${
            locale === currentLocale ? 'bg-black text-white' : 'bg-white text-black'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
