import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { HooksExample } from "~~/components/HooksExample";
import { MetaHeader } from "~~/components/MetaHeader";
import TrackedLink from "~~/components/TrackedLink";

const Home: NextPage = () => {
  const [cloneCommandCopied, setCloneCommandCopied] = useState(false);
  const [npxCommandCopied, setNpxCommandCopied] = useState(false);
  return (
    <>
      <MetaHeader />
      {/* Hero section  */}
      <div
        className="flex flex-col items-center py-8 gap-12 md:gap-20"
        style={{ backgroundImage: `url(/assets/heroPattern.svg)`, backgroundRepeat: "repeat" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <p className="text-3xl m-0 font-medium mt-1">Scaffold-ETH 2</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-8 mb-14 px-4">
          <h1 className="text-center text-3xl lg:text-5xl max-w-md lg:max-w-2xl px-3 m-0">
            Everything you need to build dApps on Ethereum
          </h1>
          <p className="m-0 text-center max-w-xl px-3">
            A modern, clean version of Scaffold-ETH with NextJS, RainbowKit, Wagmi and Typescript. Supports Hardhat and
            Foundry.
          </p>
          <div className="flex flex-col gap-5 items-center mb-2">
            <CopyToClipboard
              text={"git clone https://github.com/scaffold-eth/scaffold-eth-2.git"}
              onCopy={() => {
                setCloneCommandCopied(true);
                setTimeout(() => {
                  setCloneCommandCopied(false);
                }, 800);
              }}
            >
              <div className="mx-2 flex border-2 border-gray-300 rounded-xl px-3 sm:px-5 py-1 gap-2">
                <p className="m-0 text-center text-sm sm:text-base">
                  git clone https://github.com/scaffold-eth/scaffold-eth-2.git
                </p>
                {cloneCommandCopied ? (
                  <CheckCircleIcon
                    className="text-xl font-normal h-6 w-4 flex-shrink-0 cursor-pointer"
                    aria-hidden="true"
                  />
                ) : (
                  <DocumentDuplicateIcon
                    className="text-xl font-normal h-6 w-4 flex-shrink-0 cursor-pointer"
                    aria-hidden="true"
                  />
                )}
              </div>
            </CopyToClipboard>
            <div className="divider px-6 sm:px-20 m-0">OR</div>
            <div className="flex items-center gap-2 mx-2">
              <CopyToClipboard
                text={"npx create-eth@latest"}
                onCopy={() => {
                  setNpxCommandCopied(true);
                  setTimeout(() => {
                    setNpxCommandCopied(false);
                  }, 800);
                }}
              >
                <div className="max-w-sm flex border-2 border-gray-300 rounded-xl px-3 sm:px-5 py-1 gap-2">
                  <p className="m-0 text-center text-sm sm:text-base">npx create-eth@latest</p>
                  {npxCommandCopied ? (
                    <CheckCircleIcon
                      className="text-xl font-normal h-6 w-4 cursor-pointer flex-shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <DocumentDuplicateIcon
                      className="text-xl font-normal h-6 w-4 cursor-pointer flex-shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </CopyToClipboard>
              <div className="badge badge-warning">Beta</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <TrackedLink
              id="Docs"
              href="https://docs.scaffoldeth.io/"
              className="btn btn-outline btn-sm px-5 h-10 bg-base-100 normal-case font-normal text-lg"
            >
              Docs
            </TrackedLink>
            <TrackedLink
              id="Github"
              href="https://github.com/scaffold-eth/scaffold-eth-2"
              className="btn btn-outline btn-sm px-5 h-10 bg-neutral text-white normal-case font-normal text-lg flex items-center gap-2"
            >
              Github
              <Image src="/assets/ghIcon.png" alt="github icon" height={25} width={25} />
            </TrackedLink>
          </div>
        </div>
      </div>

      {/* Debug Contracts */}
      <div className="bg-base-300/20">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:pl-12 lg:pr-6 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-0">
          <div className="space-y-6">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2 pt-4 lg:pt-0">
              <Image src="/assets/debugLogo.svg" alt="debug icon" height={30} width={30} />
              <p className="text-center lg:text-left text-xl m-0 font-light">DEBUG CONTRACTS</p>
            </div>

            <h2 className="text-2xl lg:text-4xl lg:w-4/5 text-center lg:text-left font-medium">
              Experiment with Solidity using a frontend that adapts to your smart contract
            </h2>
            <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:w-3/4">
              Debug and refine your smart contracts with a live-updating frontend. Scaffold-ETH 2 is an ideal stack for
              progressing from rapid prototyping to production-grade dApps.
            </p>
          </div>
          <div className="max-w-[400px] lg:max-w-none">
            <Image src="/assets/se2DebugContracts.png" alt="Debug contracts" width={1400} height={1400} />
          </div>
        </div>
      </div>

      {/* SE-2 Components */}
      <div className="bg-base-300/60">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-16 lg:py-20 lg:px-12 flex flex-col lg:flex-row justify-between items-center gap-5 lg:gap-0">
          <div className="flex flex-col items-center">
            <div className="max-w-[400px] lg:max-w-none">
              <Image src="/assets/se2Components.png" alt="Scaffold-ETH 2 components" width={900} height={900} />
            </div>
          </div>
          <div className="space-y-6 flex flex-col items-center lg:items-end">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2 lg:w-3/4 pt-4 lg:pt-0">
              <Image src="/assets/sparkles.svg" alt="debug icon" height={20} width={20} />
              <p className="text-center lg:text-left text-xl m-0 font-light">COMPONENTS</p>
            </div>
            <div className="lg:w-3/4 space-y-5">
              <h2 className="text-2xl lg:text-4xl lg:w-4/5 text-center lg:text-left font-medium">
                Common web3 components in tailwind and daisy UI
              </h2>
              <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:w-3/4">
                Accelerate your dapp development using our pre-built components for common web3 use cases. Tailwind and
                daisyUI to style your dapp and give it a modern and appealing design.
              </p>
              <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:pr-6 link">
                <TrackedLink id="Components" href="https://docs.scaffoldeth.io/components/">
                  Check out all the components
                </TrackedLink>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hooks and Utils */}
      <div className="bg-base-200">
        <div className="container max-w-[80%] lg:max-w-7xl m-auto py-24 lg:py-20 lg:pl-12 lg:pr-6 flex flex-col-reverse lg:flex-row items-center gap-5 lg:gap-28">
          <div className="space-y-6 flex-shrink lg:w-2/3 lg:self-start lg:mt-14">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2 pt-4 lg:pt-0">
              <Image src="/assets/atom.svg" alt="debug icon" height={40} width={40} />
              <p className="text-center lg:text-left text-xl m-0 font-light">HOOKS AND UTILS</p>
            </div>

            <h2 className="text-2xl lg:text-4xl text-center lg:text-left font-medium">
              Custom Wagmi <br /> hooks and utils
            </h2>
            <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:pr-6">
              Designed to simplify interactions with your deployed smart contracts. These hooks are wrappers around{" "}
              <span className="italic">Wagmi</span>, an easy-to-use interface with typescript autocompletions for
              reading from, writing to, and monitoring events emitted by your smart contracts.
            </p>
            <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:pr-6 link">
              <TrackedLink id="Hooks" href="https://docs.scaffoldeth.io/hooks/">
                Check out all the available hooks
              </TrackedLink>
            </p>
          </div>
          <HooksExample />
        </div>
      </div>

      {/* Buidl in Community */}
      <div className="bg-[url(/assets/bgHero.png)] h-[576px] bg-cover bg-center flex items-end justify-center">
        <div className="flex flex-col justify-center items-center bg-base-200 w-4/5 max-w-3xl lg:w-5/12 rounded-3xl shadow-lg shadow-primary p-10 gap-4 -mb-12">
          <p className="text-center text-3xl font-medium m-0">Buidl in Community</p>
          <p className="text-center m-0">
            You can build and learn together with the BuidlGuidl community, joining over 800 members in creating
            products, prototypes, and tutorials to enrich the web3 ecosystem.
          </p>
          <TrackedLink
            id="BuidlGuidl"
            href="https://buidlguidl.com"
            className="btn btn-outline btn-sm px-5 h-10 bg-base-100 normal-case font-normal text-lg"
          >
            Learn More
          </TrackedLink>
        </div>
      </div>

      {/* Block Explorer */}
      <div className="bg-base-200">
        <div className="container max-w-[90%] lg:max-w-7xl m-auto py-24 lg:pb-20 lg:pt-28 lg:pl-4  flex flex-col justify-between items-center lg:flex-row gap-5 lg:gap-0">
          <div className="flex flex-col items-center">
            <div className="max-w-[400px] lg:max-w-none">
              <Image src="/assets/se2BlockExplorer.png" alt="Block Explorer" width={1400} height={1400} />
            </div>
          </div>

          <div className="space-y-6 flex flex-col items-center lg:pl-16">
            <div className="flex items-center justify-center lg:flex-col lg:items-start lg:justify-start gap-2 lg:w-3/4 pt-4 lg:pt-0">
              <Image src="/assets/magnifying.svg" alt="debug icon" height={20} width={20} />
              <p className="text-center lg:text-left text-xl m-0 font-light">BLOCK EXPLORER</p>
            </div>
            <div className="lg:w-3/4 space-y-6">
              <h2 className="text-2xl lg:text-4xl text-center lg:text-left font-medium">
                Built-in Block Explorer to check transaction data easily during your tests
              </h2>
              <p className="m-auto text-center lg:text-left lg:mx-0 max-w-[300px] lg:max-w-none lg:w-3/4">
                Review transaction data from your local tests to make sure everything is working as expected. With our
                built-in Block Explorer, you can check the transaction details from your dapp while tinkering with it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
