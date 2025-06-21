import { ContainerProps } from "@/interfaces/components";

const LayoutContainer = ({ children }: ContainerProps) => {
  return (
    <div className="m-auto flex max-w-3xl flex-col gap-10 px-5 pt-8 lg:max-w-screen-2xl lg:flex-row lg:items-start lg:justify-between lg:pt-52">
      {children}
    </div>
  );
};

export default LayoutContainer;
