import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div className="h-full rounded-3xl my-5 mr-5 ml-5 lg:ml-0 p-4" style={{backgroundColor: 'rgb(36 45 75)'}}>
      <Head>
        <title>Tokenify - Create and launch your own token on Solana in minutes.</title>
        <meta
          name="description"
          content="Create and launch your own token on Solana in minutes. With no programming required, our intuitive platform allows you to customize and manage your tokens easily and securely. Join the digital asset revolution at Solana!"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
