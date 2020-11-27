import React, { useCallback, useEffect, useMemo, useState } from "react";
import EntryList from "components/ui/layout/EntryList";
import Entry from "components/ui/layout/Entry";
import { UserArticle } from "types/UserArticle";
import { Container } from "types/Container";

type Entries = {
  bottles: string;
  aged: string;
  bottled: string;
  abv: string;
};

function toEntries(source: UserArticle["collection"]): Entries {
  return {
    abv: source.abv?.toFixed ? (source.abv * 100).toFixed(0) : "",
    aged: source.aged?.years?.toString() || "",
    bottled: source.bottled?.year?.toString() || "",
    bottles: source.bottles?.count?.toString() || "",
  };
}

/*
function entriesEqual(a: Record<string, any>, b: Record<string, any>) {
  for (const key of Object.keys(a)) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
*/

const SAVE_TIMEOUT = 5000;

function toNumberMaybe(source: unknown) {
  const maybeNumber = parseFloat(source as string);
  if (isFinite(maybeNumber)) {
    return maybeNumber as number;
  }
  return NaN;
}

function toCollection(source: Entries): UserArticle["collection"] {
  const collection: UserArticle["collection"] = Object.create(null);

  const alcoholPercentage = toNumberMaybe(source.abv);
  if (!isNaN(alcoholPercentage)) {
    collection.abv = alcoholPercentage / 100;
  }

  const agedTimeYears = toNumberMaybe(source.aged);
  if (!isNaN(agedTimeYears)) {
    collection.aged = {
      years: agedTimeYears,
    };
  }

  const yearBottled = toNumberMaybe(source.bottled);
  if (!isNaN(yearBottled)) {
    collection.bottled = {
      year: yearBottled,
    };
  }

  const bottleCount = toNumberMaybe(source.bottles);
  if (!isNaN(bottleCount)) {
    collection.bottles = {
      count: bottleCount,
    };
  }

  return collection;
}

interface UserArticleEntriesProps {
  userArticleEntry: Container<UserArticle>;
}

const UserArticleEntries: React.FC<UserArticleEntriesProps> = ({
  userArticleEntry,
}) => {
  const initial = useMemo((): Entries => {
    return toEntries(userArticleEntry.data.collection);
  }, [userArticleEntry]);

  const [entries, setEntries] = useState<Entries>(initial);

  useEffect(() => {
    setEntries(initial);
  }, [initial]);

  const store = useCallback(
    (entries: Entries) => {
      const collection = toCollection(entries);
      userArticleEntry.ref.set(
        {
          collection,
        },
        { merge: true }
      );
    },
    [userArticleEntry]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      store(entries);
    }, SAVE_TIMEOUT);
    return () => clearTimeout(timer);
  }, [entries, store]);

  const updateEntries = useCallback(
    (data: Partial<Entries>) => {
      setEntries((entries) => {
        return { ...entries, ...data };
      });
    },
    [setEntries]
  );

  const handleBottles = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateEntries({
        bottles: event.target.value,
      });
    },
    [updateEntries]
  );

  const handleAged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateEntries({
        aged: event.target.value,
      });
    },
    [updateEntries]
  );

  const handleBottled = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateEntries({
        bottled: event.target.value,
      });
    },
    [updateEntries]
  );

  const handleABV = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateEntries({
        abv: event.target.value,
      });
    },
    [updateEntries]
  );

  return (
    <EntryList>
      <Entry name="Bottles">
        <input
          type="number"
          placeholder="# of bottles"
          value={entries.bottles}
          onChange={handleBottles}
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
          value={entries.bottled}
          onChange={handleBottled}
        />
      </Entry>
      <Entry name="Aged">
        <input
          type="number"
          placeholder="# of years"
          value={entries.aged}
          onChange={handleAged}
        />
      </Entry>
      <Entry name="Alcohol">
        <input
          type="number"
          placeholder="%"
          value={entries.abv}
          onChange={handleABV}
        />
      </Entry>
    </EntryList>
  );
};

export default UserArticleEntries;
