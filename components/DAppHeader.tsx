import React from "react";
import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Text,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import Account from "./Account";

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colors[theme.primaryColor][8],
    borderBottom: 0,
  },

  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

type DAppHeaderProps = {
  triedToEagerConnect: boolean;
};

export function DAppHeader({ triedToEagerConnect }: DAppHeaderProps) {
  const { classes } = useStyles();

  return (
    <Header height={56} className={classes.header} mb={30}>
      <Container>
        <div className={classes.inner}>
          <Text color="white" size="lg" weight={700}>
            ClubVoting DApp
          </Text>
          <Account triedToEagerConnect={triedToEagerConnect}></Account>
        </div>
      </Container>
    </Header>
  );
}
