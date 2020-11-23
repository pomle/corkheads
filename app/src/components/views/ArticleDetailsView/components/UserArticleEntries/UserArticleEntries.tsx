import React, { useCallback } from "react";
import EntryList from "components/ui/layout/EntryList";
import Entry from "components/ui/layout/Entry";
import { UserArticle, UserCollectionEntry } from "types/UserArticle";
import { Container } from "types/Container";

interface UserArticleEntriesProps {
  userArticleEntry: Container<UserArticle>;
}

function getBottleCount(bottles: any): string {
  return bottles?.count?.toString() || "";
}

function getAge(aged: any): string {
  return aged?.years?.toString() || "";
}

function getBottled(bottled: any): string {
  return bottled?.year?.toString() || "";
}

const UserArticleEntries: React.FC<UserArticleEntriesProps> = ({
  userArticleEntry,
}) => {
  const { bottles, bottled, aged } = userArticleEntry.data.collection;

  const save = useCallback(
    (data: Partial<UserCollectionEntry>) => {
      userArticleEntry.ref.set(
        {
          collection: data,
        },
        { merge: true }
      );
    },
    [userArticleEntry.ref]
  );

  const handleBottleCount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      save({
        bottles: {
          count: parseFloat(event.target.value),
        },
      });
    },
    [save]
  );

  const handleAged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      save({
        aged: {
          years: parseFloat(event.target.value),
        },
      });
    },
    [save]
  );

  const handleBottled = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      save({
        bottled: {
          year: parseFloat(event.target.value),
        },
      });
    },
    [save]
  );

  return (
    <EntryList>
      <Entry name="Bottles">
        <input
          type="number"
          placeholder="# of bottles"
          value={getBottleCount(bottles)}
          onChange={handleBottleCount}
        />
      </Entry>
      <Entry name="Series">
        <input type="text" placeholder="Enter information" />
      </Entry>
      <Entry name="Distilled">
        <input type="text" placeholder="Enter information" />
      </Entry>
      <Entry name="Bottled">
        <input
          type="text"
          placeholder="Year"
          value={getBottled(bottled)}
          onChange={handleBottled}
        />
      </Entry>
      <Entry name="Aged">
        <input
          type="number"
          placeholder="# of years"
          value={getAge(aged)}
          onChange={handleAged}
        />
      </Entry>
      <Entry name="Alcohol">
        <input type="number" placeholder="%" />
      </Entry>
    </EntryList>
  );
};

export default UserArticleEntries;
