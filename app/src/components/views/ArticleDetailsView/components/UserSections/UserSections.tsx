import React, { useLayoutEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import SectionList from "components/ui/layout/SectionList";
import Section from "components/ui/layout/Section";
import SectionTitle from "components/ui/layout/SectionTitle";
import BottlingUserInput from "components/fragments/Bottling/BottlingUserInput";
import InventoryUserInput from "components/fragments/Inventory/InventoryUserInput";
import Themer from "components/ui/theme/Themer";
import { useBottling, useInventory } from "./hooks";
import { useUserCollectionArticle } from "components/hooks/db/useUserCollectionArticles";

type StyleProps = {
  folded: number;
};

const useStyles = makeStyles({
  fold: (props: StyleProps) => ({
    marginTop: props.folded ? `-${props.folded}px` : "0",
    transition: "all 1s",
    "& .collection": {
      opacity: props.folded ? 0 : 1,
      transition: "all 1s ease",
    },
  }),
  section: {
    padding: "0 24px 16px 24px",
  },
});

interface UserSectionsProps {
  userId: string;
  articleId: string;
}

const UserSections: React.FC<UserSectionsProps> = ({ userId, articleId }) => {
  const content = useRef<HTMLDivElement>(null);
  const [collapse, setCollapse] = useState<number>(0);

  useLayoutEffect(() => {
    const node = content.current;
    if (!node) {
      return;
    }

    const [collection, about] = Array.from(
      node.children[0].children
    ) as HTMLDivElement[];
    const heightDiff = about.offsetTop - collection.offsetTop;
    setCollapse(heightDiff);
  }, []);

  const userCollectionArticleEntry = useUserCollectionArticle(
    userId,
    articleId
  );

  const { bottling, handleBottlingChange } = useBottling(userId, articleId);
  const { inventory, handleInventoryChange } = useInventory(userId, articleId);

  const classes = useStyles({
    folded: !userCollectionArticleEntry?.data?.active ? collapse : 0,
  });

  return (
    <Themer theme="pure">
      <div ref={content} className={classes.fold}>
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
      </div>
    </Themer>
  );
};

export default UserSections;
