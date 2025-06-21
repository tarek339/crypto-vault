import {
  ContentContainer,
  Dropdown,
  LayoutContainer,
  SubTitle,
  Text,
  Title,
} from "@/components/shared";
import Link from "next/link";

export default function Home() {
  return (
    <LayoutContainer>
      <ContentContainer>
        <div>
          <Title
            title={
              <>
                Welcome to <span className="text-crypto-btc">Crypto Vault</span>
              </>
            }
          />

          <Title title="Your Secure Wallet Solution" />
          <div className="pt-5">
            <Text text="At Crypto Vault, we understand that your digital assets are valuable, and security is paramount. Our platform offers a user-friendly and secure wallet designed specifically for storing your Bitcoin safely and conveniently." />
          </div>
        </div>

        <SubTitle
          title={
            <>
              Any Questions? Contact us:{" "}
              <span className="text-primary">cryptovault@protonmail.com</span>
            </>
          }
        />
      </ContentContainer>

      <div className="flex flex-col gap-10">
        <div>
          <SubTitle title="Why Choose Us?" />
          <Dropdown
            dropDownItems={[
              {
                value: "1",
                trigger: "Robust Security Features",
                content:
                  "Your peace of mind is our top priority. Our advanced encryption protocols ensure that your Bitcoin is protected against unauthorized access and cyber threats.",
              },
              {
                value: "2",
                trigger: "High Security Standards",
                content:
                  "We makes sure that all your data is stored in a secure environment. We keep your profile and wallet data safe and secure. We use the latest security standards to protect your data including SSL encryption, database and server backups. ",
              },
              {
                value: "3",
                trigger: "User-Friendly Interface",
                content:
                  "Whether you're a seasoned trader or new to Bitcoin, our intuitive design makes it easy for anyone to navigate and manage their wallet effortlessly.",
              },
              {
                value: "4",
                trigger: "24/7 Access",
                content:
                  "Your Bitcoin is always at your fingertips! Access your wallet anytime, anywhere, and enjoy seamless transactions with just a few clicks.",
              },
              {
                value: "5",
                trigger: "Constant Updates",
                content:
                  "We are committed to keeping our platform at the forefront of technology. Our team continuously updates the website to the latest version, ensuring you have access to the most advanced features and security protocols. You can trust that you're always using a state-of-the-art wallet solution that evolves with the industry.",
              },
            ]}
          />
        </div>
        <div className="flex w-full flex-row flex-wrap items-end justify-between lg:flex-col lg:items-start lg:justify-start">
          <div>
            <SubTitle title="Get Started Today!" />
            <SubTitle
              title={
                <>
                  Your <span className="text-crypto-btc">Bitcoin</span>. Your
                  Security. Your Wallet.
                </>
              }
            />
          </div>
          <Link
            className="text-2xl font-semibold text-primary hover:underline"
            href="/authentication"
          >
            Join us now
          </Link>
        </div>
      </div>
    </LayoutContainer>
  );
}
