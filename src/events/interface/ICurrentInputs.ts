import { Point } from 'pixi.js';

export interface ICurrentInputs {
    clicking: boolean,
    doubleClicking: boolean,
    dragging: boolean,
    currentCursor: Point,
    cursorOffset: Point
}
