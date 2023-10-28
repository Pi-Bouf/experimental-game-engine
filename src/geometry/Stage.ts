import { Container, DisplayObject } from 'pixi.js';
import { Engine } from '../Engine';
import { EventCategory } from '../sprite';
import { GeometryManager } from './GeometryManager';
import { ICurrentInputs } from '../events/interface/ICurrentInputs';
import { IGraphic } from '../sprite/interface/IGraphic';
import { IResetable } from '../interfaces/IResetable';
import { InputManager } from '../events/InputManager';

function sortChildren(a: DisplayObject, b: DisplayObject): number {
    return b.zIndex - a.zIndex;
}

export class Stage extends Container implements IResetable {
    readonly children: IGraphic[];

    private inputManager: InputManager;
    private geometryManager: GeometryManager;

    private lastHoverTick: number;
    private minHoverTick: number;

    constructor(public engine: Engine) {
        super();
        this.sortableChildren = true;
        // @ts-ignore
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
                child.checkBounds(this.geometryManager.stageBounds);

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
            let hovered = this.children.find((child) => {
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

    sortChildren(): void {
        let sortRequired = false;

        for (let i = 0, j = this.children.length; i < j; ++i) {
            const child = this.children[i];

            child._lastSortedIndex = i;

            if (!sortRequired && child.zIndex !== 0) {
                sortRequired = true;
                i = this.children.length + 1;
            }
        }

        if (sortRequired && this.children.length > 1) {
            this.children.sort(sortChildren);
        }

        this.sortDirty = false;
    }

    public reset() {
        this.removeChildren();
        this.inputManager.reset();
    }
}
