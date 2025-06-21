export interface UserProps {
  _id: string;
  userName: string;
  password?: string;
  wallet: {
    address: string;
    privateKey: string;
    publicKey: string;
    seed: string;
    derivationPath: string;
  };
}

export interface Params {
  params: Promise<{ id: string }>;
}

export interface TransactionObject {
  date: string;
  amount: number;
  crypto: string;
}

export interface InputUxtoProps {
  satoshis: number;
  script: string;
  address: string;
  txId: string;
  outputIndex: number;
}

export interface UxtoProps {
  scriptPubKey: string;
  value: number;
  address: string;
  txid: string;
  vout: number;
}
