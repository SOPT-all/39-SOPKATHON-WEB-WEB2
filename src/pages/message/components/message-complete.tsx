import MessageSentIllustration from '@/pages/message/components/message-sent-illustration';
import ServiceEntryButton from '@/shared/components/service-entry-button';
import type { MatchingProfile } from '@/shared/types/matching-profile';

interface MessageCompleteProps {
  profile: MatchingProfile;
  hasMessage: boolean;
  onConfirm: () => void;
}

const MessageComplete = ({
  profile,
  hasMessage,
  onConfirm,
}: MessageCompleteProps) => {
  return (
    <main className="flex flex-1 flex-col items-center pt-12.75 pb-4.5">
      <MessageSentIllustration />
      <h1
        className="text-center text-title-b-22 text-grey-9"
        tabIndex={-1}
        ref={(node) => node?.focus()}
      >
        상대방에게
        <br />
        {hasMessage ? '번호와 쪽지를 보냈어요!' : '번호를 보냈어요!'}
      </h1>
      <div className="mt-auto flex w-full flex-col gap-2.5 px-5 pt-7.25">
        <section
          aria-label="상대의 프로필"
          className="flex flex-col gap-2 rounded-[10px] bg-primary-10 px-5 py-4"
        >
          <h2 className="text-text-sb-14 text-primary-50">상대의 프로필</h2>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-title-b-20 text-primary-100">
              {profile.name} {profile.age}
            </p>
            <p className="flex gap-2 text-text-m-14 text-grey-6">
              <span className="text-text-sb-14">나와의 거리</span>
              <span>{profile.distanceKm}km</span>
            </p>
          </div>
        </section>
        <ServiceEntryButton onClick={onConfirm}>확인</ServiceEntryButton>
      </div>
    </main>
  );
};

export default MessageComplete;
