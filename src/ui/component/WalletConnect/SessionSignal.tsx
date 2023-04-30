import React from 'react';
import { useStatus } from './useStatus';
import clsx from 'clsx';

interface Props {
  size?: 'small' | 'normal';
  isBadge?: boolean;
  address: string;
  brandName: string;
  className?: string;
  pendingConnect?: boolean;
}

export const SessionSignal: React.FC<Props> = ({
  size = 'normal',
  isBadge,
  address,
  brandName,
  className,
  pendingConnect,
}) => {
  const status = useStatus(
    {
      address,
      brandName,
    },
    pendingConnect
  );

  const bgColor = React.useMemo(() => {
    switch (status) {
      case 'ACCOUNT_ERROR':
      case 'BRAND_NAME_ERROR':
        return 'bg-orange';

      case undefined:
      case 'DISCONNECTED':
      case 'RECEIVED':
      case 'REJECTED':
        return 'bg-gray-comment';

      default:
        return 'bg-green';
    }
  }, [status]);

  return (
    <div
      className={clsx(
        'rounded-full',
        {
          'w-[6px] h-[6px]': size === 'small',
          'w-[8px] h-[8px]': size === 'normal',
          'right-[-2px] bottom-[-2px] absolute': isBadge,
        },
        'border border-white',
        bgColor,
        className
      )}
    />
  );
};
