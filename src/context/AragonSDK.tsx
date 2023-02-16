import { createContext, useContext, useEffect, useState } from 'react';

import { useSigner } from 'wagmi';
import { Context, ContextParams } from '@aragon/sdk-client';

const AragonSDKContext = createContext({});

export function AragonSDKWrapper({ children }: any): JSX.Element {
  const [context, setContext] = useState<Context | undefined>(undefined);
  const signer = useSigner().data || undefined;

  useEffect(() => {
    const aragonSDKContextParams: ContextParams = {
      network: 'goerli',
      signer,
      daoFactoryAddress: '0x66DBb74f6cADD2486CBFf0b9DF211e3D7961eBf9',
      web3Providers: ['https://rpc.ankr.com/eth_goerli'],
      ipfsNodes: [
        {
          url: 'https://testing-ipfs-0.aragon.network/api/v0',
          headers: { 'X-API-KEY': process.env.REACT_APP_IPFS_KEY || '' }
        },
      ],
      graphqlNodes: [
        {
          url:
            'https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/core-goerli/version/v0.7.2-alpha/api'
        }
      ]
    };

    setContext(new Context(aragonSDKContextParams));
  }, [signer]);

  return (
    <AragonSDKContext.Provider value={{ context }}>
      {children}
    </AragonSDKContext.Provider>
  )
}

export function useAragonSDKContext(): any {
  return useContext(AragonSDKContext);
}
