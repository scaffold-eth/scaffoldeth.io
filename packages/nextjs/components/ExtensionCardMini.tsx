import { useState } from "react";
import { usePlausible } from "next-plausible";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

interface ExtensionCardMiniProps {
  extension: {
    name: string;
    description: string;
    installCommand: string;
  };
}

export const ExtensionCardMini = ({ extension }: ExtensionCardMiniProps) => {
  const [commandCopied, setCommandCopied] = useState(false);
  const plausible = usePlausible();

  const handleInstallClick = () => {
    setCommandCopied(true);
    setTimeout(() => {
      setCommandCopied(false);
    }, 800);

    // hardcoded to not mix stats with /extensions clicks
    plausible("extensionCopyClick", {
      props: {
        id: `featured/${extension.name}`,
      },
    });
  };

  return (
    <div className="bg-base-100 rounded-2xl shadow-md p-4 flex flex-col justify-between border border-base-200">
      <div className="mb-3">
        <h2 className="text-lg font-semibold mb-2 text-base-content">{extension.name}</h2>
        <p className="text-sm text-base-content/80 mb-3">{extension.description}</p>
      </div>
      <CopyToClipboard text={extension.installCommand} onCopy={handleInstallClick}>
        <button className="bg-secondary/50 text-secondary-content text-sm py-2 px-4 rounded-lg flex items-center justify-between w-full hover:bg-secondary transition-colors duration-200">
          <span className="truncate mr-2">{extension.installCommand}</span>
          {commandCopied ? <CheckCircleIcon className="h-5 w-4" /> : <DocumentDuplicateIcon className="h-5 w-4" />}
        </button>
      </CopyToClipboard>
    </div>
  );
};
