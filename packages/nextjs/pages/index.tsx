import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { BuildCard } from "~~/components/BuildCard";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  const [npxCommandCopied, setNpxCommandCopied] = useState(false);
  return (
    <>
      <MetaHeader />
      {/* Hero section  */}
      <div className="flex flex-col items-center py-8 gap-12 md:gap-20">
        <div className="flex items-center gap-2">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <p className="text-3xl m-0 font-medium mt-1">Scaffold-ETH 2</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-8 mb-14">
          <h1 className="text-center text-3xl lg:text-5xl max-w-md lg:max-w-2xl px-3 m-0">
            Everything you need to build dApps on Ethereum
          </h1>
          <p className="m-0 text-center max-w-xl px-3">
            A modern, clean version of scaffold-eth with RainbowKit, NextJS and Typescript. Supports Hardhat and
            Foundry.
          </p>
          <CopyToClipboard
            text={"npx create-eth@latest"}
            onCopy={() => {
              setNpxCommandCopied(true);
              setTimeout(() => {
                setNpxCommandCopied(false);
              }, 800);
            }}
          >
            <div className="max-w-sm flex border-2 border-gray-300 rounded-xl px-5 py-1 gap-2">
              <p className="m-0">npx create-eth@latest</p>
              {npxCommandCopied ? (
                <CheckCircleIcon className="text-xl font-normal h-6 w-4 cursor-pointer" aria-hidden="true" />
              ) : (
                <DocumentDuplicateIcon className="text-xl font-normal h-6 w-4 cursor-pointer" aria-hidden="true" />
              )}
            </div>
          </CopyToClipboard>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a
              href="https://scaffold-eth-2-docs.vercel.app/"
              target="_blank"
              className="btn btn-outline btn-sm px-5 h-10 bg-base-100 normal-case font-normal text-lg"
              rel="noreferrer"
            >
              View the Docs
            </a>
            <a
              href="https://github.com/scaffold-eth/scaffold-eth-2"
              target="_blank"
              className="btn btn-outline btn-sm px-5 h-10 bg-neutral text-white normal-case font-normal text-lg flex items-center gap-2"
              rel="noreferrer"
            >
              <span>Start building</span>
              <Image src="/assets/ghIcon.png" alt="github icon" height={25} width={25} />
            </a>
          </div>
        </div>
      </div>
      {/* Debug Contracts */}
      <div className="bg-base-300/20">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:pl-12 lg:pr-6 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2">
              <Image src="/assets/debugLogo.svg" alt="debug icon" height={30} width={30} />
              <p className="text-center lg:text-left text-xl m-0 font-light">DEBUG CONTRACTS</p>
            </div>

            <h2 className="text-2xl lg:text-4xl lg:w-4/5 text-center lg:text-left font-medium">
              Experiment with Solidity using a frontend that adapts to your smart contract
            </h2>
            <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:w-3/4">
              Debug and refine your smart contracts with a live-updating frontend. Scaffold-eth 2 is an ideal stack for
              progressing from rapid prototyping to production-grade dapps.
            </p>
          </div>
          <div className="max-w-[400px] lg:max-w-none">
            <Image src="/assets/seDebugContracts.png" alt="Debug contracts" width={1200} height={1200} />
          </div>
        </div>
      </div>

      {/* Buidl in Community */}
      <div className="bg-[url(/assets/bgHero.png)] h-[576px] bg-cover bg-center flex items-end justify-center">
        <div className="flex flex-col justify-center items-center bg-base-200 w-4/5 max-w-3xl lg:w-5/12 rounded-3xl shadow-lg shadow-primary p-10 gap-4 -mb-12">
          <p className="text-center text-3xl font-medium m-0">Buidl in Community</p>
          <p className="text-center m-0">
            Open source forkable Ethereum dev stack built, mantained and supported by BuidlGuidl community, with over
            800 active builders.
          </p>
          <a
            href="https://buidlguidl.com"
            target="_blank"
            className="btn btn-outline btn-sm px-5 h-10 bg-base-100 normal-case font-normal text-lg"
            rel="noreferrer"
          >
            View BuidlGuidl
          </a>
        </div>
      </div>

      {/* Block Explorer */}
      <div className="bg-base-200">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:pl-12 lg:pr-6 lg:pt-28 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2">
              <Image src="/assets/magnifying.svg" alt="debug icon" height={20} width={20} />
              <p className="text-center lg:text-left text-xl m-0 font-light">BLOCK EXPLORER</p>
            </div>

            <h2 className="text-2xl lg:text-4xl lg:w-4/5 text-center lg:text-left font-medium">
              Built-in Block Explorer to check transaction data easily during your tests
            </h2>
            <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:w-3/4">
              Review transaction data to make sure everything is working as expected. With Scaffold-eth 2 built-in Block
              Explorer you can check the transactions of your dapp during your local tests.
            </p>
          </div>
          <div className="max-w-[400px] lg:max-w-none">
            <Image src="/assets/blockExplorer.png" alt="Block Explorer" width={1400} height={1400} />
          </div>
        </div>
      </div>

      {/* Feature Builds */}
      <div className="bg-base-300">
        <div className="container flex flex-col items-center justify-center max-w-[90%] lg:max-w-6xl mx-auto py-16 pt-24 lg:py-28 lg:px-12 gap-6">
          <div className="gap-4 flex flex-col items-center">
            <h2 className="text-3xl lg:text-5xl font-semibold my-0 text-center">Built with Scaffold-ETH 2</h2>
            <p className="lg:w-3/5 text-center m-0">
              Powered by Scaffold-eth 2, these fork-able builds are one of the of easiest ways to launch a project.
            </p>
          </div>
          {/* Card Container  */}
          <div className="flex gap-8 flex-wrap lg:flex-nowrap justify-center mt-8">
            {/* Card */}
            <BuildCard
              name="SpeedrunEthereum"
              description="Built in Scaffold-eth and recently migrated to Scaffold-eth 2 to help developers transitioning from web2 to web3."
              src="/assets/speedRunEthereum.png"
              link="https://speedrunethereum.com/"
            />
            <BuildCard
              name="Hacker House streams"
              description="Platform to retroactively fund open-source work by providing a monthly UBI to developers, rewarding them for their ongoing contributions."
              src="/assets/hackerHouse.png"
              link="https://github.com/BuidlGuidl/hacker-houses-streams"
            />
            <BuildCard
              name="Event Wallet"
              description="Web-based crypto (burner) wallet, aiming to enhance the experience of attendees at events, by providing a gamification element."
              src="/assets/eventWallet.png"
              link="https://github.com/BuidlGuidl/event-wallet"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
