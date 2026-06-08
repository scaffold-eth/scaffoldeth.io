import { ArrowRightIcon } from "@heroicons/react/24/outline";
import TrackedLink from "~~/components/TrackedLink";

interface SkillCardMiniProps {
  skill: {
    name: string;
    description: string;
    href: string;
  };
}

export const SkillCardMini = ({ skill }: SkillCardMiniProps) => {
  return (
    <TrackedLink
      id={`featuredSkill/${skill.name}`}
      href={skill.href}
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between no-underline hover:shadow-lg transition-shadow duration-200"
    >
      <div className="mb-3">
        <h2 className="text-lg font-semibold mb-2 text-gray-900">{skill.name}</h2>
        <p className="text-sm text-gray-600 mb-0">{skill.description}</p>
      </div>
      <span className="bg-blue-100 text-blue-800 text-sm py-2 px-4 rounded-lg flex items-center justify-between w-full mt-3">
        View skill
        <ArrowRightIcon className="h-5 w-4" />
      </span>
    </TrackedLink>
  );
};
