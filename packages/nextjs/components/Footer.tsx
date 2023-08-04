import { HeartIcon } from "@heroicons/react/24/solid";

/**
 * Site footer
 */
export const Footer = () => {
  return (
    <div className="min-h-0 p-5 bg-neutral">
      <div className="w-full">
        <ul className="menu menu-horizontal w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full text-white">
            <div>
              <a
                href="https://github.com/scaffold-eth/scaffold-eth-2"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Fork me
              </a>
            </div>
            <span>·</span>
            <div>
              Built with <HeartIcon className="inline-block h-4 w-4" /> at 🏰{" "}
              <a
                href="https://buidlguidl.com/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                BuidlGuidl
              </a>
            </div>
            <span>·</span>
            <div>
              <a
                href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              >
                Support
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
