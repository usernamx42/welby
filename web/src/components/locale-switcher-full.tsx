'use client';
import { useLocale } from 'next-intl';
import { languages, type Language } from '../config/site';
import { Select, SelectItem } from '@nextui-org/select';
import { Avatar } from '@nextui-org/avatar';
import { useRouter, usePathname } from '../navigation';

// Helper: build a new URL string with the selected locale
function buildLocalizedPath(path: string, nextLocale: string): string {
  const localeCodes = languages.map((lang) => lang.code);
  const segments = path.split('/');
  // If the path already starts with a locale then replace it
  if (segments[1] && localeCodes.includes(segments[1])) {
    segments[1] = nextLocale;
    return segments.join('/') || '/';
  }
  // If no locale segment exists, add it when it's not the default ('en')
  if (nextLocale !== 'en') {
    return `/${nextLocale}${path === '/' ? '' : path}`;
  }
  return path;
}

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Updated onSelectChange to accept the selected value directly.
  function onSelectChange(value: string | string[]) {
    const nextLocale = Array.isArray(value) ? value[0] : value;
    const currentPath = pathname || '/';
    // Build a new URL string with the desired locale instead of passing an options object.
    const newPath = buildLocalizedPath(currentPath, nextLocale);
    router.replace(newPath);
  }
  const usedLocale = languages.find((lang) => lang.code === locale) || {
    name: 'English',
    code: 'en',
    countryCode: 'us'
  };
  const countryAvatar = (lang: Language) =>
    lang.countryCode ? (
      <Avatar
        alt={lang.name}
        className='w-6 h-6'
        src={`/flags/${lang.countryCode}.svg`}
      />
    ) : (
      <Avatar
        alt={lang.name}
        className='w-6 h-6'
        name={lang.code.toUpperCase()}
      />
    );
  return (
    <div className='w-40'>
      <Select
        name='localeSelect'
        selectedKeys={[locale]}
        onChange={onSelectChange}
        aria-label='Select language'
        startContent={countryAvatar(usedLocale)}
      >
        {languages.map((lang) => (
          <SelectItem
            key={lang.code}
            value={lang.code}
            textValue={lang.name}
            startContent={countryAvatar(lang)}
          >
            {lang.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
