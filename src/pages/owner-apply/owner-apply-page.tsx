import { useRef, useState } from 'react';

import OwnerHeader from '@/pages/owner/components/owner-header';

const OwnerApplyPage = () => {
  const [fileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <main className="mx-auto min-h-dvh max-w-[1440px] overflow-hidden bg-gradient-to-b from-primary-10 to-white text-black md:[zoom:0.8]">
      <OwnerHeader />
      <section className="mx-auto w-full max-w-[1200px] px-5 pt-12 pb-20 md:px-10 md:pt-16 xl:px-0">
        <div className="mx-auto max-w-[1000px]">
          <h1 className="text-[34px] leading-[1.3] font-bold md:text-[44px]">
            우리 가게 제휴 신청
          </h1>
          <p className="mt-4 text-lg font-medium text-grey-5 md:text-xl">
            두 분이 함께 오실 때 제공할 혜택을 알려주세요.
          </p>
        </div>
        <form
          className="mx-auto mt-16 flex w-full max-w-[640px] flex-col gap-4 rounded-[24px] bg-white p-6 shadow-lg md:mt-20 md:p-10"
          onSubmit={(event) => {
            event.preventDefault();
            setIsSubmitted(true);
          }}
        >
          <label className="flex flex-col gap-2 font-bold">
            가게 이름
            <input
              className="h-[50px] rounded-[10px] border border-grey-2 px-5 font-normal outline-none focus:border-black"
              placeholder="예: 제기동 다정카페"
            />
          </label>
          <label className="flex flex-col gap-2 font-bold">
            네이버 지도 링크
            <input
              type="url"
              className="h-[50px] rounded-[10px] border border-grey-2 px-5 font-normal outline-none focus:border-black"
              placeholder="https://naver.me/…"
            />
          </label>
          <label className="flex flex-col gap-2 font-bold">
            제휴 혜택
            <textarea
              className="h-20 resize-none rounded-[10px] border border-grey-2 px-5 py-3 font-normal outline-none focus:border-black"
              placeholder="예: 두 분이 함께 방문하면 음료 10% 할인"
            />
          </label>
          <label className="flex flex-col gap-2 font-bold">
            사장님 연락처
            <input
              type="tel"
              className="h-[50px] rounded-[10px] border border-grey-2 px-5 font-normal outline-none focus:border-black"
              placeholder="010-1234-5678"
            />
          </label>
          <div className="flex flex-col gap-2 font-bold">
            <span>가게 사진</span>
            <div className="flex h-[50px] items-center rounded-[10px] border border-grey-2 px-5">
              <label className="flex h-full flex-1 cursor-pointer items-center">
                {fileName || '+ 사진 첨부'}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setFileName(file.name);
                  }}
                />
              </label>
              {fileName && (
                <button
                  type="button"
                  aria-label="첨부한 사진 삭제"
                  className="flex size-8 items-center justify-center rounded-full text-xl font-normal text-grey-5 hover:bg-grey-1"
                  onClick={() => {
                    setFileName('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  ×
                </button>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto mt-8 rounded-[10px] bg-black px-20 py-4 text-[22px] font-bold text-white"
          >
            제휴 신청하기
          </button>
          {isSubmitted && (
            <p className="text-center font-semibold text-primary-100">
              제휴 신청이 접수됐어요.
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default OwnerApplyPage;
