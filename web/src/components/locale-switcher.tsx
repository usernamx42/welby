'use client';
import { useLocale } from 'next-intl';
import { languages } from '../config/site';
import { Select, SelectItem } from '@nextui-org/select';
import { useRouter, usePathname } from '../navigation';

// Helper: build a new URL string with the selected locale
function buildLocalizedPath(path: string, nextLocale: string): string {
  const localeCodes = languages.map((lang) => lang.code);
  const segments = path.split('/');
  // If the second segment is a valid locale code, replace it with nextLocale
  if (segments[1] && localeCodes.includes(segments[1])) {
    segments[1] = nextLocale;
    return segments.join('/') || '/';
  }
  // Otherwise, if there is no locale segment, add the nextLocale prefix if it isn't the default (assumed 'en')
  if (nextLocale !== 'en') {
    return `/${nextLocale}${path === '/' ? '' : path}`;
  }
  return path;
}

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(value: string | string[]) {
    const nextLocale = Array.isArray(value) ? value[0] : value;
    const currentPath = pathname || '/';
    // Build a new URL string with the chosen locale
    const newPath = buildLocalizedPath(currentPath, nextLocale);
    router.replace(newPath);
  }
  return (
    <div className='w-20'>
      <Select
        selectedKeys={[locale]}
        onChange={onSelectChange}
        aria-label='Select language'
        name='localeSelectSmall'
      >
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code} textValue={lang.code}>
            {lang.code}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
