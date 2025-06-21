import { fetchBalance } from "@/actions/crypto/fetchBalance";
import { Balance, Course } from "@/components/layouts";
import { SubTitle } from "@/components/shared";
import { Params, UserProps } from "@/interfaces/interfaces";
import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";
import { DollarSign, Euro, LucideBitcoin } from "lucide-react";

const page = async ({ params }: Params) => {
  await connectToDb();

  const id = (await params)?.id;
  const user: UserProps | null = await User.findById(id);
  const balance = await fetchBalance(user?.wallet.address ?? "");
  // const price = await fetchPrice();
  // const exchangeRate = await fetchExchangeRate();

  return (
    <div className="m-auto mt-12 flex max-w-screen-lg justify-center px-5">
      <div className="flex w-full flex-col items-center gap-5">
        <SubTitle title="Crypto Balance" />

        <Balance
          balance={balance?.toString() ?? ""}
          price={""}
          exchangeRate=""
        />

        <div className="flex flex-wrap items-center justify-center gap-5">
          <Course
            icon={<LucideBitcoin size={18} />}
            bgColor={"bg-crypto-btc"}
            crypto={"Bitcooin"}
            euro={
              <span className="flex items-center gap-0.5">
                91000,00 <Euro size={20} />
              </span>
            }
            dollar={
              <span className="flex items-center gap-0.5">
                94000,00 <DollarSign size={20} />
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default page;
