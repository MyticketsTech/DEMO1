// app.js

// ABI del contrato
const abi = [ /* Copia y pega aquí el ABI completo proporcionado en tu mensaje */ ];

// Dirección del contrato desplegado
const contractAddress = "0xd36481FAE21F2F3cE2fA228B3429e75097D0a41a";

// Conectarse a MetaMask
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected:', accounts[0]);
      return accounts[0];
    } catch (error) {
      console.error('Connection failed:', error);
    }
  } else {
    alert('MetaMask not detected');
  }
}

// Inicializa el contrato
async function initContract() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
}

// Mintar un nuevo NFT
async function mintNFT(to, tokenId, tokenCode) {
  try {
    const contract = await initContract();
    const transaction = await contract.mint(to, tokenId, tokenCode);
    await transaction.wait();
    console.log('NFT Minted:', transaction);
  } catch (error) {
    console.error('Minting failed:', error);
  }
}

// Verificar el código del NFT
async function verifyTokenCode(tokenId, code) {
  try {
    const contract = await initContract();
    const isValid = await contract.verifyTokenCode(tokenId, code);
    console.log('Verification result:', isValid);
    return isValid;
  } catch (error) {
    console.error('Verification failed:', error);
  }
}

// Event listeners for buttons
document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('mintButton').addEventListener('click', async () => {
  const to = document.getElementById('recipientAddress').value;
  const tokenId = document.getElementById('tokenId').value;
  const tokenCode = document.getElementById('tokenCode').value;
  await mintNFT(to, tokenId, tokenCode);
});
document.getElementById('verifyButton').addEventListener('click', async () => {
  const tokenId = document.getElementById('verifyTokenId').value;
  const code = document.getElementById('verifyTokenCode').value;
  await verifyTokenCode(tokenId, code);
});
