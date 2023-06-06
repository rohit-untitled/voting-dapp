import {
  Button,
  createStyles,
  Group,
  NumberInput,
  Paper,
  Stack,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { ArrowBarToRight, CurrencyEthereum } from "tabler-icons-react";
import { VotingContractState } from "../hooks/useVotingDapp";

type BuyTokensProps = {
  onBuy: (noOfTokens) => Promise<void>;
};

const useStyles = createStyles((theme) => ({
  numberIp: {
    flexGrow: 1,
  },
}));

export default function BuyTokens({ onBuy }: BuyTokensProps) {
  const { classes } = useStyles();
  const [count, setCount] = useState(0);
  return (
    <Paper shadow="md" p="lg">
      <Stack>
        <Title order={3}>Buy Tokens</Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onBuy(count);
          }}
        >
          <Group>
            <NumberInput
              icon={<ArrowBarToRight></ArrowBarToRight>}
              className={classes.numberIp}
              value={count}
              onChange={(val) => setCount(val)}
            ></NumberInput>
            <Button type="submit">Buy Tokens</Button>
          </Group>
        </form>
      </Stack>
    </Paper>
  );
}
