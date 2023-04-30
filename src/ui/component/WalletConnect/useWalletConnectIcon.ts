import { KEYRING_CLASS, WALLET_BRAND_TYPES } from '@/constant';
import { useWallet } from '@/ui/utils';
import React from 'react';

export const useWalletConnectIcon = (
  account: {
    address: string;
    brandName: string;
    type: string;
  } | null
) => {
  const wallet = useWallet();
  const [url, setUrl] = React.useState<string>();

  React.useEffect(() => {
    if (!account) return;
    if (
      account.type !== KEYRING_CLASS.WALLETCONNECT ||
      account.brandName !== WALLET_BRAND_TYPES.WALLETCONNECT
    ) {
      return;
    }

    wallet.getCommonWalletConnectInfo(account.address).then((result) => {
      if (!result) return;
      setUrl(result.realBrandUrl);
    });
  }, [account]);

  return url;
};
