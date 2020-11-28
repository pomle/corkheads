import React, { useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import SectionList from "components/ui/layout/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import { Entry } from "types/Entry";
import { UserArticle } from "types/UserArticle";
import BottlingUserInput from "components/fragments/Bottling/BottlingUserInput";
import { Article } from "types/Article";
import { Bottling } from "types/Bottling";
import InventoryUserInput from "components/fragments/Inventory/InventoryUserInput";
import { Inventory } from "types/Inventory";
import { diffBottling, getBottling } from "lib/patch";
import { debounce } from "lib/debounce";

const useStyles = makeStyles({
  section: {
    background: "#fff",
    padding: "24px",
  },
});

const STORE_DELAY = 5000;

interface UserSectionsProps {
  articleEntry: Entry<Article>;
  userArticleEntry: Entry<UserArticle>;
}

const UserSections: React.FC<UserSectionsProps> = ({
  articleEntry,
  userArticleEntry,
}) => {
  const { owner } = userArticleEntry.data || { owner: false };

  const article = articleEntry.data;
  const userArticle = userArticleEntry.data;

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

  const inventory = userArticleEntry.data?.inventory || { bottlesOwned: 0 };

  const handleChangeBottling = useMemo(() => {
    const existingBottling = article?.bottling;
    return debounce((bottling: Bottling) => {
      let effective = bottling;

      if (existingBottling) {
        effective = diffBottling(existingBottling, effective);
      }

      userArticleEntry.doc.update({
        bottling: effective,
      });
    }, STORE_DELAY);
  }, [article, userArticleEntry.doc]);

  const handleChangeInventory = useMemo(() => {
    return debounce((inventory: Inventory) => {
      userArticleEntry.doc.update({
        inventory,
      });
    }, STORE_DELAY);
  }, [userArticleEntry.doc]);

  const classes = useStyles({ owner });

  return (
    <SectionList>
      <Section header={<SectionTitle main="My collection" />}>
        <div className={classes.section}>
          {inventory && (
            <InventoryUserInput
              inventory={inventory}
              onChange={handleChangeInventory}
            />
          )}
        </div>
      </Section>

      <Section header={<SectionTitle main="Whiskey data" />}>
        <div className={classes.section}>
          {bottling && (
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
