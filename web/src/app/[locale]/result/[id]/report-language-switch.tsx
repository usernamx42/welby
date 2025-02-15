'use client';

import { Select, SelectItem } from '@nextui-org/select';
import { Language } from '@bigfive-org/results';
import { useRouter, usePathname } from '@/navigation';

export const ReportLanguageSwitch = ({
  language,
  availableLanguages
}: {
  language: string;
  availableLanguages: Language[];
}) => {
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(value: string | string[]) {
    const selectedLanguage = Array.isArray(value) ? value[0] : value;
    const currentPath = pathname || '/';
    router.push(`${currentPath}?lang=${selectedLanguage}`);
    router.refresh();
  }

  return (
    <div className='w-30'>
      <Select
        defaultSelectedKeys={[language]}
        onChange={onSelectChange}
        aria-label='Select language'
        name='localeSelectSmall'
        className='w-48'
        size='sm'
        label='Report language'
      >
        {availableLanguages.map((lang) => (
          <SelectItem key={lang.id} value={lang.id} textValue={lang.text}>
            {lang.text}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
