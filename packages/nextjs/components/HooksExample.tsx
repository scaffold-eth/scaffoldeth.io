import { ReactNode } from "react";

const Red = ({ children }: { children: ReactNode }) => <span className="text-[#FF5962]">{children}</span>;

const Cyan = ({ children, dark }: { children: ReactNode; dark?: boolean }) => (
  <span className={`${dark ? "text-[#00968D]" : "text-[#00B0A6]"}`}>{children}</span>
);

const Purple = ({ children }: { children: ReactNode }) => <span className="text-[#7B61FF]">{children}</span>;

export const HooksExample = () => {
  return (
    <div className="mt-0 lg:mt-16 w-full flex-grow  bg-white rounded-2xl p-6 drop-shadow-[0px_0px_10px_rgba(139,178,241,0.50)]">
      <div className="bg-base-300/40 w-full h-full border border-primary rounded-3xl p-4 lg:p-6 text-xs lg:text-sm  font-mono overflow-x-scroll whitespace-nowrap  lg:overflow-auto lg:whitespace-normal">
        <p className="my-3">
          <Red>import</Red> {"{ "} useScaffoldReadContract {" } "}
          <Red>from</Red> <Cyan>&quot;~~/hooks/scaffold-eth&quot;</Cyan>;
        </p>
        <p className="my-3">
          <Red>import</Red> {"{ "} Address {" } "}
          <Red>from</Red> <Cyan>&quot;~~/components/scaffold-eth&quot;</Cyan>;
        </p>

        <p className="my-3">
          <Red>const</Red> {"{ "}data: yourContractOwner{" } "}
          <Cyan> = </Cyan>
          <Purple>useScaffoldReadContract</Purple>({"{"}
          <br />
          <span className="inline-block ml-4">
            <Cyan>contractName</Cyan>: <Cyan dark>&quot;YourContract&quot;</Cyan>,<br />
            <Cyan>functionName</Cyan>: <Cyan dark>&quot;owner&quot;</Cyan>,<br />
          </span>
          <br />
          {"});"}
          <br />
        </p>

        <p className="my-3">
          <Red>{"<"}Address</Red> address<Cyan>=</Cyan>
          {"{"}yourContractOwner{"}"} <Red>/{">"}</Red>
        </p>
      </div>
    </div>
  );
};
