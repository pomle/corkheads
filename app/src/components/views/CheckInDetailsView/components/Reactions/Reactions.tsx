import React, { ReactElement, useCallback, useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import { useCheckInReaction } from "components/hooks/db/useCheckInReaction";
import { useCheckInReactions } from "components/hooks/db/useCheckInReactions";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { ReactComponent as CheersIconOn } from "assets/graphics/icons/reaction-active-cheers.svg";
import { ReactComponent as LikeIconOn } from "assets/graphics/icons/reaction-active-like.svg";
import { ReactComponent as LoveIconOn } from "assets/graphics/icons/reaction-active-love.svg";
import { ReactComponent as DrunkIconOn } from "assets/graphics/icons/reaction-active-drunk.svg";
import { ReactComponent as RichIconOn } from "assets/graphics/icons/reaction-active-rich.svg";
import { ReactComponent as CheersIconOff } from "assets/graphics/icons/reaction-inactive-cheers.svg";
import { ReactComponent as LikeIconOff } from "assets/graphics/icons/reaction-inactive-like.svg";
import { ReactComponent as LoveIconOff } from "assets/graphics/icons/reaction-inactive-love.svg";
import { ReactComponent as DrunkIconOff } from "assets/graphics/icons/reaction-inactive-drunk.svg";
import { ReactComponent as RichIconOff } from "assets/graphics/icons/reaction-inactive-rich.svg";
import { ReactionTag } from "types/Reaction";

const tags: ReactionTag[] = ["cheers", "like", "love", "drunk", "rich"];

type ReactionCountAggregates = Record<ReactionTag, number>;

const activeIconMap: Record<ReactionTag, ReactElement> = {
  cheers: <CheersIconOn />,
  drunk: <DrunkIconOn />,
  like: <LikeIconOn />,
  love: <LoveIconOn />,
  rich: <RichIconOn />,
};

const inactiveIconMap: Record<ReactionTag, ReactElement> = {
  cheers: <CheersIconOff />,
  drunk: <DrunkIconOff />,
  like: <LikeIconOff />,
  love: <LoveIconOff />,
  rich: <RichIconOff />,
};

function toggleArrayValue(values: any[], value: any) {
  if (values.includes(value)) {
    return values.filter((v) => v !== value);
  }
  return [...values, value];
}

const useStyles = makeStyles({
  Reactions: {
    "& .tags": {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gridGap: "16px",
      justifyContent: "center",
      padding: "24px",
      "& .tag": {
        position: "relative",
        "& .icon": {
          height: "32px",
          margin: "auto",
          width: "32px",
          "@media (min-width: 360px)": {
            height: "48px",
            width: "48px",
          },
          "& svg": {
            height: "100%",
            width: "100%",
          },
        },
        "& .count": {
          bottom: 0,
          fontSize: "10px",
          position: "absolute",
          right: 0,
        },
      },
    },
  },
});

interface ReactionsProps {
  checkInId: string;
  userId: string;
}

const Reactions: React.FC<ReactionsProps> = ({ checkInId, userId }) => {
  const { reaction, putReaction, dropReaction } = useCheckInReaction(
    checkInId,
    userId
  );

  const { reactions } = useCheckInReactions(checkInId);

  const toggleTag = useCallback(
    (tag: ReactionTag) => {
      const tags = toggleArrayValue(reaction?.tags || [], tag);
      if (tags.length === 0) {
        dropReaction();
      } else {
        putReaction({
          ...reaction,
          tags,
        });
      }
    },
    [reaction, putReaction, dropReaction]
  );

  const counts = useMemo(() => {
    const counts: ReactionCountAggregates = {
      cheers: 0,
      love: 0,
      like: 0,
      rich: 0,
      drunk: 0,
    };

    if (!reactions) {
      return counts;
    }

    for (const reaction of reactions) {
      for (const tag of reaction.tags) {
        counts[tag]++;
      }
    }

    return counts;
  }, [reactions]);

  const classes = useStyles();

  return (
    <ThemeProvider theme="dusk">
      <div className={classes.Reactions}>
        <div className="tags">
          {tags.map((tag) => {
            const active = reaction?.tags.includes(tag);
            const iconMap = active ? activeIconMap : inactiveIconMap;
            return (
              <button
                key={tag}
                className={`tag ${active ? "active" : "inactive"}`}
                onClick={() => toggleTag(tag)}
              >
                <div className="icon">{iconMap[tag]}</div>
                <div className="count">{counts[tag] > 0 && counts[tag]}</div>
              </button>
            );
          })}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Reactions;
