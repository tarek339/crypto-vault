import { InputProps } from "@/interfaces/shared";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const InputField = ({
  label,
  placeholder,
  name,
  type,
  error,
  readOnly,
  onChange,
}: InputProps) => {
  return (
    <div className="flex w-full flex-col space-y-1.5">
      <Label className="text-sm" htmlFor={name}>
        {label}
      </Label>
      <Input
        disabled={readOnly}
        type={type}
        id={name}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      <span className="pl-1.5 text-xs tracking-wide text-destructive">
        {error}
      </span>
    </div>
  );
};

export default InputField;
