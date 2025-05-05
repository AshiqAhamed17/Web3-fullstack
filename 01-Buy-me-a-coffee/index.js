import { createWalletClient, custom } from "https://esm.sh/viem"

const connectButton = document.getElementById('connect');

let walletClient

const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        await walletClient.requestAddresses()
        connectButton.innerHTML = "Connected!";
    }
    else {
        alert("Metamask is not installed");
    }
}

connectButton.onclick = connect;


