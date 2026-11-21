import { LottieLight } from 'lottie-react';

import lottieLovebirds from '@/shared/assets/lotties/lottie-lovebirds.json';
import { cn } from '@/shared/utils/cn';

interface LovebirdsAnimationProps {
  className?: string;
}

// 다리가 펼쳐지고 새 두 마리와 하트가 차례로 나타나는 애니메이션이에요. 한 번만 재생돼요.
// 원본 크기는 375×229이고, className으로 너비를 정하면 비율대로 커져요.
const LovebirdsAnimation = ({ className }: LovebirdsAnimationProps) => {
  return (
    <div aria-hidden="true" className={cn('aspect-375/229 w-full', className)}>
      {/* lottie-react가 자체 스타일을 넣어서, 크기와 위치는 바깥 div에서 정해요. */}
      <LottieLight
        src={lottieLovebirds}
        autoplay
        loop={false}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LovebirdsAnimation;
