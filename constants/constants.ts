export const INFURA_API_KEY = process.env.INFURA_API_KEY!;
export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY!;

// Network RPCs
export const NETWORK_FORK_URL = `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`;
export const NETWORK_MAINNET_URL = `https://mainnet.infura.io/v3/${INFURA_API_KEY}`;
export const NETWORK_RINKEBY_URL = `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`;
export const NETWORK_ROPSTEN_URL = `https://ropsten.infura.io/v3/${INFURA_API_KEY}`;

// Accounts
export const PRIVATE_KEY = process.env.PRIVATE_KEY!;
export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY!;
console.log(process.env.PRIVATE_KEY)