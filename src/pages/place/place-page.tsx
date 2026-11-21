import PlaceCard from '@/pages/place/components/place-card';
import { PLACE_PREVIEW_LIST } from '@/pages/place/constants/place-preview';

const PlacePage = () => {
  return (
    <main className="flex flex-1 flex-col gap-2.5 px-5 pt-5">
      <header className="flex items-center justify-between gap-2">
        <h1 className="shrink-0 text-title-b-22 text-black">안심장소</h1>
        <p className="truncate text-title-m-16 text-grey-4">
          분위기 좋은 장소 추천이에요.
        </p>
      </header>
      <ul className="flex flex-col">
        {PLACE_PREVIEW_LIST.map((place) => (
          <li key={place.placeId}>
            <PlaceCard place={place} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default PlacePage;
