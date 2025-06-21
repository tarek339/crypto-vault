import { BasicAlertProps } from "@/interfaces/shared";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const BasicAlert = ({ icon, title, description, variant }: BasicAlertProps) => {
  return (
    <Alert variant={variant}>
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default BasicAlert;
