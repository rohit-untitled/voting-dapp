import { parseBytes32String } from "@ethersproject/strings";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import { DAppHeader } from "../components/DAppHeader";
import useEagerConnect from "../hooks/useEagerConnect";
import useVotingContract from "../hooks/useVotingContract";
import useVotingDapp from "../hooks/useVotingDapp";
import Stats from "../components/Stats";
import { Container, Stack } from "@mantine/core";
import { formatEther } from "@ethersproject/units";
import BuyTokens from "../components/BuyTokens";
import CandidateVotes from "../components/CandidateVotes";
import { NotConnected } from "../components/NotConnected";
import ShowVotesByAddress from "../components/ShowVotesByAddress";

const VOTING_TOKEN_ADDRESS = "0x1B127C04546955F959F56BA437aAf77D24C72AD0";

function Home() {
  const { account, library } = useWeb3React();

  const [
    contractState,
    contractBalance,
    buyTokens,
    voteForCandidate,
    withdrawTokens,
    showVoterInfo,
  ] = useVotingDapp(VOTING_TOKEN_ADDRESS);

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <>
      <Head>
        <title>ClubVoting DApp</title>
      </Head>
      <DAppHeader triedToEagerConnect={triedToEagerConnect}></DAppHeader>
      {isConnected ? (
        <Container mb="40px">
          <Stack>
            <BuyTokens onBuy={buyTokens}></BuyTokens>
            <Stats
              contractState={contractState}
              contractBalance={
                contractBalance.data ? formatEther(contractBalance.data) : "0"
              }
              withdrawTokens={() => {
                withdrawTokens(account);
              }}
            ></Stats>
            <CandidateVotes
              contractState={contractState}
              onVote={voteForCandidate}
            ></CandidateVotes>
             {/* showVotesbyAddress is a dropdown list of the addresses that purchased and voted at least once. */}
             <ShowVotesByAddress contractState={contractState} 
            onSubmit={showVoterInfo} ></ShowVotesByAddress>
          </Stack>
        </Container>
      ) : (
        <NotConnected></NotConnected>
      )}
    </>
  );
}

export default Home;
