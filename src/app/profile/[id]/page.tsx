import { ChangePassword, DeleteUser, Privatkey } from "@/components/layouts";
import { SubTitle } from "@/components/shared";
import { Params } from "@/interfaces/interfaces";
import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";

const page = async ({ params }: Params) => {
  await connectToDb();

  const id = (await params).id ?? "";
  const user = await User.findById(id);

  return (
    <div className="m-auto mt-12 flex w-full max-w-screen-sm flex-col gap-5 px-5">
      <SubTitle title="Account Management" center />

      <Privatkey privateKey={user?.wallet.privateKey} />
      {/* <ChangeUserName id={id ?? ""} /> */}
      <ChangePassword id={id ?? ""} />

      <div className="flex justify-end">
        <DeleteUser id={id ?? ""} />
      </div>
    </div>
  );
};

export default page;
