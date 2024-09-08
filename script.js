function getAllRarityIlvls(ilvl, sourceRarity) {
  // First, convert the input ilvl to its common equivalent
  const commonIlvl = getCommonILevel(ilvl, sourceRarity);

  // If commonIlvl is null (invalid input), return null
  if (commonIlvl === null) return null;

  // Calculate ilvl for each rarity
  return {
    common: Math.round(commonIlvl),
    rare: Math.round(getRareIlvl(commonIlvl)),
    epic: Math.round(getEpicIlvl(commonIlvl)),
    legendary: Math.round(getLegendaryIlvl(commonIlvl))
  };
}

function getCommonILevel(ilvl, rarity) {
  if (rarity === "common") return ilvl;
  if (rarity === "rare") return ((ilvl - 5) / 2);
  if (rarity === "epic") return ((ilvl - 15) / 3);
  if (rarity === "legendary") return ((ilvl - 30) / 4);
  return null;
}

function getRareIlvl(ilvl) {
  return ilvl * 2 + 5;
}

function getEpicIlvl(ilvl) {
  return ilvl * 3 + 15;
}

function getLegendaryIlvl(ilvl) {
  return ilvl * 4 + 30;
}

function getAttributeValue(attCategory, ilvl) {
  switch (attCategory) {
    case "1":
      return Math.ceil(ilvl * 0.01);
    case "2":
      return Math.ceil(ilvl * 0.02);
    case "3":
      return Math.ceil(ilvl * 0.03);
    case "4":
      return Math.ceil(ilvl * 0.04);
    case "5":
      return Math.ceil(ilvl * 0.05);
    case "6":
      return Math.ceil(ilvl * 0.2);
    case "7":
      return Math.ceil(ilvl * 0.0205);
    case "8":
      return Math.ceil(ilvl * 0.058);
    case "9":
      return Math.ceil(ilvl * 0.034);
    default:
      return null;
  }
}

function calculate() {
  updateIlvlTable();
  calculateAttributes();
}

function updateIlvlTable() {
  const inputIlvl = document.getElementById('ilvl').valueAsNumber;
  const inputRarity = document.getElementById('rarity').value;
  const inputUpgrade = document.getElementById('upgrade').value;

  const rawIlvl = inputIlvl - (inputUpgrade * 10);
  const baseIlvl = getAllRarityIlvls(rawIlvl, inputRarity);
  let newHTML = "";

  newHTML = `
      <tr>
          <th>Upgrade</th>
          <th>Common</th>
          <th>Rare</th>
          <th>Epic</th>
          <th>Legendary</th>
      </tr>
    `;

  for (let i = 0; i < 11; i++) {
    newHTML += "<tr>";
    newHTML += `<td>+${i}</td>`;

    ['common', 'rare', 'epic', 'legendary'].forEach(rarity => {
      const curIlvl = baseIlvl[rarity] + (i*10);
      const hasHighlight = Number(inputUpgrade) === i && inputRarity === rarity;
      newHTML += `<td ${hasHighlight ? `class="highlighted"` : ""}>${curIlvl}</td>`;
    });

    newHTML += `</tr>`;
  }

  const tableEl = document.getElementById('itemLevelTable');
  tableEl.innerHTML = newHTML;
}

function calculateAttributes() {
  const inputIlvl = document.getElementById('ilvl').valueAsNumber;
  const inputRarity = document.getElementById('rarity').value;
  const inputUpgrade = document.getElementById('upgrade').value;
  const inputAttribute = document.getElementById('attribute').value;

  const rawIlvl = inputIlvl - (inputUpgrade * 10);
  const baseIlvl = getAllRarityIlvls(rawIlvl, inputRarity);
  let newHTML = "";

  newHTML = `
      <tr>
          <th>Upgrade</th>
          <th>Common</th>
          <th>Rare</th>
          <th>Epic</th>
          <th>Legendary</th>
      </tr>
    `;

  for (let i = 0; i < 11; i++) {
    newHTML += "<tr>";
    newHTML += `<td>+${i}</td>`;

    ['common', 'rare', 'epic', 'legendary'].forEach(rarity => {
      const curIlvl = baseIlvl[rarity] + (i*10);
      newHTML += `<td ${inputIlvl == curIlvl ? `class="selected"` : ""}>${getAttributeValue(inputAttribute, curIlvl)}</td>`;
    });

    newHTML += `</tr>`;
  }

  const tableEl = document.getElementById('attributeTable');
  tableEl.innerHTML = newHTML;
}

window.addEventListener('DOMContentLoaded', function () {
  calculate();
});
