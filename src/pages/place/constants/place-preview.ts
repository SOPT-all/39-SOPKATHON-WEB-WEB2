import type { Place } from '@/pages/place/types';

// 뷰 확인용 데이터예요. API 연동 시 서버 응답으로 교체해요.
export const PLACE_PREVIEW_LIST: Place[] = [
  {
    placeId: 1,
    name: '핵밥 건대본점',
    imageUrl: null,
    address: '광진구 능동로 127',
    distance: 1,
    benefitText: '시니어 커플 5% 할인',
    naverMapUrl: 'https://map.naver.com',
  },
  {
    placeId: 2,
    name: '제스티 살룬 새우버거 건대 본점',
    imageUrl: null,
    address: '광진구 능동로 26',
    distance: 1,
    benefitText: '시니어 커플 사이다 무료',
    naverMapUrl: 'https://map.naver.com',
  },
  {
    placeId: 3,
    name: '우리집',
    imageUrl: null,
    address: '광진구 능동로 98',
    distance: 2,
    benefitText: '시니어 커플 10% 할인',
    naverMapUrl: 'https://map.naver.com',
  },
  {
    placeId: 4,
    name: '카페 오작교',
    imageUrl: null,
    address: '광진구 아차산로 200',
    distance: 2.5,
    benefitText: '시니어 커플 음료 1잔 무료',
    naverMapUrl: 'https://map.naver.com',
  },
];
