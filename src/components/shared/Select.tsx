import { SelectProps } from "@/interfaces/shared";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const BasicSelect = ({
  onValueChange,
  placeholder,
  selectItems,
  name,
  label,
  error,
  readonly,
}: SelectProps) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label className="text-sm" htmlFor={name}>
        {label}
      </Label>
      <Select name={name} onValueChange={onValueChange} disabled={readonly}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="pl-1.5 text-xs tracking-wide text-destructive">
        {error}
      </span>
    </div>
  );
};

export default BasicSelect;
