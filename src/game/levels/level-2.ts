import Logic from '../../model/game/logic';
import {
  Raycaster,
  GameMap,
  Camera,
  MiniMap,
  Controls,
  GameLoop,
  Battle,
  option3,
  ctx,
  injectCanvasToDocument,
} from '../game-engine';

export default function initSecondLevel() {
  if (!document.querySelector('#canvas')) injectCanvasToDocument();

  // prettier-ignore
  const mapArr = [
    1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 
    1, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 4, 0, 1, 0, 0, 0, 3,
    1, 0, 0, 0, 0, 5, 1, 1, 1, 1, 0, 5, 0, 1, 0, 1, 1, 1,
    1, 1, 1, 1, 1, 5, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
    1, 0, 0, 0, 0, 4, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 
    1, 0, 0, 0, 0, 5, 0, 0, 0, 1, 0, 1, 1, 1, 1, 6, 4, 6,
    1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 6, 4, 6, 1, 1, 
    1, 0, 0, 0, 0, 1, 0, 0, 2, 1, 0, 1, 0, 1, 0, 0, 0, 1, 
    1, 1, 6, 4, 6, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 
    1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 
    1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 
    1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 
    1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 
    1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
  ];

  const startPosition: Required<Position> = {
    x: 8,
    y: 9,
    direction: Math.PI / 3,
  };

  const raycaster = new Raycaster(ctx, 6);
  const map = new GameMap(mapArr, option3);
  const miniMap = new MiniMap(map);
  const controls = new Controls('discrete');
  const player = new Camera(startPosition, controls);
  const battle = new Battle(ctx);
  const logic = new Logic();

  const game = new GameLoop(ctx, raycaster, map, miniMap, player, battle, logic);

  game.init();
  game.start();

  return game;
}
