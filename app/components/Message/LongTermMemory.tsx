import { Brain } from "iconoir-react";
import { IMemory } from "@/types/memory";
import { baseContainerStyle } from "@/constants";
import { useGlobalContext } from "@/contexts";

interface LongTermMemoryProps {
  memory: IMemory;
  onSettingsOpen?: () => void;
}

const LongTermMemory = ({ memory, onSettingsOpen }: LongTermMemoryProps) => {
  return (
    <div 
      className={`flex w-fit items-center rounded-lg px-4 py-2 mt-4 mb-2 ${baseContainerStyle} cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition-colors`}
      onClick={onSettingsOpen}
    >
      <Brain className="w-5 h-5 mr-3 text-green-600 dark:text-green-400" />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-green-600 dark:text-green-400">
          Long-Term Memory Stored
        </span>
      </div>
    </div>
  );
};

export default LongTermMemory;