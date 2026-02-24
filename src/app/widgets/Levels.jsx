"use client";
import React from "react";
import { MakeLevelClickCallback } from "../utils";
import { renderLevel } from "../utils";

export default function Levels({ levels, songid, isPlayer }) {
  /*for (let i = 0; i < levels.length; i++) {
    if (levels[i] == null || levels[i] == "") {
      levels[i] = "-";
    }
  }*/
  const levelClickCallback = MakeLevelClickCallback(songid, isPlayer);

  if (levels.length === 1) {
    // this is an utage
    return (
      <div
        className="songLevel"
        onClick={levelClickCallback}
      >
        {renderLevel(levels[0])}
      </div>
    )
  }

  const makeLevel = (levelIndex) => (
    levels[levelIndex]
      ? <div
          className="songLevel"
          // add 1 since converts don't have "easy" difficulties
          id={'lv' + (levelIndex + 1)}
          onClick={levelClickCallback}
        >
          {renderLevel(levels[levelIndex])}
        </div>
      : <div />
  );

  return <>
    {makeLevel(0)}
    {makeLevel(1)}
    {makeLevel(2)}
    {makeLevel(3)}
    {makeLevel(4)}
    {makeLevel(5)}
  </>;
}
