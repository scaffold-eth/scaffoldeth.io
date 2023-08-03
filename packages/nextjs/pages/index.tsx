import { useState } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
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
        <div className="flex flex-col justify-center items-center gap-8">
          <h1 className="text-center text-3xl lg:text-5xl max-w-md lg:max-w-2xl px-3 m-0">
            Everything you need to build dapps on Ethereum
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
    </>
  );
};

export default Home;
