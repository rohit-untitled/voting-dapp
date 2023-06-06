import { VotingContractState } from "../hooks/useVotingDapp";
import {
  Text,
  Paper,
  Title,
  Group,
  Table,
  createStyles,
  Badge,
  Progress,
  ThemeIcon,
  Button,
} from "@mantine/core";
import { CurrencyEthereum } from "tabler-icons-react";

type StatsProps = {
  contractState: VotingContractState;
  contractBalance: string;
  withdrawTokens: () => void;
};
const ICON_SIZE = 60;

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    overflow: "visible",
    flexGrow: 1,
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
  },

  icon: {
    position: "absolute",
    top: -ICON_SIZE / 3,
    left: `calc(50% - ${ICON_SIZE / 2}px)`,
  },
  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
  tableStyle: {
    borderCollapse: "separate",
    borderRadius: "12px",
    border: "1px solid black",
  },
}));

export default function Stats({
  contractState,
  contractBalance,
  withdrawTokens,
}: StatsProps) {
  const { classes } = useStyles();

  return (
    <>
      <Paper shadow="md" p="lg">
        <Title order={3}>Contract Status</Title>
        <Group p="md">
          <Table className={classes.tableStyle} width={"auto"}>
            <tbody>
              <tr>
                <td>Price Per Token</td>{" "}
                <td> {contractState.pricePerToken} ETH </td>
              </tr>
              <tr>
                <td>Amount Donated to the Contract</td>{" "}
                <td> {contractBalance} ETH </td>
                <td>
                  <Button
                    onClick={withdrawTokens}
                    size="xs"
                    ml=".2em"
                    fullWidth
                  >
                    Attempt Withdraw
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Tokens I have</td>{" "}
                <td>{contractState.myTokens} token(s)</td>
              </tr>
            </tbody>
          </Table>
          <Paper
            radius="md"
            withBorder
            className={classes.card}
            mt={ICON_SIZE / 3}
          >
            <ThemeIcon
              className={classes.icon}
              size={ICON_SIZE}
              radius={ICON_SIZE}
            >
              <CurrencyEthereum></CurrencyEthereum>
            </ThemeIcon>

            <Text align="center" weight={700} className={classes.title}>
              Token Usage Statistics
            </Text>

            <Group position="apart" mt="xs">
              <Text size="sm" color="dimmed">
                Usage
              </Text>
              <Text size="sm" color="dimmed">
                {(contractState.tokensSold * 100) / contractState.tokensForSale}{" "}
                %
              </Text>
            </Group>

            <Progress
              value={
                (contractState.tokensSold * 100) / contractState.tokensForSale
              }
              mt={5}
            />

            <Group position="apart" mt="md">
              <Text size="sm">
                {contractState.tokensSold} / {contractState.tokensForSale}{" "}
                tokens
              </Text>
              <Badge size="sm">Only a few days left!</Badge>
            </Group>
          </Paper>
        </Group>
      </Paper>
    </>
  );
}
