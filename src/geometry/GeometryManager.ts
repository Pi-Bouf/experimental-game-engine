import { Point } from 'pixi.js';

import { Engine } from '../Engine';
import { ICurrentInputs } from '../events/interface/ICurrentInputs';
import { IResetable } from '../interfaces/IResetable';
import { PRectangle } from "./PRectangle";
import { Stage } from './Stage';

export class GeometryManager implements IResetable {
    public engine: Engine;
    public needSizeUpdate: boolean;
    public needPositionUpdate: boolean;
    public stageBounds: PRectangle;
    public stageOffset: Point;

    public constructor(public stage: Stage) {
        this.reset();

        window.onresize = () => {
            this.checkStageSize();
        };
    }

    public reset() {
        this.needSizeUpdate = false;
        this.needPositionUpdate = true;

        this.stageBounds = new PRectangle();
        this.stageOffset = new Point();
    }

    public flush() {
        this.needSizeUpdate = false;
        this.needPositionUpdate = false;
    }

    public update(currentEvents: ICurrentInputs) {
        if (currentEvents.dragging) {
            this.needPositionUpdate = true;
            this.stageOffset.x += currentEvents.cursorOffset.x | 0;
            this.stageOffset.y += currentEvents.cursorOffset.y | 0;
        }
    }

    public checkStageSize() {
        this.stageBounds = new PRectangle(
            0,
            0,
            this.stage.engine.canvasContainer.clientWidth | 0,
            this.stage.engine.canvasContainer.clientHeight | 0,
        );
        this.needSizeUpdate = true;
    }
}
