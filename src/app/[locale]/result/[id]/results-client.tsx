'use client';

import { Snippet } from '@nextui-org/snippet';
import { useTranslations } from 'next-intl';
import { title } from '@/components/primitives';
import { BarChart } from '@/components/bar-chart';
import { Link } from '@/navigation';
import ReportLanguageSwitch from './report-language-switch';
import ShareBar from '@/components/share-bar';
import { DomainTabs } from './domain-tabs';
import { Chip } from '@nextui-org/react';
import { Report } from '@/actions';

interface ResultsProps {
  report: Report;
  showExpanded?: boolean;
}

export default function Results({ report, showExpanded }: ResultsProps) {
  const t = useTranslations('results');

  return (
    <>
      <div className='flex'>
        <div className='flex-grow'>
          <ReportLanguageSwitch
            language={report.language}
            id={report.id}
            availableLanguages={report.availableLanguages}
          />
        </div>
        <Chip>{new Date(report.timestamp).toLocaleDateString()}</Chip>
      </div>
      <div className='text-center mt-4'>
        <span className='font-bold'>{t('important')}</span> &nbsp;
        {t('saveResults')} &nbsp;
        <Link href={`/compare/?id=${report.id}`} className='underline'>
          {t('compare')}
        </Link>{' '}
        &nbsp;
        {t('toOthers')}
      </div>
      <div className='flex mt-4'>
        <Snippet
          hideSymbol
          color='danger'
          className='w-full justify-center'
          size='lg'
        >
          {report.id}
        </Snippet>
      </div>
      <div className='flex mt-5 justify-end w-full gap-x-1 print:hidden'>
        <ShareBar report={report} />
      </div>
      <div className='flex mt-10'>
        <h1 className={title()}>{t('theBigFive')}</h1>
      </div>
      <BarChart max={120} results={report.results} />
      <DomainTabs
        results={report.results}
        showExpanded={!!showExpanded}
        scoreText={t('score')}
      />
    </>
  );
} 