import { useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { isAxiosError } from 'axios';
import { sendCallRequest } from '@/pages/message/api/send-call-request';

import MessageComplete from '@/pages/message/components/message-complete';
import MessageInput from '@/pages/message/components/message-input';
import AppBar from '@/shared/components/app-bar';
import ServiceEntryButton from '@/shared/components/service-entry-button';
import type { MatchingProfile } from '@/shared/types/matching-profile';
import { ROUTES } from '@/shared/constants/routes';

const MessagePage = () => {
  const navigate = useNavigate();
  const { targetId } = useParams();
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const profile: MatchingProfile | undefined = location.state?.profile;
  const canSend = !isSending && Array.from(message.trim()).length <= 50;

  if (!profile || profile.id !== Number(targetId))
    return <Navigate to={ROUTES.MATCHING} replace />;

  if (isSent)
    return (
      <MessageComplete
        profile={profile}
        hasMessage={Boolean(message.trim())}
        onConfirm={() => navigate(ROUTES.MATCHING, { replace: true })}
      />
    );

  return (
    <main className="flex flex-1 flex-col pb-7">
      <AppBar title="매칭하기" onBack={() => navigate(ROUTES.MATCHING)} />
      <form
        className="flex flex-1 flex-col justify-between gap-8 px-5 pt-2.5"
        onSubmit={async (event) => {
          event.preventDefault();
          if (!canSend) return;
          setIsSending(true);
          setErrorMessage('');
          try {
            await sendCallRequest(profile.id, message);
            setIsSent(true);
          } catch (error) {
            const code = isAxiosError(error) && error.response?.data?.code;
            if (code === 'REQ-E002' || code === 'GLB-E009')
              navigate(ROUTES.MATCHING, { replace: true });
            else setErrorMessage('보내지 못했어요. 다시 시도해 주세요.');
          } finally {
            setIsSending(false);
          }
        }}
      >
        <div className="flex flex-col gap-5">
          <h1 className="text-title-b-22">
            상대에게 보낼
            <br />
            짧은 쪽지를 작성해주세요
          </h1>
          <fieldset disabled={isSending}>
            <MessageInput value={message} onChange={setMessage} />
          </fieldset>
          {errorMessage && <p role="alert">{errorMessage}</p>}
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
