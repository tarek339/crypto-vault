import { TextProps } from "@/interfaces/shared";

const Text = ({ text }: TextProps) => {
  return <p className="text-lg">{text}</p>;
};

export default Text;
