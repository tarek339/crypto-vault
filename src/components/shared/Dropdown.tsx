import { DropdownProps } from "@/interfaces/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Dropdown = ({ dropDownItems }: DropdownProps) => {
  return (
    <Accordion type="single" collapsible className="w-full lg:w-[600px]">
      {dropDownItems.map((item, i) => {
        return (
          <AccordionItem key={i} value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Dropdown;
