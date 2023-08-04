import Image from "next/image";

export const BuildCard = ({
  name,
  description,
  src,
  link,
}: {
  name: string;
  description: string;
  src: string;
  link: string;
}) => {
  return (
    <a id={name} href={link} className="card card-compact lg:w-1/3 max-w-sm bg-white shadow-lg rounded-[46px]">
      <div className="w-full h-[200px] relative">
        <Image src={src} alt={name} fill className="w-full object-center object-contain" />
      </div>
      <div className="card-body gap-0 border-t mb-4">
        <h3 className="card-title m-0 px-3">{name}</h3>
        <p className="m-0 px-3">{description}</p>
      </div>
    </a>
  );
};
