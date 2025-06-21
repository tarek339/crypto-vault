import { TitleProps } from "@/interfaces/shared";

const Title = ({ title, className }: TitleProps) => {
  return (
    <h1
      className={`text-2xl font-semibold xs:text-3xl lg:text-5xl ${className}`}
    >
      {title}
    </h1>
  );
};

export default Title;
