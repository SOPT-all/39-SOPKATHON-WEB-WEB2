import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';

import MessageComplete from '@/pages/message/components/message-complete';
import MessageInput from '@/pages/message/components/message-input';
import AppBar from '@/shared/components/app-bar';
import ServiceEntryButton from '@/shared/components/service-entry-button';
import { MATCHING_PREVIEW_PROFILES } from '@/shared/constants/matching-preview';
import { ROUTES } from '@/shared/constants/routes';

const MessagePage = () => {
  const navigate = useNavigate();
  const { targetId } = useParams();
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const profile = MATCHING_PREVIEW_PROFILES.find(
    (item) => item.id === Number(targetId),
  );
  const canSend = message.trim().length > 0 && Array.from(message).length <= 50;

  if (!profile) return <Navigate to={ROUTES.MATCHING} replace />;

  if (isSent)
    return (
      <MessageComplete
        profile={profile}
        onConfirm={() => navigate(ROUTES.MATCHING, { replace: true })}
      />
    );

  return (
    <main className="flex flex-1 flex-col pb-7">
      <AppBar title="매칭하기" onBack={() => navigate(ROUTES.MATCHING)} />
      <form
        className="flex flex-1 flex-col justify-between gap-8 px-5 pt-2.5"
        onSubmit={(event) => {
          event.preventDefault();
          if (canSend) setIsSent(true);
        }}
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-title-b-22">
            상대에게 보낼
            <br />
            짧은 쪽지를 작성해주세요
          </h1>
          <MessageInput value={message} onChange={setMessage} />
        </div>
        <ServiceEntryButton
          type="submit"
          status={canSend ? 'active' : 'disabled'}
        >
          쪽지 보내기
        </ServiceEntryButton>
      </form>
    </main>
  );
};

export default MessagePage;
