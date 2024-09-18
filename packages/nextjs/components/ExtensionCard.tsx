import { useState } from "react";
import { usePlausible } from "next-plausible";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

type Extension = {
  name: string;
  description: string;
  github: string;
  installCommand: string;
  builder: string;
  coBuilders: string[];
  youtube?: string;
};

export const ExtensionCard = ({ extension, isCurated }: { extension: Extension; isCurated: boolean }) => {
  const [commandCopied, setCommandCopied] = useState(false);
  const plausible = usePlausible();

  const handleInstallClick = () => {
    navigator.clipboard.writeText(extension.installCommand);
    setCommandCopied(true);
    setTimeout(() => {
      setCommandCopied(false);
    }, 800);

    // Determine the GitHub repo identifier
    const githubRepo = isCurated
      ? `Curated/${extension.name}`
      : extension.github.split("github.com/")[1] || extension.github;

    // Track the event with GitHub identifier as a prop
    plausible("extensionCopyClick", { props: { id: githubRepo } });
  };

  return (
    <div className="card bg-base-100 shadow-xl mb-8">
      <div className="card-body">
        <h2 className="card-title">{extension.name}</h2>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {extension.github && (
              <a href={extension.github} className="inline-block" target="_blank" rel="noopener noreferrer">
                {
                  // eslint-disable-next-line
                  <img alt="github icon" className="w-6 h-6" src="/icon-github.svg" />
                }
              </a>
            )}
            {extension.youtube && (
              <a href={extension.youtube} className="inline-block" target="_blank" rel="noopener noreferrer">
                {
                  // eslint-disable-next-line
                  <img alt="youtube icon" className="w-6 h-6" src="/icon-youtube.svg" />
                }
              </a>
            )}
          </div>
          {isCurated ? (
            <div className="badge badge-secondary p-3">Curated</div>
          ) : (
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
          )}
        </div>
        <p
          className="overflow-hidden"
          // line-clamp-5 is not working, this is a workaround
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            maxHeight: "7.5em", // Assumes default line height, adjust if needed
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
            onClick={handleInstallClick}
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
