import ServiceEntryButton from '@/shared/components/service-entry-button';

const HomePage = () => {
  return (
    <main className="flex min-h-dvh items-center justify-center p-5">
      <section className="flex w-full max-w-[1077px] gap-[18px] rounded-[5px] border border-purple-500 p-5">
        <ServiceEntryButton status="active" showArrow />
        <ServiceEntryButton status="disabled" />
        <ServiceEntryButton status="status3" />
      </section>
    </main>
  );
};

export default HomePage;
