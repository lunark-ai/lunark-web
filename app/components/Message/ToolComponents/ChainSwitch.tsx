import { useAppKitNetwork } from '@reown/appkit/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import LoadingIcon from '../../Base/LoadingIcon';
import { useAppKitContext } from '@/contexts';
import toast from 'react-hot-toast';
import { baseButtonStyle } from '@/constants';

interface ChainSwitchProps {
    data: {
        requiredChainId: string;
    };
}

const ChainSwitch = ({ data }: ChainSwitchProps) => {
    const [isExecuting, setIsExecuting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isNetworkMatch, setIsNetworkMatch] = useState(false);
    const { appKitNetworks } = useAppKitContext();
    const { chainId, switchNetwork } = useAppKitNetwork();

    useEffect(() => {
        if (chainId === data.requiredChainId) {
            setIsNetworkMatch(true);
        } else {
            setIsNetworkMatch(false);
            setIsSuccess(false);
        }
    }, [chainId, data.requiredChainId]);

    const handleSwitch = async () => {
        setIsExecuting(true);

        const appKitNetwork = appKitNetworks.find((n: any) => n.id === data.requiredChainId);
        if (!appKitNetwork) return;

        if (chainId === data.requiredChainId) {
            toast.success('You are already on the required network');
            setTimeout(() => {
                setIsExecuting(false);
                setIsSuccess(true);
            }, 1000);
            return;
        }

        await switchNetwork(appKitNetwork);

        setTimeout(() => {
            setIsExecuting(false);
            setIsSuccess(true);
        }, 1000);
        toast.success('Network switched successfully');
    };

    return (
        <div className="flex items-center gap-2 mt-3 mb-1">
            <motion.button
                onClick={handleSwitch}
                disabled={isExecuting || isSuccess || isNetworkMatch}
                className={`${baseButtonStyle} w-fit py-1 px-4 text-[#FCFCFC] rounded-full ${(isExecuting || isSuccess || isNetworkMatch) ? 'opacity-50' : ''}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {isExecuting ? (
                        <div className="flex items-center gap-2">
                            <LoadingIcon isSmall /> 
                            <span>Switching</span>
                        </div>
                    ) : isSuccess ? (
                        'Successfully Switched'
                    ) : isNetworkMatch ? (
                        'No Switch Needed'
                    ) : (
                        'Switch Network'
                    )}
                </motion.div>
            </motion.button>
        </div>
    );
}; 

export default ChainSwitch;