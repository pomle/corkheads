import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import SectionList from "components/ui/layout/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import BottlingUserInput from "components/fragments/Bottling/BottlingUserInput";
import { Bottling } from "types/Bottling";
import InventoryUserInput from "components/fragments/Inventory/InventoryUserInput";
import { Inventory } from "types/Inventory";
import { diffBottling, getBottling } from "lib/patch";
import { debounce } from "lib/debounce";
import { useArticle } from "components/hooks/db/useArticles";
import { useUserArticle } from "components/hooks/db/useUserArticles";

const useStyles = makeStyles({
  section: {
    background: "#fff",
    padding: "24px",
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

  const initialBottling = useMemo(() => {
    if (article && userArticle) {
      return getBottling(article, userArticle);
    }
    return;
  }, [article, userArticle]);

  const [bottling, setBottling] = useState<Bottling>();

  useEffect(() => {
    setBottling(initialBottling);
  }, [initialBottling]);

  const handleChangeBottling = useMemo(() => {
    if (!userArticleEntry) {
      return;
    }

    const article = articleEntry?.data;
    const userArticle = userArticleEntry?.data;

    if (!article || !userArticle) {
      return;
    }

    return debounce((bottling: Bottling) => {
      let effective = bottling;

      const existingBottling = article?.bottling;
      if (existingBottling) {
        effective = diffBottling(existingBottling, effective);
      }

      userArticleEntry.doc.update({
        bottling: effective,
      });
    }, STORE_DELAY);
  }, [articleEntry, userArticleEntry]);

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
    <SectionList>
      <Section header={<SectionTitle main="My collection" />}>
        <div className={classes.section}>
          {inventory && handleChangeInventory && (
            <InventoryUserInput
              inventory={inventory}
              onChange={handleChangeInventory}
            />
          )}
        </div>
      </Section>

      <Section header={<SectionTitle main="Whiskey data" />}>
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
  );
};

export default UserSections;
