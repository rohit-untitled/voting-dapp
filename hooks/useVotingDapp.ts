import { useEffect, useState } from "react";
import useETHBalance from "./useETHBalance";
import useVotingContract from "./useVotingContract";
import useBlockNumber from "./useBlockNumber";
import {
  parseBytes32String,
  formatBytes32String,
} from "@ethersproject/strings";
import { SWRResponse } from "swr";
import { BigNumber } from "@ethersproject/bignumber";
import { formatEther, parseUnits } from "@ethersproject/units";

export type CandidateVotes = {
  candidateName: string;
  votes: number;
};


export type VotingContractState = {
  tokensForSale: number;
  tokensSold: number;
  pricePerToken: string;
  candidateVotes: CandidateVotes[];
  myTokens: number;
  owner: string;

    // added these for the ShowVotesByAddress part.
  voters:string[];
  candidateList:string[];

};

export default function useVotingDapp(
  tokenAddress: string
): [
  VotingContractState,
  SWRResponse<BigNumber, any>,
  (noOfTokens) => Promise<void>,
  (candidateName, noOfTokens) => Promise<void>,
  (toAddress) => Promise<void>,
  (showVoterInfo) => Promise<[BigNumber,BigNumber[]]>
] {
  const contract = useVotingContract(tokenAddress);
  const [contractState, setContractState] = useState<VotingContractState>({
    tokensForSale: 0,
    tokensSold: 0,
    pricePerToken: "0",
    candidateVotes: [],
    myTokens: 0,
    owner: "0x0",
    voters:[''],
    candidateList:[]
  });
  const contractBalance = useETHBalance(tokenAddress);
  const [currentCostInWei, setCurrentCostInWei] = useState<BigNumber>(
    BigNumber.from(0)
  );
  const blockNumber = useBlockNumber();

  const buyTokens = async (noOfTokens) => {
    await contract
      .buy({
        value: currentCostInWei.mul(noOfTokens),
      })
      .catch((err) => {
        console.error(err);
        alert("Error buying tokens");
      });
  };

  const voteForCandidate = async (candidateName, numberOfTokens) => {
    await contract
      .voteForCandidate(formatBytes32String(candidateName), numberOfTokens)
      .catch((err) => {
        console.error(err);
        alert("Error voting for candidate");
      });
  };

  const withdrawFunds = async (toAddress: string) => {
    await contract.transferTo(toAddress).catch((err) => {
      console.error(err);
      alert("Could not withdraw");
    });
  };

  // new function added to call the contract to fetch voter info given an address
  const showVoterInfo = async ( voterAddress : string) =>{
    const err = [BigNumber.from(0),[ BigNumber.from(0)]]
    console.log();
    if (voterAddress == null){
      alert("Choose an address first");
      return err
    }
    let voterDetails = await contract.voterDetails(voterAddress).catch((err) => {
      console.error(err);
      alert("Could not find details");
      return err;
    });
     return voterDetails;

  }
  useEffect(() => {
    const refreshContactState = async () => {
      if (contract) {
        let tokensForSale = await (await contract.totalTokens()).toNumber();
        let tokensSold = await (await contract.tokensSold()).toNumber();
        setCurrentCostInWei(await contract.tokenPrice());
        let pricePerToken = formatEther(await contract.tokenPrice());
        let candidateList = await contract.allCandidates();
        let candidateVotes = await Promise.all(
          candidateList.map(async (candidate) => {
            return {
              candidateName: parseBytes32String(candidate),
              votes: await (await contract.totalVotesFor(candidate)).toNumber(),
            };
          })
        );
        let myTokens = await (await contract.myTokenCount()).toNumber();
        let owner = await contract.owner();


        let voters = await contract.showAllVotersAddresses();
        
        setContractState({
          tokensForSale,
          tokensSold,
          pricePerToken,
          candidateVotes,
          myTokens,
          owner,
          voters,
          candidateList,
        });
      } else {
        console.log("No Contract Loaded");
      }
    };
    refreshContactState();
  }, [contract, blockNumber.data]);

  useEffect(() => {
    console.log("State", contractState);
    console.log("Balance", contractBalance.data);
  }, [contractState, contractBalance.data]);

  return [
    contractState,
    contractBalance,
    buyTokens,
    voteForCandidate,
    withdrawFunds,
    showVoterInfo
  ];
}
