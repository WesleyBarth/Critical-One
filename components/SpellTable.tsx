import React, { useState, useEffect } from "react";
import { Spell } from "../util/types";
import { SpellRow } from "./SpellRow";

export const SpellTable = ({ index, spellList, filterList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Level {index}</h2>
      <table>
        <thead>
        {spellList.map((spell, index) => {
          return <SpellRow key={index} spell={spell} />;
        })}
        </thead>
      </table>
    </div>
  );
};
