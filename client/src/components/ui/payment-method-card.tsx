import { FC } from 'react';

interface PaymentMethodCardProps {
  name: string;
  iconClass: string;
  selected?: boolean;
  onClick?: () => void;
}

export const PaymentMethodCard: FC<PaymentMethodCardProps> = ({
  name,
  iconClass,
  selected = false,
  onClick
}) => {
  return (
    <div 
      className={`bg-white p-4 rounded-lg cursor-pointer transition-all hover:shadow-md flex flex-col items-center border-2 ${selected ? 'border-primary' : 'border-gray-200'}`}
      onClick={onClick}
    >
      <div className={`text-3xl mb-2 ${iconClass}`}></div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  );
};
