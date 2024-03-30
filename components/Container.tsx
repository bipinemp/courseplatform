interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto max-w-[1920px] px-4 md:px-10 xl:px-14 2xl:ml-80">
      {children}
    </div>
  );
}
