export const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full h-dvh pt-[65px] gap-x-4">
      {children}
    </div>
  );
};
