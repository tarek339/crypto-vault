import { TitleProps } from "@/interfaces/shared";

const SubTitle = ({ title, center, className }: TitleProps) => {
  return (
    <h2
      className={`text-2xl font-semibold ${
        center ? "text-center" : ""
      } ${className}`}
    >
      {title}
    </h2>
  );
};

export default SubTitle;
