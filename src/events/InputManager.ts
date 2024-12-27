import { Point } from 'pixi.js';

import { IFlushable } from '../interfaces/IFlushable';
import { IResetable } from '../interfaces/IResetable';
import { ICurrentInputs } from './interface/ICurrentInputs';

export class InputManager implements IResetable, IFlushable {
    public currentCursor: Point;
    public lastPointerDownCursor: Point;

    private clicking: boolean;
    private doubleClicking: boolean;
    private pointerMove: boolean;
    private pointerDown: boolean;
    private deltaDragging: number;
    private deltaDoubleClicking: number;

    private lastClickedTime: number;
    private lastUpdatedCursor: Point;

    constructor() {
        this.reset();

        this.registerEvents();
    }

    public reset(): void {
        this.currentCursor = new Point(0, 0);
        this.lastPointerDownCursor = new Point(0, 0);

        this.clicking = false;
        this.doubleClicking = false;
        this.pointerMove = false;
        this.pointerDown = false;
        this.deltaDragging = 6;
        this.deltaDoubleClicking = 600;

        this.lastClickedTime = 0;
        this.lastUpdatedCursor = new Point();
    }

    public flush(): void {
        this.clicking = false;
        this.doubleClicking = false;
    }

    public getCurrentInputs(): ICurrentInputs {
        const inputs = {
            clicking: this.clicking,
            doubleClicking: this.doubleClicking,
            dragging: this.pointerMove,
            currentCursor: this.currentCursor,
            cursorOffset: !this.pointerMove
                ? new Point()
                : new Point(
                    this.currentCursor.x - this.lastUpdatedCursor.x,
                    this.currentCursor.y - this.lastUpdatedCursor.y,
                ),
        };

        this.lastUpdatedCursor = this.currentCursor;

        return inputs;
    }

    public registerEvents() {
        document.body.onpointermove = (event: MouseEvent) => {
            this.currentCursor = new Point(event.clientX, event.clientY | 0);

            const diffX = Math.abs(this.currentCursor.x - this.lastPointerDownCursor.x);
            const diffY = Math.abs(this.currentCursor.y - this.lastPointerDownCursor.y);

            if (diffX > this.deltaDragging && diffY > this.deltaDragging) {
                this.pointerMove = this.pointerDown;
            }
        };

        document.body.onpointerdown = (event: MouseEvent) => {
            this.lastPointerDownCursor = new Point(event.clientX, event.clientY);
            this.pointerDown = true;
        };

        document.body.onpointerup = () => {
            if (this.pointerDown && !this.pointerMove) {
                if (window.performance.now() - this.lastClickedTime < this.deltaDoubleClicking) {
                    this.doubleClicking = true;
                } else {
                    this.clicking = true;
                }

                this.lastClickedTime = window.performance.now();
            }

            this.pointerMove = false;
            this.pointerDown = false;
        };
    }
}
