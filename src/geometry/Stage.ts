import { Container, DisplayObject } from 'pixi.js';
import { Engine } from '../Engine';
import { EventCategory } from '../sprite/enum/EventCategory';
import { EventManager } from '../events/EventManager';
import { GeometryManager } from './GeometryManager';
import { ICurrentEvents } from '../events/interface/ICurrentEvents';
import { IGraphic } from '../sprite/interface/IGraphic';

function sortChildren(a: DisplayObject, b: DisplayObject): number {
    return b.zIndex - a.zIndex;
}

export class Stage extends Container {
    readonly children: IGraphic[];

    public eventManager: EventManager;
    public rendererGeometry: GeometryManager;

    public lastHoverTick: number;
    public minHoverTick: number;

    constructor(public engine: Engine) {
        super();
        this.sortableChildren = true;
        // @ts-ignore
        this.interactiveChildren = false;

        this.lastHoverTick = 0;
        this.minHoverTick = 1000 / 600000;

        this.eventManager = new EventManager();
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

        const currentEvents: ICurrentEvents = this.eventManager.getCurrentEvents();

        this.rendererGeometry.update(currentEvents);

        if (this.rendererGeometry.needSizeUpdate) {
            this.engine.renderer.resize(this.rendererGeometry.stageBounds.width, this.rendererGeometry.stageBounds.height);
        }

        this.children.forEach(child => {
            if (child.needPositionUpdate() || this.rendererGeometry.needPositionUpdate) {
                child.updatePosition(this.rendererGeometry.stageOffset);
            }

            if (child.needTweenUpdate()) child.updateTween(now);
        });

        // this.checkHovered(now, currentEvents);

        this.eventManager.reset();
        this.rendererGeometry.reset();

        this.engine.renderer.render(this);
    }

    private checkHovered(now: number, currentEvents: ICurrentEvents) {
        if (now - this.lastHoverTick > this.minHoverTick) {
            let hovered = this.children.find((child) => {
                return (child.getEventCategory() === EventCategory.FLOOR || child.getEventCategory() === EventCategory.AVATAR) && child.checkEvents(currentEvents);
            });

            if (hovered) {
                if (hovered.getEventCategory() === EventCategory.FLOOR) {
                    console.log('FLOOR');
                }

                if (hovered.getEventCategory() === EventCategory.AVATAR) {
                    document.body.style.cursor = 'pointer';
                } else {
                    document.body.style.cursor = 'default';
                }
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
}
