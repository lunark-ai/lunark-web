"use client";

import { Archive, LogOut, Trash } from 'iconoir-react';
import { baseButtonStyle } from '@/constants';
import Dropdown from '../../Base/Dropdown';
import { useRouter } from 'next/navigation';
import { Language } from 'iconoir-react';
import LoadingIcon from '@/components/Base/LoadingIcon';

interface GeneralSettingsProps {
  language: string;
  setLanguage: (value: string) => void;
  onDeleteAllChats: () => void;
  onDisconnect: () => void;
  isDeleting?: boolean;
  isDisconnecting?: boolean;
}

const languageOptions = [
  { value: 'en', label: 'English' },
];

const GeneralSettings: React.FC<GeneralSettingsProps> = ({
  language,
  setLanguage,
  onDeleteAllChats,
  onDisconnect,
  isDeleting = false,
  isDisconnecting = false
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-6 border-b border-[#888]/30">
        <h3 className="text-lg font-medium text-[#FCFCFC]">General Settings</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex flex-col gap-1 flex-1">
                <h4 className="text-[#FCFCFC] font-medium">Language</h4>
                <p className="text-[#5e8284] text-sm">
                  Select your preferred language for the interface.
                </p>
              </div>
              <Dropdown
                value={language}
                options={languageOptions}
                onChange={setLanguage}
                className="w-32"
              />
            </div>

            <div className="w-[90%] mx-auto h-px bg-[#888]/30" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex flex-col gap-1 flex-1">
                <h4 className="text-[#FCFCFC] font-medium">Chat History</h4>
                <p className="text-[#5e8284] text-sm">
                  Manage your chat history and archives.
                </p>
              </div>
              <button
                onClick={() => router.push('/history')}
                className={`${baseButtonStyle} px-4 py-2 text-sm rounded-full flex items-center gap-2`}
              >
                <Archive className="w-4 h-4" />
                <span>History</span>
              </button>
            </div>

            <div className="w-[90%] mx-auto h-px bg-[#888]/30" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex flex-col gap-1 flex-1">
                <h4 className="text-[#FCFCFC] font-medium">Delete All Chats</h4>
                <p className="text-[#5e8284] text-sm">
                  Delete all your chat history. This action cannot be undone.
                </p>
              </div>
              <button
                onClick={onDeleteAllChats}
                disabled={isDeleting}
                className={`${baseButtonStyle} text-sm border-red-500/50 hover:border-red-500/75 px-4 py-2 rounded-full flex items-center gap-2 ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Trash className="w-4 h-4" />
                <span>Delete All</span>
                {isDeleting && <LoadingIcon isSmall />}
              </button>
            </div>

            <div className="w-[90%] mx-auto h-px bg-[#888]/30" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex flex-col gap-1 flex-1">
                <h4 className="text-[#FCFCFC] font-medium">Log Out on This Device</h4>
                <p className="text-[#5e8284] text-sm">
                  Sign out from your current session on this device.
                </p>
              </div>
              <button
                onClick={onDisconnect}
                disabled={isDisconnecting}
                className={`${baseButtonStyle} text-sm px-4 py-2 rounded-full flex items-center gap-2 ${isDisconnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
                {isDisconnecting && <LoadingIcon isSmall />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings; 