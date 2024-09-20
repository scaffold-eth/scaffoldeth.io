import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GetStaticProps, NextPage } from "next";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ExtensionCard } from "~~/components/ExtensionCard";
import { MetaHeader } from "~~/components/MetaHeader";
import curatedExtensions from "~~/public/extensions.json";

const BGAPP_API_URL = process.env.BGAPP_API_URL;

type Extension = {
  name: string;
  description: string;
  github: string;
  installCommand: string;
  builder: string;
  coBuilders: string[];
  youtube?: string;
};

interface ExtensionsListProps {
  thirdPartyExtensions: Extension[];
}

const ExtensionsList: NextPage<ExtensionsListProps> = ({ thirdPartyExtensions }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const allExtensions = [...curatedExtensions.curated, ...thirdPartyExtensions];

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
                <ExtensionCard
                  key={index}
                  extension={extension}
                  isCurated={curatedExtensions.curated.includes(extension)}
                />
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

// get third party extensions from buidlguidl app (builds with "extension" type)
export const getStaticProps: GetStaticProps<ExtensionsListProps> = async () => {
  try {
    if (!BGAPP_API_URL) {
      throw new Error("BGAPP_API_URL environment variable is not set");
    }

    const response = await fetch(`${BGAPP_API_URL}/builds?type=extension`);
    const data = await response.json();
    const formattedExtensions = data.map((ext: any) => {
      const githubUrlParts = ext.branch.split("/");
      const githubUsername = githubUrlParts[3];
      const repoName = githubUrlParts[4];

      return {
        name: ext.name,
        description: ext.desc,
        github: ext.branch,
        installCommand: `npx create-eth@latest -e ${githubUsername}/${repoName}`,
        builder: ext.builder,
        coBuilders: ext.coBuilders || [],
        youtube: ext.videoUrl || null,
      };
    });

    return {
      props: {
        thirdPartyExtensions: formattedExtensions,
      },
      // Revalidate every 6 hours (21600 seconds)
      revalidate: 21600,
    };
  } catch (error) {
    console.error("Error fetching third-party extensions:", error);
    return {
      props: {
        thirdPartyExtensions: [],
      },
      revalidate: 21600,
    };
  }
};

export default ExtensionsList;
