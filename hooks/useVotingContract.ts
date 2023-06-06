import ClubVoting_ABI from "../contracts/ClubVoting.json";
import type { ClubVoting } from "../contracts/types";
import useContract from "./useContract";

export default function useVotingContract(tokenAddress?: string) {
  return useContract<ClubVoting>(tokenAddress, ClubVoting_ABI);
}
