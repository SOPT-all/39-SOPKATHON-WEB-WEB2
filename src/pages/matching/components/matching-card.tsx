import Button from '@/shared/components/button';
import type { MatchingProfile } from '@/shared/types/matching-profile';

interface MatchingCardProps {
  profile: MatchingProfile;
  onMessage: () => void;
}

const MatchingCard = ({ profile, onMessage }: MatchingCardProps) => {
  return (
    <article className="relative flex h-89.5 w-full items-end overflow-hidden rounded-[10px]">
      <img
        src={profile.imageUrl}
        alt={`${profile.name}님의 프로필`}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="relative flex h-37 w-full flex-col justify-center gap-2.5 bg-gradient-black p-5">
        <div className="h-12.5">
          <h2 className="text-title-b-20 text-white">
            {profile.name} {profile.age}
          </h2>
          <p className="flex gap-2 text-text-m-12 text-grey-3">
            <span>나와의 거리</span>
            <span>{profile.distanceKm}km</span>
          </p>
        </div>
        <Button color="white" className="w-full" onClick={onMessage}>
          쪽지걸기
        </Button>
      </div>
    </article>
  );
};

export default MatchingCard;
