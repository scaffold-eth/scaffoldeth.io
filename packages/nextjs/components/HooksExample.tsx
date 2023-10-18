import { ReactNode } from "react";

const Red = ({ children }: { children: ReactNode }) => <span className="text-[#FF5962]">{children}</span>;

const Cyan = ({ children, dark }: { children: ReactNode; dark?: boolean }) => (
  <span className={`${dark ? "text-[#00968D]" : "text-[#00B0A6]"}`}>{children}</span>
);

const Purple = ({ children }: { children: ReactNode }) => <span className="text-[#7B61FF]">{children}</span>;

export const HooksExample = () => {
  return (
    <div className="w-full flex-grow  bg-white rounded-2xl p-6 drop-shadow-[0px_0px_10px_rgba(139,178,241,0.50)]">
      <div className="bg-base-300/40 w-full h-full border border-primary rounded-3xl p-4 lg:p-6 text-xs lg:text-sm  font-mono overflow-x-scroll whitespace-nowrap  lg:overflow-auto lg:whitespace-normal">
        <p className="my-3">
          <Red>import</Red>
          {" { "} useScaffoldContractWrite {" } "}
          <Red>from</Red> <Cyan>&quot;~~/hooks/scaffold-eth&quot;</Cyan>;
        </p>

        <p className="my-3">
          <Red>const</Red>
          {" { "}writeAsync, isLoading, isMining{" } "}
          <Cyan> = </Cyan>
          <br />
          <Purple>useScaffoldContractWrite</Purple>({"{"}
          <br />
          <span className="inline-block ml-4">
            <Cyan>contractName</Cyan>: <Cyan dark>&quot;YourContract&quot;</Cyan>,
            <br />
            <Cyan>functionName</Cyan>: <Cyan dark>&quot;setPurpose&quot;</Cyan>,
            <br />
            <Cyan>args</Cyan>: [<Cyan dark>&quot;The value to set&quot;</Cyan>],
            <br />
            <Cyan>blockConfirmation</Cyan>: <Cyan dark>1</Cyan>,
            <br />
            <Purple>onBlockConfirmation</Purple>: (txnReceipt) =&gt; {"{"}
            <br />
            <span className="inline-block ml-4">
              console.<Purple>log</Purple>(<Cyan>&quot;Transaction blockHash&quot;</Cyan>, &nbsp;txnReceipt.
              <Cyan>blockHash</Cyan>
              );
            </span>
            <br />
            {"}"}
          </span>
          <br />
          {"}"});
        </p>
        <p className="text-gray-400 my-3">
          {"//"} To send the transaction, you can call the writeAsync function <br className="lg:hidden" /> returned by
          the hook. Here&apos;s an example usage:
        </p>
        <p className="my-3">
          <Red>{"<"}button</Red> className<Cyan>=&quot;btn btn-primary&quot;</Cyan> onClick<Cyan>=</Cyan>
          {"{"}() <Cyan>=&gt;</Cyan> writeAsync(){"}"}
          <Red>{">"}</Red>
          <br />
          <span className="inline-block ml-4">Send Tx</span>
          <br />
          <Red>
            {"<"}/button{">"}
          </Red>
        </p>
      </div>
    </div>
  );
};
