A club voting decentralized application, powered by Next.js, web3-react and Ethereum.

## Your Problem Statement

- You run a blockchain club at college. You’re voting for a club lead, anyone can vote. But you want the votes to be verifiable and trustable
- However, you also need funds. So you decide to create a smart contract and dApp that will let anyone vote by purchasing vote tokens using ether
- Once the vote is done, you should be able to withdraw the amount contributed by everyone

## Quick Setup

1. Deploy the Voting Smart Contract (found at [contracts/ClubVoting.sol](/contracts/ClubVoting.sol)) using your deployment method of choice (for instance - use [Remix](http://remix.ethereum.org)). When deploying, don't forget to put in your constructor arguments. Also, remember that we're using bytes32 and not string for our candidate names - this means that we need to encode names before passing them in using a utility (for example, you can use the Remix console to encode - `web3.utils.rightPad(web3.utils.fromAscii("bob"), 64)`)
2. Get the contract address from your deployment method and plug it into the `VOTING_CONTRACT_ADDRESS` constant in [pages/index.tsx](/pages/index.tsx)
3. Install dependencies (`yarn install`)
4. Run the development server (`yarn run dev`)

## Take-Home Challenge

- Implement the capability to see all the votes performed by one address (auditability) [Difficulty - Easy] [Contribute under issue https://github.com/amithkk/voting-dapp/issues/1]
- Reduce gas usage of the contract (gas is money!) [Difficulty - Intermediate] [Contribute under issue https://github.com/amithkk/voting-dapp/issues/2]
- Use ERC20 tokens for facilitating voting [Difficulty - Hard] [Contribute under issue https://github.com/amithkk/voting-dapp/issues/3]

## Features

- Separate packages from [ethers.js](https://docs.ethers.io/v5/) for improved tree-shaking, often only ethers Contracts
- Hooks-first approach to fetching and caching data from Contracts and memoization for performance with [SWR](https://swr.vercel.app)
- [web3-react](https://github.com/NoahZinsmeister/web3-react) for ease of connecting to Web3 providers with a solid API
- Auto-generates types for the contract ABIs in the `/contracts` folder via [TypeChain](https://github.com/ethereum-ts/TypeChain)

### Auto Contract Type Generation

**Note**: After adding in your new contract ABIs (in JSON format) to the `/contracts` folder, run `yarn compile-contract-types` to generate the types.

You can import these types when declaring a new Contract hook. The types generated show the function params and return types of your functions, among other helpful types.

```ts
import MY_CONTRACT_ABI from "../contracts/MY_CONTRACT.json";
import type { MY_CONTRACT } from "../contracts/types";
import useContract from "./useContract";

export default function useMyContract() {
  return useContract<MY_CONTRACT>(CONTRACT_ADDRESS, MY_CONTRACT_ABI);
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
