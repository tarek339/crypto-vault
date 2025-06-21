import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseProps } from "@/interfaces/components";
import { TrendingUp } from "lucide-react";

const Course = ({ icon, crypto, euro, dollar, bgColor }: CourseProps) => {
  return (
    <Card className="w-[220px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-start gap-2 py-2 text-xl">
          <div className={`rounded-full ${bgColor} p-1`}>{icon}</div>
          {crypto}
          <TrendingUp color="#14a44d" size={24} />
        </CardTitle>
        <CardDescription className="flex items-center justify-start gap-1 text-lg">
          {euro}
        </CardDescription>
        <CardDescription className="flex items-center justify-start gap-1 text-lg">
          {dollar}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default Course;
