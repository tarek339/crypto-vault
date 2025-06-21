import { fetchTransactions } from "@/actions/crypto/fetchTransactions";
import { Transactions } from "@/components/layouts";
import { SubTitle } from "@/components/shared";
import { Params, UserProps } from "@/interfaces/interfaces";
import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";

const page = async ({ params }: Params) => {
  await connectToDb();

  const id = (await params).id;
  const user: UserProps | null = await User.findById(id);
  const history = await fetchTransactions(user?.wallet.address ?? "", 1);

  return (
    <div className="m-auto mt-12 flex max-w-screen-lg justify-center px-5">
      <div className="flex w-full flex-col items-center gap-5">
        <SubTitle title="Transaction History" />
        <Transactions history={history} />
      </div>
    </div>
  );
};

export default page;
