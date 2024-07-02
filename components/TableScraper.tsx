import { Spell } from "../util/types";
const LIST: Array<Spell[]> = [];

async function spellListScraper(url: string): Promise<Array<Spell[]>> {
  if (LIST.length > 0) {
    return LIST;
    }
    // Definitions
  //const spellList: Spell[] = ;
  const parser = new DOMParser();

  // Fetch HTML Document and parse
  const response = await fetch(
    "https://corsproxy.io/?" + encodeURIComponent(url)
  );
  const html = await response.text();
  const document = parser.parseFromString(html, "text/html");
  // console.log(document);
  // document.querySelector("#content > section > div > div.listing-body > ul")
  for (let index = 0; index < 10; index++) {
    const tableRows = document
      .querySelector(`#wiki-tab-0-${index} > div > table`)
      ?.querySelectorAll("tr");
    // console.log(tableRows);
    // Iterate through rows
    const spellsByLevel: Spell[] = [];
    tableRows?.forEach((row, index) => {
      // Skip the header row
      if (index === 0) return;
      // Extract cells
      const cells = row.querySelectorAll("td");
      // Data from cells
      const detailUrl = cells[0]?.querySelector("a")?.getAttribute("href") || "";
      //console.log(detailUrl);
      const name = cells[0]?.textContent || "";
      const school = cells[1]?.textContent || "";
      const castingTime = cells[2]?.textContent || "";
      const range = cells[3]?.textContent || "";
      const duration = cells[4]?.textContent || "";
      const components = cells[5]?.textContent || "";
      // Add spell to list
      spellsByLevel.push({
        name,
        level: index,
        school,
        castingTime,
        range,
        components,
        duration,
        description: "",
        save: "",
        detailUrl: detailUrl,
      });
    });
    // Add spell list to spell list
    LIST.push(spellsByLevel);
  }
  return LIST;
}

export { spellListScraper };
