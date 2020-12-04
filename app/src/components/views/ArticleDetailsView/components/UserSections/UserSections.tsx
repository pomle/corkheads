import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import SectionList from "components/ui/layout/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import BottlingUserInput from "components/fragments/Bottling/BottlingUserInput";
import { Bottling } from "types/Bottling";
import InventoryUserInput from "components/fragments/Inventory/InventoryUserInput";
import { Inventory } from "types/Inventory";
import { debounce } from "lib/debounce";
import { useArticle } from "components/hooks/db/useArticles";
import { useUserArticle } from "components/hooks/db/useUserArticles";

import { useUserArticleBottlingUpdate } from "components/hooks/db/useUserArticleBottlingUpdate";
import { getPreferredBottling } from "lib/patch";
import Themer from "components/ui/theme/Themer";

const useStyles = makeStyles({
  section: {
    margin: "0 32px",
  },
});

const STORE_DELAY = 5000;

interface UserSectionsProps {
  userId: string;
  articleId: string;
}

const UserSections: React.FC<UserSectionsProps> = ({ userId, articleId }) => {
  const articleEntry = useArticle(articleId);
  const userArticleEntry = useUserArticle(userId, articleId);

  const article = articleEntry?.data;
  const userArticle = userArticleEntry?.data;

  const bottling = useMemo((): Bottling => {
    return getPreferredBottling(article, userArticle);
  }, [article, userArticle]);

  const updateBottling = useUserArticleBottlingUpdate(userId, articleId);
  const handleChangeBottling = useMemo(() => {
    return debounce(updateBottling, STORE_DELAY);
  }, [updateBottling]);

  const inventory = userArticleEntry?.data?.inventory;

  const handleChangeInventory = useMemo(() => {
    if (!userArticleEntry) {
      return;
    }

    return debounce((inventory: Inventory) => {
      userArticleEntry.doc.update({
        inventory,
      });
    }, STORE_DELAY);
  }, [userArticleEntry]);

  const classes = useStyles();

  return (
    <Themer theme="pure">
      <SectionList>
        <Section header={<SectionTitle main="Collection" />}>
          <div className={classes.section}>
            {inventory && handleChangeInventory && (
              <InventoryUserInput
                inventory={inventory}
                onChange={handleChangeInventory}
              />
            )}
          </div>
        </Section>

        <Section header={<SectionTitle main="About this bottling" />}>
          <div className={classes.section}>
            {bottling && handleChangeBottling && (
              <BottlingUserInput
                bottling={bottling}
                onChange={handleChangeBottling}
              />
            )}
          </div>
        </Section>
      </SectionList>
    </Themer>
  );
};

export default UserSections;
