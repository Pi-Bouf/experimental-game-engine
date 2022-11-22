import { Action } from './enum/Action';
import { Direction } from './enum/Direction';
import { Rectangle } from 'pixi.js';

export class AvatarPositionComputer {

    private static frames: Record<string, Rectangle[]> = {};

    public static init() {
        const position: Record<number, number[]> = {};
        position[Action.WAIT] = [0, 0];
        position[Action.WALK] = [4, 0];
        position[Action.RUN] = [8, 0];
        position[Action.ATTACK] = [12, 0];

        position[Action.DEFEND] = [0, 4];
        position[Action.BEHIT] = [4, 4];
        position[Action.USE] = [8, 4];
        position[Action.DIE] = [12, 4];

        const offset = 144;
        const directions = [Direction.N, Direction.E, Direction.S, Direction.W];
        const framesCount = 4;

        for (const positionKey in position) {
            const x = position[positionKey][0] * offset;
            const y = position[positionKey][1] * offset;

            for (const direction of directions) {
                const frameRectangles: Rectangle[] = [];

                for (let frame = 0; frame < framesCount; frame++) {
                    frameRectangles.push(new Rectangle(
                        x + frame * 144,
                        y + direction * 144,
                        144,
                        144,
                    ));
                }

                this.frames[`${positionKey}_${direction}`] = frameRectangles;
            }
        }
    }


    static getPosition(action: Action, direction: Direction): Rectangle[] {
        return this.frames[`${action}_${direction}`];
    }
}