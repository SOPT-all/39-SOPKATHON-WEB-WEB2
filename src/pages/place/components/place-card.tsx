import type { Place } from '@/pages/place/types';
import IcArrowRight from '@/shared/assets/icons/ic-arrow-right.svg?react';

interface PlaceCardProps {
  place: Place;
}

// 안심장소 한 곳을 보여 주는 카드예요. 사진, 이름, 주소, 거리, 지도 링크, 제휴 혜택이 들어가요.
const PlaceCard = ({ place }: PlaceCardProps) => {
  return (
    <article className="flex flex-col gap-2.5 border-b border-grey-1 py-4">
      <div className="flex items-center gap-2">
        {place.imageUrl ? (
          <img
            src={place.imageUrl}
            alt=""
            className="size-18.75 shrink-0 rounded-[10px] object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="size-18.75 shrink-0 rounded-[10px] bg-grey-2"
          />
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-col">
            <div className="flex items-end justify-between gap-2">
              <h2 className="truncate text-title-sb-18 text-black">
                {place.name}
              </h2>
              <p className="shrink-0 text-text-m-12 text-grey-3">
                {place.distance.toFixed(1)}KM
              </p>
            </div>
            <p className="truncate text-text-m-14 text-grey-5">
              {place.address}
            </p>
          </div>
          <a
            href={place.naverMapUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 self-start text-text-m-12 text-primary-100"
          >
            지도보기
            <IcArrowRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </div>
      <p className="flex items-center gap-2 rounded-[10px] bg-grey-1 px-4 py-2.5 text-black">
        <span className="shrink-0 text-text-sb-12">제휴 혜택</span>
        <span className="min-w-0 flex-1 truncate text-text-m-12">
          {place.benefitText}
        </span>
      </p>
    </article>
  );
};

export default PlaceCard;
