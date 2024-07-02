import { Detail } from "@util/types";


async function detailScraper(detailUrl: string): Promise<Detail> { 
    const response = await fetch(
        "https://corsproxy.io/?" + 
        encodeURIComponent(`http://dnd5e.wikidot.com${detailUrl}`)
    );

    const parser = new DOMParser();
    const html = await response.text();
    const document = parser.parseFromString(html, "text/html");
    const content = document.querySelector("#page-content");
    const sections = content?.querySelectorAll('p, ul, table');
    const all = content?.querySelectorAll("*");
    console.log(sections);
    const detail = {} as Detail;
    if(sections) {  
        for (let i = 0; i < (sections?.length ?? 0); i++) {
            let text = sections[i].textContent
            let element = sections[i].localName;
            if(text) {
                if(text.includes("Source:")) {
                    detail.source = text;
                    continue
                }
                if(text.toLowerCase().includes('level' || 'cantrip')) {
                    detail.spellType = text;
                    continue
                }
                if(text.includes("Casting Time:")) {
                    let split = text.split("\n");
                    let subSplit = split.map((s) => s.split(":"));
                    detail.castingTime = subSplit[0][1];
                    detail.range = subSplit[1][1];
                    detail.components = subSplit[2][1];
                    detail.duration = subSplit[3][1];
                    continue
                }
                if(text.includes("At Higher Levels:")) {
                    detail.atHigherLevels = text;
                    continue
                }
                if(text.includes("Spell Lists")) continue;
                if(i > 2) {
                    let temp = detail.description || '';
                    temp += element + ': '
                    temp += text;
                    detail.description = temp;
                }
            }
            

        }
    }
    // let remove = content?.querySelectorAll(".content-separator")
    // remove?.forEach(separator => { separator.parentNode?.removeChild(separator); });
    // const details = content?.querySelectorAll("*");  
    // const detailArray = details ? Array.from(details) : [];
    // let detail: Detail = {} as Detail;
    // console.log(details);
    
    // let detailSection = {};
    // for (let i = 0; i < detailArray.length; i++) {
    //     let element = detailArray[i];
    //     console.log(element);
        
    //     if (element.textContent) {
    //         let text = element.textContent;
    //         console.log(text);
            
    //     }
    // }
    //console.log(detail);
    return detail;
}

const getTextContent = (element: Element): string => {
    let text = "";
    element.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent;

        }
        if (node.nodeType === Node.ELEMENT_NODE) {
            // text += getTextContent(node as Element);
        }
    });
    return text;
}

export { detailScraper };