import React from "react";
import { makeStyles } from "@material-ui/styles";
import SectionList from "components/ui/layout/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import BottlingUserInput from "components/fragments/Bottling/BottlingUserInput";
import InventoryUserInput from "components/fragments/Inventory/InventoryUserInput";
import Themer from "components/ui/theme/Themer";
import { useBottling, useInventory } from "./hooks";

const useStyles = makeStyles({
  section: {
    padding: "0 24px 16px 24px",
  },
});

interface UserSectionsProps {
  userId: string;
  articleId: string;
}

const UserSections: React.FC<UserSectionsProps> = ({ userId, articleId }) => {
  const { bottling, handleBottlingChange } = useBottling(userId, articleId);
  const { inventory, handleInventoryChange } = useInventory(userId, articleId);

  const classes = useStyles();

  return (
    <Themer theme="pure">
      <SectionList>
        <div className="collection">
          <Section header={<SectionTitle main="Your Collection" />}>
            <div className={classes.section}>
              <InventoryUserInput
                inventory={inventory}
                onChange={handleInventoryChange}
              />
            </div>
          </Section>
        </div>

        <div className="about">
          <Section header={<SectionTitle main="About this bottling" />}>
            <div className={classes.section}>
              <BottlingUserInput
                bottling={bottling}
                onChange={handleBottlingChange}
              />
            </div>
          </Section>
        </div>
      </SectionList>
    </Themer>
  );
};

export default UserSections;
