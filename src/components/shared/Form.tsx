import { FormProps } from "@/interfaces/shared";

const Form = ({ action, children, onSubmit }: FormProps) => {
  return (
    <form
      action={action}
      onSubmit={onSubmit}
      className="grid w-full items-center gap-4"
    >
      {children}
    </form>
  );
};

export default Form;
