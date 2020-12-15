import React from "react";
import SectionList from "components/ui/layout/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import BottlingUserInput from "components/fragments/Bottling/BottlingUserInput";
import InventoryUserInput from "components/fragments/Inventory/InventoryUserInput";
import { useBottling, useInventory } from "./hooks";

interface UserSectionsProps {
  userId: string;
  articleId: string;
}

const UserSections: React.FC<UserSectionsProps> = ({ userId, articleId }) => {
  const { bottling, handleBottlingChange } = useBottling(userId, articleId);
  const { inventory, handleInventoryChange } = useInventory(userId, articleId);

  return (
    <SectionList>
      <Section header={<SectionTitle main="Your Collection" />}>
        <InventoryUserInput
          inventory={inventory}
          onChange={handleInventoryChange}
        />
      </Section>
      <Section header={<SectionTitle main="About this bottling" />}>
        <BottlingUserInput
          bottling={bottling}
          onChange={handleBottlingChange}
        />
      </Section>
    </SectionList>
  );
};

export default UserSections;
