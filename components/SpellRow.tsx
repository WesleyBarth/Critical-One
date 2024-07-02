"use client";
import React, { useState } from "react";
import { Spell, Detail } from "@util/types";
import { detailScraper } from "./DetailScraper";

export const SpellRow: React.FC<{ spell: Spell }> = ({ spell }) => {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState<Detail>();

  const handleExpand = () => {
    setExpanded(!expanded);
    if(!expanded) {
        getDetail();
    }
  };

  async function getDetail() {
    const detail = await detailScraper(spell.detailUrl);
    setDetail(detail);
    console.log(detail);
  }
  

  return (
    <>
      <tr>
        <td style={{}}>{spell.name}</td>

        <td style={{}}>{spell.castingTime}</td>
        <td style={{}}>{spell.range}</td>
        <td style={{}}>{spell.components}</td>
        <td style={{}}>{spell.duration}</td>
        <td>
          <button onClick={handleExpand}>
            {expanded ? "Collapse" : "Expand"}
          </button>
        </td>
      </tr>
    {expanded && (
        <tr>
            <td colSpan={7}>
                <div>
                    {detail &&
                      <div>
                        {detail.description}
                      </div>
                    }
                    
                </div>
            </td>
        </tr>
    )}
    </>
  );
};
