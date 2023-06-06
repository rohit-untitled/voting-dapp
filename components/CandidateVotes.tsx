import {
  Button,
  createStyles,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Table,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { ArrowBarToRight } from "tabler-icons-react";
import { VotingContractState } from "../hooks/useVotingDapp";

type CandidateVotesProps = {
  contractState: VotingContractState;
  onVote: (candidateName, noOfTokens) => Promise<void>;
};

const useStyles = createStyles((theme) => ({
  tableStyle: {
    borderCollapse: "separate",
    borderRadius: "12px",
    border: "1px solid black",
  },
  selIp: {
    flexGrow: 1,
  },
}));

export default function CandidateVotes({
  contractState,
  onVote,
}: CandidateVotesProps) {
  const { classes } = useStyles();
  const [tokenCount, setTokenCount] = useState<number | null>(null);
  const [candidate, setCandidate] = useState<string | null>(null);
  return (
    <Paper shadow="md" p="lg">
      <Stack>
        <Title order={3}>Vote Here!</Title>
        <Table p="md" className={classes.tableStyle}>
          <tbody>
            {contractState.candidateVotes.map((candidate, id) => (
              <tr key={id}>
                <td>{candidate.candidateName}</td>
                <td>{candidate.votes}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onVote(candidate, tokenCount);
          }}
        >
          <Group>
            <Select
              className={classes.selIp}
              placeholder="Pick a Candidate"
              data={contractState.candidateVotes.map(
                (candidate) => candidate.candidateName
              )}
              value={candidate}
              onChange={(val) => setCandidate(val)}
            />
            <NumberInput
              placeholder="No of Tokens"
              icon={<ArrowBarToRight></ArrowBarToRight>}
              value={tokenCount}
              onChange={(val) => setTokenCount(val)}
            ></NumberInput>
            <Button type="submit">Vote With Tokens</Button>
          </Group>
        </form>
      </Stack>
    </Paper>
  );
}
