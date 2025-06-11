import { useState } from "react";
import Image from "next/image";
import { usePlausible } from "next-plausible";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

type Extension = {
  name: string;
  description: string;
  github: string;
  installCommand?: string;
  builder?: string;
  coBuilders?: string[];
  youtube?: string;
};

export const ExtensionCard = ({ extension, isCurated }: { extension: Extension; isCurated: boolean }) => {
  const [commandCopied, setCommandCopied] = useState(false);
  const plausible = usePlausible();

  const handleInstallClick = () => {
    setCommandCopied(true);
    setTimeout(() => {
      setCommandCopied(false);
    }, 800);

    const githubRepo = isCurated
      ? `Curated/${extension.name}`
      : extension.github.split("github.com/")[1] || extension.github;

    // Track the click event with GitHub repo as a prop
    plausible("extensionCopyClick", { props: { id: githubRepo } });
  };

  const installCommand = extension.installCommand || `npx create-eth@latest -e ${extension.name}`;

  return (
    <div className="card bg-base-100 shadow-xl mb-8 flex flex-col mx-1">
      <div className="card-body flex-grow">
        <h2 className="card-title">{extension.name}</h2>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {extension.github && (
              <a href={extension.github} className="inline-block" target="_blank" rel="noopener noreferrer">
                <Image src="/icon-github.svg" alt="github icon" width={24} height={24} />
              </a>
            )}
            {extension.youtube && (
              <a href={extension.youtube} className="inline-block" target="_blank" rel="noopener noreferrer">
                <Image src="/icon-youtube.svg" alt="youtube icon" width={24} height={24} />
              </a>
            )}
          </div>
          {isCurated ? (
            <div className="badge badge-secondary p-3">Curated</div>
          ) : (
            extension.builder && (
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
            )
          )}
        </div>
        <p
          className="overflow-hidden flex-grow"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5,
            maxHeight: "7.5em",
          }}
        >
          {extension.description}
        </p>
        {!isCurated && (
          <div className="mt-2 text-sm text-yellow-600 bg-yellow-100 p-2 rounded">
            ⚠️ 3rd-party extension. Verify the source before installing.
          </div>
        )}
      </div>
      <div className="card-actions mx-4 p-4 pt-0 pb-6 mt-auto">
        <CopyToClipboard text={installCommand} onCopy={handleInstallClick}>
          <div className="flex items-center border-2 border-gray-300 rounded-xl px-3 sm:px-5 py-1 gap-2 cursor-pointer w-full">
            <p className="m-0 text-center text-sm xl:text-base flex-grow">{installCommand}</p>
            {commandCopied ? (
              <CheckCircleIcon className="text-xl font-normal h-6 w-4 flex-shrink-0" aria-hidden="true" />
            ) : (
              <DocumentDuplicateIcon className="text-xl font-normal h-6 w-4 flex-shrink-0" aria-hidden="true" />
            )}
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
};
