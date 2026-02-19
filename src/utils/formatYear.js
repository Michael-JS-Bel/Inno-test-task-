import { TEXT_CONSTANTS } from '@/constants';

export function formatPublishYear(year, fallback = TEXT_CONSTANTS.YEAR_EM_DASH) {
  if (year == null || year === '') return fallback;
  return String(year);
}
