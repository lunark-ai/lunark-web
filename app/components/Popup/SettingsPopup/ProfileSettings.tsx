import { useState } from 'react';
import { baseButtonStyle } from '@/constants';
import { useUserContext } from '@/contexts';
import { Copy, Trash } from 'iconoir-react';
import toast from 'react-hot-toast';
import Popup from '../Popup';
import { createAxiosInstance } from '@/lib/axios';

interface ProfileSettingsProps {
  onClose?: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onClose }) => {
  const { user, disconnect } = useUserContext();
  const [showDeleteAccountConfirmation, setShowDeleteAccountConfirmation] = useState(false);
  const [isIdCopied, setIsIdCopied] = useState(false);
  const [isAddressCopied, setIsAddressCopied] = useState(false);
  const [isCacheCleared, setIsCacheCleared] = useState(false);

  const handleCopy = (text: string, label: string, setCopied: (value: boolean) => void) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    
    try {
      await createAxiosInstance().delete('/user', {
        data: { userId: user.id }
      });
      disconnect();
      if (onClose) onClose();
      toast.success('Account deleted successfully');
    } catch (error) {
      console.error('Failed to delete account:', error);
      toast.error('Failed to delete account');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-6 border-b border-[#888]/30">
        <h3 className="text-lg font-medium text-[#FCFCFC]">Account Settings</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex-1">
                <h4 className="text-[#FCFCFC] font-medium">User ID</h4>
                <p className="text-[#5e8284] text-sm mt-1">Your unique identifier in the system</p>
              </div>
              <div className="flex-1 flex justify-end">
                <button 
                  onClick={() => user?.id && handleCopy(user.id, 'User ID', setIsIdCopied)}
                  className="text-right"
                >
                  <div className="text-[#FCFCFC] hover:text-green-400 transition-colors break-all font-mono text-sm">
                    {isIdCopied ? "Copied!" : user?.id}
                  </div>
                </button>
              </div>
            </div>

            <div className="w-[90%] mx-auto h-px bg-[#888]/30" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex-1">
                <h4 className="text-[#FCFCFC] font-medium">Wallet Address</h4>
                <p className="text-[#5e8284] text-sm mt-1">Your connected wallet address</p>
              </div>
              <div className="flex-1 flex justify-end">
                <button 
                  onClick={() => user?.address && handleCopy(user.address, 'Wallet address', setIsAddressCopied)}
                  className="text-right"
                >
                  <div className="text-[#FCFCFC] hover:text-green-400 transition-colors break-all font-mono text-sm">
                    {isAddressCopied ? "Copied!" : user?.address}
                  </div>
                </button>
              </div>
            </div>

            <div className="w-[90%] mx-auto h-px bg-[#888]/30" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex-1">
                <h4 className="text-[#FCFCFC] font-medium">Account Created</h4>
                <p className="text-[#5e8284] text-sm mt-1">When you joined Lunark AI</p>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="text-[#FCFCFC] text-sm text-right">
                  {user?.createdAt ? formatDate(user.createdAt) : '-'}
                </div>
              </div>
            </div>

            <div className="w-[90%] mx-auto h-px bg-[#888]/30" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex-1">
                <h4 className="text-[#FCFCFC] font-medium">Clear Onboarding Cache</h4>
                <p className="text-[#5e8284] text-sm mt-1">Reset the onboarding tutorials to view them again</p>
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => {
                    localStorage.removeItem('hasCompletedOnboarding');
                    localStorage.removeItem('hasCompletedWalletOnboarding');
                    toast.success('Onboarding cache cleared');
                    setIsCacheCleared(true);
                  }}
                  disabled={isCacheCleared}
                  className={`${baseButtonStyle} bg-red-500/20 hover:bg-red-500/30 text-red-500 px-4 py-2 rounded-full text-sm flex items-center gap-2 ${isCacheCleared ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Trash className="w-4 h-4 min-w-4" />
                  <span>Clear Cache</span>
                </button>
              </div>
            </div>

            <div className="w-[90%] mx-auto h-px bg-[#888]/30" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
              <div className="flex-1">
                <h4 className="text-[#FCFCFC] font-medium">Delete Account</h4>
                <p className="text-[#5e8284] text-sm mt-1">Permanently delete your account and all associated data</p>
              </div>
              <div className="flex-1 flex justify-end">
                <button
                  onClick={() => setShowDeleteAccountConfirmation(true)}
                  className={`${baseButtonStyle} bg-red-500/20 hover:bg-red-500/30 text-red-500 px-4 py-2 rounded-full text-sm flex items-center gap-2`}
                >
                  <Trash className="w-4 h-4 min-w-4" />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup
        isOpen={showDeleteAccountConfirmation}
        onClose={() => setShowDeleteAccountConfirmation(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and will delete all your data including chats and memories."
        confirmText="Delete Account"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
};

export default ProfileSettings; 