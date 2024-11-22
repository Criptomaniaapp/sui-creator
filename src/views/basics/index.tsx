
import { FC } from "react";
import { SignMessage } from '../../components/SignMessage';
import { SendTransaction } from '../../components/SendTransaction';
import { SendVersionedTransaction } from '../../components/SendVersionedTransaction';
import { ConnectWallet } from "components/ConnectWallet";

export const BasicsView: FC = ({ }) => {

  return (
    <>
      <ConnectWallet />
    </>
  );
};
