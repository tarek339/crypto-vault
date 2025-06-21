import { fetchBalance } from "@/actions/crypto/fetchBalance";
import { SendCurrency } from "@/components/layouts";
import { Dropdown, SubTitle } from "@/components/shared";
import { Params } from "@/interfaces/interfaces";
import { connectToDb } from "@/lib/mongoose";
import { User } from "@/models/user";

const page = async ({ params }: Params) => {
  await connectToDb();

  const id = (await params).id;
  const user = await User.findById(id);
  const availableAmount = await fetchBalance(user?.wallet.address);

  return (
    <div className="m-auto mt-12 flex max-w-screen-sm flex-col justify-between gap-5 px-5">
      <SubTitle title="Send Currency" center />
      <SendCurrency
        id={id}
        availableAmount={availableAmount?.toString() ?? ""}
      />
      <Dropdown
        dropDownItems={[
          {
            value: "How to send currency",
            trigger: "How to send currency",
            content: (
              <ul>
                <li className="mb-2">
                  Enter a valid amount and recipient&apos;s wallet address.
                </li>
                <li className="mb-2">
                  Once all required information is entered, click the submit
                  button.
                </li>
                <li className="mb-2">
                  We will verify the transaction by checking the address
                  validity before sending the currency.
                </li>
              </ul>
            ),
          },
        ]}
      />
    </div>
  );
};

export default page;
