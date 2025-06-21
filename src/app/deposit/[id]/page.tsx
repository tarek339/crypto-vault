import Deposit from "@/components/layouts/crypto/Deposit";
import { Alert, Card, CopyButton, Input, SubTitle } from "@/components/shared";
import { Params } from "@/interfaces/interfaces";
import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";
import { CircleAlert } from "lucide-react";

const page = async ({ params }: Params) => {
  await connectToDb();
  const id = (await params).id;
  const user = await User.findById(id);

  return (
    <div className="m-auto mt-12 flex max-w-screen-sm flex-col justify-between gap-5 px-5">
      <SubTitle title="Deposit BTC Currency" center />
      <Card
        title={"Wallet address"}
        description={
          "This is your wallet address. Use it to receive BTC currency."
        }
        subdescription="Copy and paste it into the wallet where you send the currency."
      >
        <div className="flex flex-col gap-5">
          <Alert
            variant="warning"
            icon={<CircleAlert className="h-4 w-4" />}
            title={"Use an address only once for each transaction"}
            description={` 
            To protect your privacy and security, we are changing your wallet address after each transaction.
            This means that you will have a new address for each deposit you make.
            This is a standard practice in the cryptocurrency world and helps to keep your transactions anonymous.
            `}
          />
          <Alert
            variant="warning"
            icon={<CircleAlert className="h-4 w-4" />}
            title={"Caution"}
            description={` 
           By entering a wrong address, you lose your funds.
           Please double-check the address before sending any funds.
           No recovery or reset is possible.
            `}
          />
          <Input
            name={""}
            type={"text"}
            readOnly
            value={user?.wallet.address}
            label="Use this address to receive BTC currency"
          />
          <CopyButton value={user?.wallet.address} title={"Copy Address"} />
          <Deposit id={id} />
        </div>
      </Card>
    </div>
  );
};

export default page;
