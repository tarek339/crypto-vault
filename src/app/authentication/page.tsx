import { Authentication } from "@/components/layouts";
import {
  ContentContainer,
  LayoutContainer,
  SubTitle,
  Text,
  Title,
} from "@/components/shared";

const page = () => {
  return (
    <LayoutContainer>
      <ContentContainer>
        <div>
          <Title title={"Access Your Secure"} />
          <Title title={"Bitcoin Wallet"} className="text-crypto-btc" />
        </div>
        <Text
          text={`
         Enter your credentials below to access your secure wallet and manage
        your Bitcoin with confidence. Whether you are checking your balance,
        making transactions, or exploring new features, we are here to
        ensure your experience is seamless and secure. If you are new to
        Crypto Vault, create an account now to join and start your
        managing your Bitcoins!`}
        />

        <SubTitle
          title={
            <>
              Any Questions? Contact us:{" "}
              <span className="text-primary">cryptovault@protonmail.com</span>
            </>
          }
        />
      </ContentContainer>

      <div className="sm:m-auto">
        <Authentication />
      </div>
    </LayoutContainer>
  );
};

export default page;
