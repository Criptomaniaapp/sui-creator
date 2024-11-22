import type { NextPage } from "next";
import Head from "next/head";
import { BurnView } from "../views";

const Incinerator: NextPage = (props) => {
  return (
    <div className="h-full rounded-3xl my-5 mr-5 ml-5 lg:ml-0 p-4" style={{backgroundColor: 'rgb(36 45 75'}}>
      <Head>
        <title>Solana Incinerator - Increase confidence in your project. Eliminate liquidity safely and irreversibly in Solana.</title>
        <meta
          name="description"
          content="Increase confidence in your project. Eliminate liquidity safely and irreversibly in Solana. Our burn liquidity service gives you transparency and total control."
        />
      </Head>
      <BurnView />
    </div>
  );
};

export default Incinerator;
