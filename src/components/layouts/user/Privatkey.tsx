import { Alert, Card, CopyButton, Input } from "@/components/shared";
import { CircleAlert } from "lucide-react";

export interface PrivatkeyProps {
  privateKey: string;
}

const Privatkey = ({ privateKey }: PrivatkeyProps) => {
  return (
    <Card
      title={"Privatkey"}
      description={
        "The private key to reset your wallet if you lose access to it."
      }
    >
      <div className="flex flex-col gap-5">
        <Alert
          variant="warning"
          icon={<CircleAlert className="h-4 w-4" />}
          title={"Copy this private key and keep it safe!"}
          description={` 
        If you lose access to your wallet, you can use this private key to reset it.
        If you lose this private key, you will lose access to your wallet and all your funds.
        Do not share this private key with anyone.
        `}
        />
        <Input
          name={""}
          type={"text"}
          readOnly
          value={privateKey}
          label="Privat key"
        />
        <CopyButton value={privateKey} title={"Copy Private Key"} />
      </div>
    </Card>
  );
};

export default Privatkey;
