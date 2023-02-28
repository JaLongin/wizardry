import Character from '../../model/characters/character';
import classes from '../../model/data/classes';
import Party from '../../model/game/party';
import weapons from '../../model/data/weapons';
import armor from '../../model/data/armor';

const party = new Party(6, true, 0);
const tavern = new Party(20, false);

function setTavern() {
  const fighter1 = new Character(
    'FIGHTER1',
    'dwarf',
    {
      strength: 16,
      intelligence: 10,
      piety: 10,
      vitality: 16,
      agility: 14,
      luck: 10,
    },
    classes.fighter,
    'good'
  );

  const fighter2 = new Character(
    'FIGHTER2',
    'human',
    {
      strength: 14,
      intelligence: 12,
      piety: 10,
      vitality: 13,
      agility: 16,
      luck: 10,
    },
    classes.fighter,
    'good'
  );

  const mage = new Character(
    'MAGE',
    'elf',
    {
      strength: 6,
      intelligence: 17,
      piety: 12,
      vitality: 12,
      agility: 10,
      luck: 10,
    },
    classes.mage,
    'good'
  );

  const priest = new Character(
    'PRIEST',
    'human',
    {
      strength: 12,
      intelligence: 12,
      piety: 16,
      vitality: 14,
      agility: 10,
      luck: 10,
    },
    classes.priest,
    'good'
  );

  const thief = new Character(
    'THIEF',
    'hobbit',
    {
      strength: 12,
      intelligence: 12,
      piety: 12,
      vitality: 14,
      agility: 16,
      luck: 17,
    },
    classes.thief,
    'neutral'
  );

  const bishop = new Character(
    'BISHOP',
    'human',
    {
      strength: 12,
      intelligence: 16,
      piety: 16,
      vitality: 14,
      agility: 13,
      luck: 10,
    },
    classes.bishop,
    'good'
  );

  fighter1.equip(weapons[0]);
  fighter1.equip(armor[1]);

  fighter2.equip(weapons[0]);
  fighter2.equip(armor[1]);
  tavern.add(fighter1);
  tavern.add(fighter2);
  tavern.add(mage);
  tavern.add(priest);
  tavern.add(bishop);
  tavern.add(thief);
}

function partyReload() {
  const temp = party.getParty().length;
  if (temp) {
    for (let i = 0; i < temp; i += 1) {
      party.remove(0);
    }
  }
  const tempGold = party.getGold();
  if (tempGold !== undefined) {
    party.changeGold(-tempGold + 1500);
  }
  const tempTavern = tavern.getParty().length;
  for (let i = 0; i < tempTavern; i += 1) {
    tavern.remove(0);
  }
  localStorage.setItem('partyChars', '');
  localStorage.setItem('tavernChars', '');
  setTavern();
}

function downloadParty() {
  const goldString = localStorage.getItem('partyGold');
  const charsString = localStorage.getItem('partyChars');
  let characters;
  if (charsString) {
    characters = JSON.parse(charsString) as Array<Character>;
  }
  if (characters !== undefined) {
    if (goldString) {
      const partyGold = JSON.parse(goldString) as number;
      if (partyGold !== undefined) {
        party.changeGold(-(party.getGold() as number) + partyGold);
      }
    }
    characters.forEach((character) => {
      const char = new Character(
        character.name,
        character.race,
        {
          strength: character.strength,
          intelligence: character.intelligence,
          piety: character.piety,
          vitality: character.vitality,
          agility: character.agility,
          luck: character.luck,
        },
        character.class,
        character.alignment,
        character.level
      );

      char.addExp(character.exp ? character.exp : 0);
      party.add(char);
    });
  } else {
    partyReload();
  }
}
function downloadTavern() {
  const charsString = localStorage.getItem('tavernChars');
  let characters;
  if (charsString) {
    characters = JSON.parse(charsString) as Character[];
  }
  const tempTavern = tavern.getParty().length;
  for (let i = 0; i < tempTavern; i += 1) {
    tavern.remove(0);
  }
  if (characters !== undefined) {
    characters.forEach((character) => {
      const char = new Character(
        character.name,
        character.race,
        {
          strength: character.strength,
          intelligence: character.intelligence,
          piety: character.piety,
          vitality: character.vitality,
          agility: character.agility,
          luck: character.luck,
        },
        character.class,
        character.alignment,
        character.level
      );
      char.addExp(character.exp ? character.exp : 0);
      tavern.add(char);
    });
  } else {
    setTavern();
  }
}

function saveGame() {
  localStorage.setItem('tavernChars', JSON.stringify(tavern.getParty()));
  localStorage.setItem('partyChars', JSON.stringify(party.getParty()));
  localStorage.setItem('partyGold', JSON.stringify(party.getGold() as number));
}

function downloadGame() {
  downloadParty();
  downloadTavern();
}

downloadGame();

export { party, tavern, partyReload, saveGame };
