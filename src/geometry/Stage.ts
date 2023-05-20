import { Container, DisplayObject } from 'pixi.js';
import { Engine } from '../Engine';
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

    public inputManager: InputManager;
    public rendererGeometry: GeometryManager;

    public lastHoverTick: number;
    public minHoverTick: number;

    constructor(public engine: Engine) {
        super();
        this.sortableChildren = true;
        // @ts-ignore
        this.interactiveChildren = false;

        this.lastHoverTick = 0;
        this.minHoverTick = 10;

        this.inputManager = new InputManager();
        this.rendererGeometry = new GeometryManager(this);

        this.rendererGeometry.checkStageSize();
    }

    public animationTick() {
        this.children.forEach((child) => {
            if (child.needInitialization()) {
                child.initialize(this.engine.assetsManager);
            } else {
                child.checkBounds(this.rendererGeometry.stageBounds);

                if (child.visible) {
                    if (child.needFrameUpdate()) child.updateFrame();
                }
            }
        });
    }

    public displayTick() {
        const now = performance.now();

        const currentInputs: ICurrentInputs = this.inputManager.getCurrentInputs();

        this.rendererGeometry.update(currentInputs);

        if (this.rendererGeometry.needSizeUpdate) {
            this.engine.renderer.resize(this.rendererGeometry.stageBounds.width, this.rendererGeometry.stageBounds.height);
        }

        this.children.forEach(child => {
            if (child.needPositionUpdate() || this.rendererGeometry.needPositionUpdate) {
                child.updatePosition(this.rendererGeometry.stageOffset);
            }

            if (child.needTweenUpdate()) child.updateTween(now);
        });

        this.checkHovered(now, currentInputs);

        this.inputManager.flush();
        this.rendererGeometry.flush();

        this.engine.renderer.render(this);
    }

    private checkHovered(now: number, currentInputs: ICurrentInputs) {
        if (now - this.lastHoverTick > this.minHoverTick) {
            let hovered = this.children.find((child) => {
                return child.checkHover(currentInputs);
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
