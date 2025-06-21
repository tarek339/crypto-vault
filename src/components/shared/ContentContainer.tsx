import { ContainerProps } from "@/interfaces/components";

const ContentContainer = ({ children, className }: ContainerProps) => {
  return (
    <div className={`flex flex-col gap-5 lg:w-6/12 ${className}`}>
      {children}
    </div>
  );
};

export default ContentContainer;
