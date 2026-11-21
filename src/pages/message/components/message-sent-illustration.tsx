import imgBridge from '@/shared/assets/images/img-message-bridge.svg';
import imgBirdLeft from '@/shared/assets/images/img-message-bird-left.svg';
import imgBirdRight from '@/shared/assets/images/img-message-bird-right.svg';
import imgHeart from '@/shared/assets/images/img-message-heart.svg';

import '@/pages/message/components/message-sent-illustration.css';

const MessageSentIllustration = () => {
  return (
    <div
      role="img"
      aria-label="새 두 마리를 이어주는 오작교"
      className="relative h-57.25 w-93.75 max-w-full shrink-0 overflow-hidden"
    >
      <div className="message-bridge absolute top-[106.49px] left-13 h-[61.512px] overflow-hidden">
        <img src={imgBridge} alt="" className="max-w-none" />
      </div>
      <img
        src={imgBirdLeft}
        alt=""
        className="message-bird-left absolute top-[22.74%] left-[32.3%] max-w-none"
      />
      <img
        src={imgBirdRight}
        alt=""
        className="message-bird-right absolute top-[22.74%] left-[54.54%] max-w-none"
      />
      <img
        src={imgHeart}
        alt=""
        className="message-heart absolute top-[20.09%] left-[51.06%] max-w-none"
      />
    </div>
  );
};

export default MessageSentIllustration;
