import type { NextPage } from "next";
import Head from "next/head";
import { BasicsView } from "../views";

const Basics: NextPage = (props) => {
  return (
    <div className="h-full rounded-3xl my-5 mr-5 ml-5 lg:ml-0 p-4" style={{backgroundColor: 'rgb(36 60 75'}}>
      <Head>
        <title>Solana Token Creator</title>
        <meta
          name="description"
          content="Basic Functionality"
        />
      </Head>
      <BasicsView />
    </div>
  );
};

export default Basics;
