"use client";
import { useEffect, useState } from "react";

import { SpellTable } from "../components/SpellTable";
import { Spell } from '../util/types';
import { spellListScraper } from "../components/TableScraper";
import css from "./page.module.css";
var calledList = false;

export default function Home() {
  const [spells, setSpells] = useState<Spell[][]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);

  // useEffect(() => {
  //   console.log("useEffect called...");
    
    
  //   if(spells.length === 0) {
  //     getSpells();
  //   }
  //   // Add any necessary logic here
  // }, []);

  async function getSpells() {
    const list = await spellListScraper(
      "http://dnd5e.wikidot.com/spells:wizard"
    );
    // console.log(list);
    setSpells(list);
  }
  
  if(!calledList) {
    getSpells();
    calledList = true;
  }

  return (
  <main className={css.main}>
    <div style={{ display:'flex', }}>

    </div>
    {spells && spells.map((spellList, index) => {
      return ( <SpellTable key={index} index={index} spellList={spellList} filterList={filterList} /> )
    })}
  </main>
  );
}
