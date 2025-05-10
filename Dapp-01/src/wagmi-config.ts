import { getDefaultConfig } from '@wagmi/core';
import { mainnet, sepolia } from 'wagmi/chains';
import { createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';

export const wagmiConfig = createConfig(
    getDefaultConfig({
        chains: [sepolia],
        connectors: [injected()],
        ssr: false
    })
);