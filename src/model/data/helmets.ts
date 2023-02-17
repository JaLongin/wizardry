import type { Item } from '../../types/types';

const helmets: Item[] = [
  {
    name: 'Helm',
    cost: 100,
    AC: 1,
    effect: '',
    class: ['fighter', 'samurai', 'lord', 'ninja'],
    type: 'helmet',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Helm of Hardiness',
    cost: 3000,
    AC: 2,
    effect: '',
    class: ['fighter', 'samurai', 'lord', 'ninja'],
    type: 'helmet',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Helm of Evil',
    cost: 8000,
    AC: 3,
    effect: 'Casts BADIOS',
    class: ['fighter', 'samurai', 'lord', 'ninja'],
    type: 'helmet',
    alignment: ['evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Diadem of Malor',
    cost: 25000,
    AC: 2,
    effect: 'Casts MALOR',
    class: [
      'fighter',
      'priest',
      'thief',
      'mage',
      'bishop',
      'samurai',
      'lord',
      'ninja',
    ],
    type: 'helmet',
    alignment: ['good', 'neutral', 'evil'],
    cursed: false,
    damageMin: 0,
    damageMax: 0,
  },
  {
    name: 'Helm of Hangovers',
    cost: 50000,
    AC: -2,
    effect: '',
    class: ['fighter', 'samurai', 'lord', 'ninja'],
    type: 'helmet',
    alignment: ['good', 'neutral', 'evil'],
    cursed: true,
    damageMin: 0,
    damageMax: 0,
  },
];

export default helmets;
