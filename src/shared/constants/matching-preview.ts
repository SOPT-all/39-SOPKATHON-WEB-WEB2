import imgMatchingMan from '@/shared/assets/images/img-matching-man.png';
import imgMatchingWoman from '@/shared/assets/images/img-matching-woman.png';
import type { MatchingProfile } from '@/shared/types/matching-profile';

// 뷰 확인용 데이터예요. API 연동 시 서버 응답으로 교체해요.
export const MATCHING_PREVIEW_PROFILES: MatchingProfile[] = [
  { id: 1, name: '김철수', age: 64, distanceKm: 2, imageUrl: imgMatchingMan },
  { id: 2, name: '이영애', age: 66, distanceKm: 2, imageUrl: imgMatchingWoman },
];
