import { InfoCircle } from 'iconoir-react';
import Tooltip from './Tooltip';

interface InfoButtonProps {
  text: string;
}

const InfoButton: React.FC<InfoButtonProps> = ({ text }) => {
  return (
    <Tooltip text={text}>
      <InfoCircle className="h-4 w-4 text-[#5e8284] cursor-help" />
    </Tooltip>
  );
};

export default InfoButton; 