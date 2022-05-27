import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();

import fs from "fs";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-preprocessor";
import "hardhat-gas-reporter"
import { HardhatUserConfig, task } from "hardhat/config";
import {
  ETHERSCAN_API_KEY,
  PRIVATE_KEY,
  NETWORK_FORK_URL,
  NETWORK_MAINNET_URL,
  NETWORK_RINKEBY_URL,
  NETWORK_ROPSTEN_URL,
} from "./constants";

import example from "./tasks/example";

function getRemappings() {
  return fs
    .readFileSync("remappings.txt", "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => line.trim().split("="));
}

task("example", "Example task").setAction(example);

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      // allowUnlimitedContractSize: true,
      forking: {
        url: NETWORK_FORK_URL,
        // blockNumber: 12984971,
      },
    },
    mainnet: {
      url: NETWORK_MAINNET_URL,
      accounts: [PRIVATE_KEY],
    },
    rinkeby: {
      url: NETWORK_RINKEBY_URL,
      accounts: [PRIVATE_KEY],
    },
    ropsten: {
      url: NETWORK_ROPSTEN_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: false,
    currency: "eth",
  },
  paths: {
    sources: "./src", // Use ./src rather than ./contracts as Hardhat expects
    cache: "./cache_hardhat", // Use a different cache for Hardhat than Foundry
  },
  // This fully resolves paths for imports in the ./lib directory for Hardhat
  preprocess: {
    eachLine: (hre) => ({
      transform: (line: string) => {
        if (line.match(/^\s*import /i)) {
          getRemappings().forEach(([find, replace]) => {
            if (line.match('"' + find)) {
              line = line.replace('"' + find, '"' + replace);
            }
          });
        }
        return line;
      },
    }),
  },
};

export default config;
