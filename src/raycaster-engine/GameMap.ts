import Texture from './Texture';

export default class GameMap {
  readonly width: number;
  readonly height: number;

  constructor(
    size: number,
    public readonly walls: number[],
    public readonly wallTextures: Texture[]
  ) {
    this.width = size;
    this.height = size;
    this.walls = walls;
    this.wallTextures = wallTextures;
  }

  get = (x: number, y: number): number => {
    const column = Math.floor(x);
    const row = Math.floor(y);
    if (column < 0 || column >= this.width || row < 0 || row >= this.height)
      return -1;
    return this.walls[row * this.width + column];
  };

  cast = (
    point: Position,
    angle: number,
    range: number
  ): Required<Pick<Step, 'offset' | 'distance' | 'cell'>>[] => {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);

    return this.getCollisionPoints(
      {
        x: point.x,
        y: point.y,
        cell: 0,
        distance: 0,
        offset: 0,
        depth: 0,
      },
      sin,
      cos,
      range
    );
  };

  private getCollisionPoints = (
    origin: Required<Step>,
    sin: number,
    cos: number,
    range: number
  ): Required<Step>[] => {
    const stepX: Pick<Step, 'x' | 'y' | 'depth'> = this.step(
      sin,
      cos,
      origin.x,
      origin.y
    );

    const stepY: Pick<Step, 'x' | 'y' | 'depth'> = this.step(
      cos,
      sin,
      origin.y,
      origin.x,
      true
    );

    const nextStep =
      (stepX.depth as number) < (stepY.depth as number)
        ? this.inspect(
            stepX as Required<Pick<Step, 'x' | 'y' | 'depth'>>,
            1,
            0,
            origin.distance,
            stepX.y as number,
            cos,
            sin
          )
        : this.inspect(
            stepY as Required<Pick<Step, 'x' | 'y' | 'depth'>>,
            0,
            1,
            origin.distance,
            stepY.x as number,
            cos,
            sin
          );

    if (nextStep.distance > range) return [origin];
    return [origin].concat(this.getCollisionPoints(nextStep, sin, cos, range));
  };

  private step = (
    start: number,
    end: number,
    x: number,
    y: number,
    inverted?: boolean
  ): Pick<Step, 'x' | 'y' | 'depth'> => {
    if (end === 0) return { depth: Infinity };
    const dx = end > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
    const dy = dx * (start / end);

    return {
      x: inverted ? y + dy : x + dx,
      y: inverted ? x + dx : y + dy,
      depth: dx * dx + dy * dy,
    };
  };

  private inspect = (
    step: Required<Pick<Step, 'x' | 'y' | 'depth'>>,
    shiftX: number,
    shiftY: number,
    nextStepDistance: number,
    stepOffset: number,
    cos: number,
    sin: number
  ): Required<Step> => {
    const dx = cos < 0 ? shiftX : 0;
    const dy = sin < 0 ? shiftY : 0;
    const index =
      Math.floor(step.y - dy) * this.width + Math.floor(step.x - dx);
    const cell =
      index < 0 || index >= this.walls.length ? -1 : this.walls[index];
    const distance = nextStepDistance + Math.sqrt(step.depth);

    const offset = stepOffset - Math.floor(stepOffset);
    return { ...step, cell, distance, offset };
  };
}
