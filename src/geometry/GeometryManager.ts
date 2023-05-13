import { Engine } from '../Engine';
import { ICurrentInputs } from '../events/interface/ICurrentInputs';
import { IResetable } from '../interfaces/IResetable';
import { Point, Rectangle } from 'pixi.js';
import { Stage } from './Stage';

export class GeometryManager implements IResetable {
    public engine: Engine;
    public needSizeUpdate: boolean;
    public needPositionUpdate: boolean;
    public stageBounds: Rectangle;
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

        this.stageBounds = new Rectangle();
        this.stageOffset = new Point();
    }

    public flush() {
        this.needSizeUpdate = false;
        this.needPositionUpdate = true;
    }

    public update(currentEvents: ICurrentInputs) {
        if (currentEvents.dragging) {
            this.needPositionUpdate = true;
            this.stageOffset.x += currentEvents.cursorOffset.x | 0;
            this.stageOffset.y += currentEvents.cursorOffset.y | 0;
        }
    }

    public checkStageSize() {
        this.stageBounds = new Rectangle(
            0,
            0,
            this.stage.engine.canvasContainer.clientWidth | 0,
            this.stage.engine.canvasContainer.clientHeight | 0,
        );
        this.needSizeUpdate = true;
    }
}
