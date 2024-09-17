import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address } from "~~/components/scaffold-eth";
import curatedExtensions from "~~/extensions.json";

type Extension = {
  name: string;
  description: string;
  github: string;
  installCommand: string;
  builder: string;
  coBuilders: string[];
  youtube?: string;
};

const ExtensionCard = ({ extension, isCurated }: { extension: Extension; isCurated: boolean }) => {
  const [commandCopied, setCommandCopied] = useState(false);

  return (
    <div className="card bg-base-100 shadow-xl mb-8">
      <div className="card-body">
        <h2 className="card-title">
          {extension.name}
          {isCurated && <div className="badge badge-secondary ml-2">Curated</div>}
        </h2>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {extension.github && (
              <a href={extension.github} className="inline-block" target="_blank" rel="noopener noreferrer">
                <img alt="github icon" className="w-6 h-6" src="/icon-github.svg" />
              </a>
            )}
            {extension.youtube && (
              <a href={extension.youtube} className="inline-block" target="_blank" rel="noopener noreferrer">
                <img alt="youtube icon" className="w-6 h-6" src="/icon-youtube.svg" />
              </a>
            )}
          </div>
          <div>
            <Address address={extension.builder} disableAddressLink />
            {extension.coBuilders && extension.coBuilders.length > 0 && (
              <div className="text-sm mt-2">
                {extension.coBuilders.map((coBuilder, index) => (
                  <Address key={index} address={coBuilder} disableAddressLink />
                ))}
              </div>
            )}
          </div>
        </div>
        <p
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {extension.description}
        </p>
        {!isCurated && (
          <div className="mt-2 text-sm text-yellow-600 bg-yellow-100 p-2 rounded">
            ⚠️ 3rd-party extension. Verify the source before installing.
          </div>
        )}
        <div className="card-actions justify-start mt-4">
          <div
            className="flex items-center border-2 border-gray-300 rounded-xl px-3 sm:px-5 py-1 gap-2 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(extension.installCommand);
              setCommandCopied(true);
              setTimeout(() => {
                setCommandCopied(false);
              }, 800);
            }}
          >
            <p className="m-0 text-center text-sm sm:text-base">{extension.installCommand}</p>
            {commandCopied ? (
              <CheckCircleIcon className="text-xl font-normal h-6 w-4 flex-shrink-0" aria-hidden="true" />
            ) : (
              <DocumentDuplicateIcon className="text-xl font-normal h-6 w-4 flex-shrink-0" aria-hidden="true" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExtensionsList: NextPage = () => {
  const [thirdPartyExtensions, setThirdPartyExtensions] = useState<Extension[]>([]);

  useEffect(() => {
    const fetchExtensions = async () => {
      try {
        const response = await fetch("https://buidlguidl-v3.ew.r.appspot.com/builds?type=extension");
        const data = await response.json();
        const formattedExtensions = data.map((ext: any) => {
          // Extract github username and repo name from the branch URL
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
            youtube: ext.videoUrl || undefined,
          };
        });
        setThirdPartyExtensions(formattedExtensions);
      } catch (error) {
        console.error("Error fetching third-party extensions:", error);
      }
    };

    fetchExtensions();
  }, []);

  return (
    <>
      <MetaHeader
        title="Extensions List | Scaffold-ETH 2"
        description="List of available extensions for Scaffold-ETH 2"
      />
      <div className="container mx-auto p-4">
        {/* Header section */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex relative w-10 h-10">
              <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
            </div>
            <span className="text-2xl font-medium">Scaffold-ETH 2</span>
          </Link>
          <Link href="/" className="btn btn-sm btn-ghost">
            Back to Home
          </Link>
        </div>

        <h1 className="text-4xl font-bold pt-8 mb-4 text-center">Extensions List</h1>
        <p className="text-lg mb-8 text-center max-w-4xl mx-auto">
          Explore our Curated (by BuidlGuidl) and community-contributed extensions for Scaffold-ETH 2. <br></br> To
          install an extension, simply copy and run the installation command provided for each extension.
        </p>

        <h2 className="text-2xl font-semibold mb-6">Curated Extensions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {curatedExtensions.curated.map((extension, index) => (
            <ExtensionCard key={index} extension={extension} isCurated={true} />
          ))}
        </div>

        <h2 className="text-2xl font-semibold mb-6">Third-Party Extensions</h2>
        {thirdPartyExtensions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {thirdPartyExtensions.map((extension, index) => (
              <ExtensionCard key={index} extension={extension} isCurated={false} />
            ))}
          </div>
        ) : (
          <p>No third-party extensions available yet.</p>
        )}
      </div>
    </>
  );
};

export default ExtensionsList;
