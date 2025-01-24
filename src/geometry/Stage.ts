import { Container } from 'pixi.js';

import { Engine } from '../Engine';
import { ICurrentInputs, InputManager } from '../events';
import { IResetable } from '../interfaces/IResetable';
import { EventCategory, IGraphic } from '../sprite';
import { GeometryManager } from './GeometryManager';

export class Stage extends Container<IGraphic> implements IResetable {
    readonly children: IGraphic[];

    private inputManager: InputManager;
    private geometryManager: GeometryManager;

    private lastHoverTick: number;
    private minHoverTick: number;

    constructor(public engine: Engine) {
        super();
        this.sortableChildren = true;

        this.interactiveChildren = false;

        this.lastHoverTick = 0;
        this.minHoverTick = 10;

        this.inputManager = new InputManager();
        this.geometryManager = new GeometryManager(this);

        this.geometryManager.checkStageSize();
    }

    public animationTick() {
        this.children.forEach((child) => {
            if (child.needInitialization()) {
                child.initialize(this.engine.assetsManager);
            } else {
                child.checkGraphicBounds(this.geometryManager.stageBounds);

                if (child.visible) {
                    if (child.needFrameUpdate()) child.updateFrame();
                }
            }
        });
    }

    public displayTick() {
        const now = performance.now();

        const currentInputs: ICurrentInputs = this.inputManager.getCurrentInputs();

        this.geometryManager.update(currentInputs);

        if (this.geometryManager.needSizeUpdate) {
            this.engine.renderer.resize(this.geometryManager.stageBounds.width, this.geometryManager.stageBounds.height);
        }

        this.children.forEach(child => {
            if (child.needPositionUpdate() || this.geometryManager.needPositionUpdate) {
                child.updatePosition(this.geometryManager.stageOffset);
            }

            if (child.needTweenUpdate()) child.updateTween(now);
        });

        this.checkHovered(now, currentInputs);

        this.inputManager.flush();
        this.geometryManager.flush();

        this.engine.renderer.render(this);
    }

    private checkHovered(now: number, currentInputs: ICurrentInputs) {
        if (now - this.lastHoverTick > this.minHoverTick) {
            const hovered = this.children.find((child) => {
                if (!child.visible) return false;
                return child.getEventCategory() !== EventCategory.NONE && child.checkHover(currentInputs);
            });

            if (hovered) {
                document.body.style.cursor = 'pointer';
            } else {
                document.body.style.cursor = 'default';
            }

            this.lastHoverTick = now;
        }
    }

    public reset() {
        this.removeChildren();
        this.inputManager.reset();
    }
}
