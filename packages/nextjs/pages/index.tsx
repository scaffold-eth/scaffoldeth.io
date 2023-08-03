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
      <div className="flex flex-col items-center py-8 border-2 border-red-500 gap-24">
        <div className="flex items-center gap-2">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <p className="text-3xl m-0 font-medium mt-1">Scaffold-ETH 2</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 border border-green-500">
          <h1 className="text-center text-3xl lg:text-5xl max-w-md lg:max-w-2xl px-3">
            Everything you need to build dapps on Ethereum
          </h1>
          <p className="m-0 text-center max-w-xl px-3">
            A modern, clean version of scaffold-eth with RainbowKit, NextJS <br /> and Typescript. Supports Hardhat and
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
            <div className="max-w-sm flex border-2 border-gray-300 rounded-md px-6 py-1 gap-2">
              <p className="m-0">npx create-eth@latest</p>
              {npxCommandCopied ? (
                <CheckCircleIcon className="text-xl font-normal h-6 w-4 cursor-pointer" aria-hidden="true" />
              ) : (
                <DocumentDuplicateIcon className="text-xl font-normal h-6 w-4 cursor-pointer" aria-hidden="true" />
              )}
            </div>
          </CopyToClipboard>
          <div className="flex gap-4">
            <button className="btn btn-outline bg-white leading-[0rem] h-8 min-h-fit py-3 normal-case font-normal">
              View the Docs
            </button>
            <button className="btn btn-outline bg-black text-white leading-[0rem] h-8 min-h-fit py-3 normal-case font-normal">
              Start building
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
