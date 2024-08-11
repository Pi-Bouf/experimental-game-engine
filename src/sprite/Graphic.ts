import { AssetTexture } from '../assets';
import { BaseTexture, Point, Sprite, Texture } from 'pixi.js';
import { EventCategory } from './enum/EventCategory';
import { IAssetsManager } from '../assets/interfaces/IAssetsManager';
import { ICurrentInputs } from '../events/interface/ICurrentInputs';
import { IGraphic } from './interface/IGraphic';
import { IPosition3D } from '../geometry/interfaces/IPosition3D';
import { ITween } from './tween/interface/ITween';
import { PRectangle } from '../geometry';
import { Position3D } from '../geometry/Position3D';
import { Tween } from './tween/Tween';

export class Graphic extends Sprite implements IGraphic {
    public name: string;

    protected id: string;
    private position3D: IPosition3D;
    private bounds: PRectangle;
    private initialized: boolean;
    private positionUpdated: boolean;
    private frameUpdated: boolean;
    private tween: ITween;

    private canBeHovered: boolean;
    private clickable: boolean;

    constructor(id: string, texture: Texture = Texture.EMPTY) {
        // (PIXI) By default, set an empty texture
        super(texture ?? Texture.EMPTY);
        // (PIXI) By default, the renderer don't need to display this shit !
        this.visible = false;

        this.name = '';

        this.id = id;
        this.position3D = new Position3D();
        this.bounds = new PRectangle();
        this.initialized = texture !== Texture.EMPTY;
        this.positionUpdated = true;
        this.frameUpdated = true;

        this.canBeHovered = true;
        this.clickable = false;
    }

    public needInitialization() {
        return !this.initialized;
    }

    public setInitialized(): void {
        this.initialized = true;
    }

    public requestInitialization(): void {
        this.initialized = false;
    }

    public initialize(resourceManager: IAssetsManager): void {
        if (resourceManager.has(this.id)) {
            this.texture = resourceManager.get<AssetTexture>(this.id);
            this.updateBounds();
            // this.generateHitMap();

            this.setInitialized();
        }
    }

    public needFrameUpdate(): boolean {
        return !this.frameUpdated;
    }

    public setFrameUpdated(): void {
        this.frameUpdated = true;
    }

    public requestFrameUpdate(): void {
        this.frameUpdated = false;
    }

    public updateFrame(): void {
        // Do nothing here, no need to update frame
        this.setFrameUpdated();
    }

    public needTweenUpdate(): boolean {
        return this.tween !== undefined && !this.tween.complete;
    }

    public updateTween(now: number): void {
        this.tween.update(now);
    }

    public addTween(tween: Tween) {
        this.tween = tween;
    }

    public setPositionUpdated(): void {
        this.positionUpdated = true;
    }

    public requestPositionUpdate(): void {
        this.positionUpdated = false;
    }

    public needPositionUpdate(): boolean {
        return !this.positionUpdated;
    }

    public setPosition(position: IPosition3D): void {
        this.position3D = position;
        this.requestPositionUpdate();
    }

    public updatePosition(stageOffset: Point): void {
        this.position.set(stageOffset.x + this.position3D.x, stageOffset.y + this.position3D.y);
        this.zIndex = this.position3D.z;
        this.setPositionUpdated();
        this.updateBounds();
    }

    getCurrentPosition(): IPosition3D {
        return this.position3D;
    }

    public getBounds() {
        return this.bounds;
    }

    public updateBounds(): void {
        this.bounds = new PRectangle(this.position.x, this.position.y, this.texture.width, this.texture.height);
    }

    public checkBounds(bounds: PRectangle): void {
        this.visible = bounds.intersects(this.bounds);
    }

    public checkInput(currentInputs: ICurrentInputs): boolean {
        if (!this.bounds) return false;

        if (!this.bounds.contains(currentInputs.currentCursor.x, currentInputs.currentCursor.y)) return false;

        if (this.bounds.width < 2 || this.bounds.height < 2) return false;

        // @ts-ignore
        if (!this.texture.baseTexture.hitMap) this.generateHitMap();

        const point = new Point((this.texture.frame.x + currentInputs.currentCursor.x - this.bounds.x) | 0, (this.texture.frame.y + currentInputs.currentCursor.y - this.bounds.y) | 0);
        // @ts-ignore
        return this.texture.baseTexture.hitMap[point.y * this.texture.baseTexture.width + point.x] > 0;
    }

    public checkHover(currentInputs: ICurrentInputs): boolean {
        if (!this.canBeHovered) return false;

        if (!this.visible) return false;

        return this.checkInput(currentInputs);
    }

    protected generateHitMap(baseTexture?: BaseTexture): void {
        const baseTex = baseTexture || this.texture.baseTexture;
        // @ts-ignore
        if (baseTex.hitMap !== undefined) return;
        if (!baseTex.resource) return;

        let canvas, context;
        //@ts-ignore
        if (baseTex.resource.source instanceof ImageBitmap) {
            canvas = document.createElement('canvas');
            context = canvas.getContext('2d');

            // @ts-ignore
            canvas.width = baseTex.resource.source.width;
            // @ts-ignore
            canvas.height = baseTex.resource.source.height;
            // @ts-ignore
            context.drawImage(baseTex.resource.source, 0, 0);
        } else {
            // @ts-ignore
            canvas = baseTex.resource.source;
            context = canvas.getContext('2d');
        }

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        const hitMap = new Uint32Array(canvas.width * canvas.height);

        for (let i = 0; i < canvas.width * canvas.height; i++) {
            hitMap[i] = imageData.data[i * 4 + 3];
        }

        // @ts-ignore
        baseTex.hitMap = hitMap;
    }

    public getEventCategory(): EventCategory {
        return EventCategory.NONE;
    }

    public dispose(): void {
    }
}
