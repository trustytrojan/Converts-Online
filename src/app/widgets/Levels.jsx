"use client";
import React from "react";
import { MakeLevelClickCallback } from "../utils";
import { renderLevel } from "../utils";

export default function Levels({ levels, songid, isPlayer }) {
  for (let i = 0; i < levels.length; i++) {
    if (levels[i] == null || levels[i] == "") {
      levels[i] = "-";
    }
  }
  const levelClickCallback = MakeLevelClickCallback(songid, isPlayer);

  const makeLevel = (levelIndex) => (
    levels[levelIndex]
      ? <div
          className="songLevel"
          // TODO: REMOVE THIS HARDCODE, CHANGE API TO BE MORE MAJDATA-LIKE:
          // LEVELS ARRAY SHOULD BE: [EASY, BASIC, ADVANCED, EXPERT, MASTER, RE:MASTER, UTAGE]
          // MOST CONVERTS START AT BASIC
          id={'lv' + (levelIndex + 1)}
          // style={{ display: levels[0] == "-" ? "none" : "unset" }}
          onClick={levelClickCallback}
        >
          {renderLevel(levels[levelIndex])}
        </div>
      : <div />
  );

  return (
    <div>
      {makeLevel(0)}
      {makeLevel(1)}
      {makeLevel(2)}
      {makeLevel(3)}
      {makeLevel(4)}
      {makeLevel(5)}
      {makeLevel(6)}
    </div>
  );
}
