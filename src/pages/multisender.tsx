import type { NextPage } from "next";
import Head from "next/head";
import { MultiView } from "../views";

const Multisender: NextPage = (props) => {
  return (
    <div className="h-full rounded-3xl my-5 mr-5 ml-5 lg:ml-0 p-4" style={{backgroundColor: 'rgb(36 45 75)'}}>
      <Head>
        <title>Solana Multisender - Send Solana tokens to multiple recipients with a single transaction. </title>
        <meta
          name="description"
          content="Send Solana tokens to multiple recipients with a single transaction. Save time and gas with our Solana multisender. Fast, secure and easy to use."
        />
      </Head>
      <MultiView />
    </div>
  );
};

export default Multisender;
