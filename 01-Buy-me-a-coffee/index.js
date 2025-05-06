import { createWalletClient, custom, createPublicClient, defineChain, parseEther, formatEther } from "https://esm.sh/viem";
import { contractAddress, abi } from "./constants.js";

const connectButton = document.getElementById('connect-btn');
const fundButton = document.getElementById('fund-btn');
const ethAmountInput = document.getElementById('ethAmount');
const balanceButton = document.getElementById('balance-btn');


let walletClient;
let publicClient;

const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        await walletClient.requestAddresses();
        connectButton.innerHTML = "Connected!";
    }
    else {
        alert("Metamask is not installed");
    }
}

const fund = async () => {
    const ethAmount = ethAmountInput.value;
    console.log(`Fund Amount: ${ethAmount}`);

    if (typeof window.ethereum !== 'undefined') {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        });
        const [connectedAccounts] = await walletClient.requestAddresses();
        const currentChain = await getCurrentChain(walletClient)
        connectButton.innerHTML = "Connected!";

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        });
        const { request } = await publicClient.simulateContract({
            address: contractAddress,
            abi: abi,
            functionName: "fund",
            account: connectedAccounts,
            chain: currentChain,
            value: parseEther(ethAmount),
        });
        
        const hash = await walletClient.writeContract(request);
        console.log(hash);

    }
    else {
        alert("Metamask is not installed");
    }
}

async function getCurrentChain(client) {
    const chainId = await client.getChainId()
    const currentChain = defineChain({
        id: chainId,
        name: "Custom Chain",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {
            default: {
                http: ["http://localhost:8545"],
            },
        },
    })
    return currentChain;
}

const getBalance = async () => {
    if (typeof window.ethereum !== 'undefined') {
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
    });
    const balance = await publicClient.getBalance({
        address: contractAddress
    });
    console.log(formatEther(balance));
    
    }
}

connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = getBalance;