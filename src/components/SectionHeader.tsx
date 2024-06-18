interface SectionHeaderProps {
  title?: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="relative mt-[100px] mb-10">
      <h1 className="text-3xl text-primary font-semibold  bg-bg-color pe-5 w-fit relative z-10">
        {title}
      </h1>
      <div className="absolute right-0 top-[40%] z-0 h-[2px] mt-2 w-full bg-primary rounded-full"></div>
    </div>
  );
};

export default SectionHeader;
