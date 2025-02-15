'use client';

import { Select, SelectItem } from '@nextui-org/select';
import { Language } from '@bigfive-org/questions';
import { useRouter, usePathname } from '@/navigation';

interface TestLanguageSwitchProps {
  availableLanguages: Language[];
  language: string;
}

export const TestLanguageSwitch = ({
  availableLanguages,
  language
}: TestLanguageSwitchProps) => {
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
        aria-label='Select survey language'
        size='sm'
        name='localeSelectSmall'
        className='w-48'
        label='Survey language'
        items={availableLanguages}
      >
        {(item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.text}
          </SelectItem>
        )}
      </Select>
    </div>
  );
};
