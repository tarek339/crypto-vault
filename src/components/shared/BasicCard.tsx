import { BasicCardProps } from "@/interfaces/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const BasicCard = ({
  title,
  description,
  subdescription,
  children,
}: BasicCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {subdescription && (
          <CardDescription className="text-muted-foreground">
            {subdescription}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BasicCard;
