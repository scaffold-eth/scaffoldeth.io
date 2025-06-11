import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GetStaticProps, NextPage } from "next";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ExtensionCard } from "~~/components/ExtensionCard";
import { MetaHeader } from "~~/components/MetaHeader";

const BGAPP_API_URL = process.env.BGAPP_API_URL;

type Extension = {
  name: string;
  description: string;
  github: string;
  installCommand: string;
  builder?: string;
  coBuilders?: string[];
  youtube?: string;
};

type CuratedExtensionResponse = {
  extensionFlagValue: string;
  repository: string;
  branch?: string;
  // fields usefull for scaffoldeth.io
  description: string;
  version?: string; // if not present we default to latest
  name?: string; // human redable name, if not present we default to branch or extensionFlagValue on UI
}[];

// TODO: Remove this and find a better way to allow extension submission from different orgs.
const metamaskExtension: Extension = {
  name: "Delegation Toolkit Extension",
  description:
    "The MetaMask Delegation Toolkit is a Viem-based collection of tools for integrating embedded smart accounts, known as `MetaMaskSmartAccount`, into dapps. Developers can create and manage delegator accounts that delegate specific permissions, such as spending limits or time-based access, to other accounts. This extension demonstrates the end-to-end flow for initializing a MetaMask Smart Account, generating and signing a delegation, and redeeming the delegation according to [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) specifications. ",
  github: "https://github.com/MetaMask/gator-extension",
  installCommand: "npx create-eth@latest -e metamask/gator-extension",
};

interface ExtensionsListProps {
  thirdPartyExtensions: Extension[];
  curatedExtensions: Extension[];
}

const ExtensionsList: NextPage<ExtensionsListProps> = ({ thirdPartyExtensions, curatedExtensions }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const allExtensions = [...curatedExtensions, metamaskExtension, ...thirdPartyExtensions];

  const filteredExtensions = allExtensions.filter(extension => {
    if (searchQuery.length < 3) return true;
    const lowerCaseSearch = searchQuery.toLowerCase();
    return (
      extension.name.toLowerCase().includes(lowerCaseSearch) ||
      extension.description.toLowerCase().includes(lowerCaseSearch)
    );
  });

  return (
    <>
      <MetaHeader
        title="Extensions List | Scaffold-ETH 2"
        description="List of available extensions for Scaffold-ETH 2"
      />
      <div className="container mx-auto p-4 min-h-screen flex flex-col -mb-16">
        {/* Header section */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex relative w-8 sm:w-10 h-8 sm:h-10">
              <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
            </div>
            <span className="text-xl sm:text-2xl font-medium">Scaffold-ETH 2</span>
          </Link>
          <Link href="/" className="btn btn-sm btn-ghost">
            Back to Home
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">Extensions List</h1>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search extensions"
              className="input input-bordered w-full pr-10 text-sm md:text-base"
              onChange={e => setSearchQuery(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          </div>
        </div>
        <p className="text-base md:text-lg mb-8 text-center max-w-4xl mx-auto">
          Explore our Curated (by BuidlGuidl) and community-contributed extensions for Scaffold-ETH 2.{" "}
          <br className="hidden md:inline"></br> To install an extension, simply copy and run the installation command
          provided for each extension.
        </p>

        {/* Combined extensions list */}
        <div className="flex-grow">
          {filteredExtensions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-16">
              {filteredExtensions.map((extension, index) => (
                <ExtensionCard key={index} extension={extension} isCurated={curatedExtensions.includes(extension)} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center flex-grow">
              <p className="text-center text-lg font-light">- No extensions found matching your search -</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// get third party extensions from buidlguidl app (builds with "extension" type) and curated extensions from create-eth repo
export const getStaticProps: GetStaticProps<ExtensionsListProps> = async () => {
  try {
    if (!BGAPP_API_URL) {
      throw new Error("BGAPP_API_URL environment variable is not set");
    }

    // Fetch curated extensions first to use as a filter
    const responseCuratedExtensions = await fetch(
      "https://raw.githubusercontent.com/scaffold-eth/create-eth/refs/heads/main/src/extensions.json",
    );
    const dataCuratedExtensions = (await responseCuratedExtensions.json()) as CuratedExtensionResponse;

    // Transform curated extensions
    const curatedExtensions: Extension[] = dataCuratedExtensions.map(ext => {
      const name = ext.name || ext.extensionFlagValue;
      const github = ext.branch ? `${ext.repository}/tree/${ext.branch}` : ext.repository;
      const installCommand = `npx create-eth@${ext.version ? ext.version : "latest"} -e ${ext.extensionFlagValue}`;

      return {
        name,
        description: ext.description,
        github,
        installCommand,
        builder: "",
        coBuilders: [],
      };
    });

    // Fetch and filter third-party extensions
    const response = await fetch(`${BGAPP_API_URL}/builds?type=extension`);
    const data = await response.json();

    const thirdPartyExtensions = data
      .filter(
        (ext: any) => !curatedExtensions.find(curated => curated.github.toLowerCase() === ext.branch.toLowerCase()),
      )
      .map((ext: any) => {
        const githubUrlParts = ext.branch.split("/");
        const githubUsername = githubUrlParts[3];
        const repoName = githubUrlParts[4];

        let installCommand = `npx create-eth@latest -e ${githubUsername}/${repoName}`;

        if (githubUrlParts.length > 5) {
          const branch = githubUrlParts[6];
          installCommand = `${installCommand}:${branch}`;
        }

        return {
          name: ext.name,
          description: ext.desc,
          github: ext.branch,
          installCommand,
          builder: ext.builder,
          coBuilders: ext.coBuilders || [],
          youtube: ext.videoUrl || null,
        };
      });

    // Filter out SpeedRunEthereum challenges extensions
    const curatedExtensionsFiltered = curatedExtensions.filter(
      ext => !ext.github.startsWith("https://github.com/scaffold-eth/se-2-challenges"),
    );

    return {
      props: {
        thirdPartyExtensions,
        curatedExtensions: curatedExtensionsFiltered,
      },
      // Revalidate every 6 hours (21600 seconds)
      revalidate: 21600,
    };
  } catch (error) {
    console.error("Error fetching third-party and curated extensions:", error);
    return {
      props: {
        thirdPartyExtensions: [],
        curatedExtensions: [],
      },
      revalidate: 21600,
    };
  }
};

export default ExtensionsList;
