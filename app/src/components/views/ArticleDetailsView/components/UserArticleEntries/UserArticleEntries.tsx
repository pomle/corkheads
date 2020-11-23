import React from "react";
import EntryList from "components/ui/layout/EntryList";
import Entry from "components/ui/layout/Entry";

interface UserArticleEntriesProps {}

const UserArticleEntries: React.FC<UserArticleEntriesProps> = () => {
  return (
    <EntryList>
      <Entry name="Bottles">
        <input type="number" placeholder="# of bottles" />
      </Entry>
      <Entry name="Series">
        <input type="text" placeholder="Enter information" />
      </Entry>
      <Entry name="Distilled">
        <input type="text" placeholder="Enter information" />
      </Entry>
      <Entry name="Bottled">
        <input type="text" placeholder="Enter information" />
      </Entry>
      <Entry name="Aged">
        <input type="number" placeholder="# of years" />
      </Entry>
      <Entry name="Alcohol">
        <input type="number" placeholder="%" />
      </Entry>
    </EntryList>
  );
};

export default UserArticleEntries;
