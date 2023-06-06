import {
    Button,
    createStyles,
    Group,
    Paper,
    Select,
    Stack,
    Table,
    Title,
  } from "@mantine/core";
  import { BigNumber } from "ethers";
  import { useState } from "react";
  import { VotingContractState } from "../hooks/useVotingDapp";
  
  type ShowVotesByAddressProps = {
    contractState: VotingContractState;
    onSubmit: (voterAddress) => Promise<[BigNumber, BigNumber[]]>;
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
  
  export default function ShowVotesByAddress({
    contractState,
    onSubmit,
  }: ShowVotesByAddressProps) {
    const { classes } = useStyles();
    const [voterAddress, setCandidate] = useState<string | null>(null);
    const [voterTickets, changeVoteTickets] = useState<BigNumber | null>(null);
    const [voteMap, changeVoteMap] = useState([]);
  
    return (
      <Paper shadow="md" p="lg">
        <Stack>
          <Title order={3}>Voter info</Title>
  
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              let x = await onSubmit(voterAddress);
              console.log("stuff is" + x);
              if (Array.isArray(x)) {
                console.log(x);
                let a = x[0];
                var b = Array<string>();
                for (var i = 0; i < x[1].length; i++) {
                  b.push(x[1][i].toString());
                }
                changeVoteTickets(a);
                changeVoteMap(b);
              }
            }}
          >
            <Group>
              <Select
                className={classes.selIp}
                placeholder="Pick a voter address"
                data={contractState.voters.filter(obj => obj != "0x0000000000000000000000000000000000000000").map((idx) => (idx))}
                value={voterAddress}
                onChange={(val) => setCandidate(val)}
              />
  
              <Button type="submit">Audit Voter</Button>
              <Table p="md" className={classes.tableStyle}>
                <tbody>
                  {
                    <tr>
                      <td>{"Tokens brought : " + (voterTickets ? voterTickets : 0)}</td>
                    </tr>
                  }
                </tbody>
  
                <tbody>
                  {
                    contractState.candidateVotes.map((candidate, id) => (
                      <tr key={id}>
                        <td>{"voted for " + candidate.candidateName}</td>
                        <td>{(Array.isArray(voteMap)) ? voteMap[id] : 0}
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Group>
          </form>
        </Stack>
      </Paper>
    );
  }