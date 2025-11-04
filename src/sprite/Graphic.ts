import { Graphics, ImageSource, Point, Sprite, Texture } from 'pixi.js';

import { AssetTexture } from '../assets';
import { IAssetsManager } from '../assets/interfaces/IAssetsManager';
import { ReplaceAlphaFilter } from "../debug/filters/ReplaceAlphaFilter";
import { ICurrentInputs } from '../events/interface/ICurrentInputs';
import { PRectangle } from '../geometry';
import { IPosition3D } from '../geometry/interfaces/IPosition3D';
import { Position3D } from '../geometry/Position3D';
import { EventCategory } from './enum/EventCategory';
import { IGraphic } from './interface/IGraphic';
import { ITween } from './tween/interface/ITween';
import { Tween } from './tween/Tween';

export abstract class Graphic extends Sprite implements IGraphic {
    protected id: string;
    private position3D: IPosition3D;
    private graphicBounds: PRectangle;
    private initialized: boolean;
    private positionUpdated: boolean;
    private frameUpdated: boolean;
    private tween: ITween;

    private followedGraphic: Graphic;

    private _disposed = false;
    private _canBeHovered: boolean;
    private _clickable: boolean;

    protected constructor(id: string, texture: Texture = Texture.EMPTY) {
        // (PIXI) By default, set an empty texture
        super(texture ?? Texture.EMPTY);
        // (PIXI) By default, the renderer don't need to display this shit !
        this.visible = false;

        this.id = id;
        this.position3D = new Position3D();
        this.graphicBounds = new PRectangle();
        this.initialized = texture !== Texture.EMPTY;
        this.positionUpdated = true;
        this.frameUpdated = true;

        this._disposed = false;
        this._canBeHovered = true;
        this._clickable = false;
    }

    public needInitialization() {
        return !this.initialized;
    }

    public setInitialized(): void {
        this.initialized = true;
    }

    public setScale(x: number = 1, y?: number): void {
        this.scale.set(x, y ?? x);
        this.updateGraphicBounds();
    }

    public setAnchorPoint(xOffset: 'left' | 'right' | 'middle', yPxOffset: number = 0) {
        switch (xOffset) {
            case 'left':
                this.anchor.set(0, (this.height + yPxOffset) / this.height);
                break;
            case 'right':
                this.anchor.set(1, (this.height + yPxOffset) / this.height);
                break;
            case 'middle':
                this.anchor.set(0.5, (this.height + yPxOffset) / this.height);
        }

        this.updateGraphicBounds();
    }

    public resetFilters() {
        this.filters = [];
    }

    protected addDebugFilter() {
        this.filters = [ReplaceAlphaFilter()];
    }

    public drawAnchorPoint(color: number = 0x00ff00) {
        const border = new Graphics()
            .rect(-2, 0, 4, 4)
            .fill({ color });

        this.addChild(border);
    }

    protected drawInnerBorder() {
        const width = this.texture.width;
        const height = this.texture.height;

        const border = new Graphics()
            .moveTo(1, 1)
            .lineTo(width, 1)
            .lineTo(width, height)
            .lineTo(1, height)
            .lineTo(1, 1)
            .stroke({ color: 0x00ff00, pixelLine: true });

        this.addChild(border);
    }

    public requestInitialization(): void {
        this.initialized = false;
    }

    public initialize(resourceManager: IAssetsManager): void {
        if (resourceManager.has(this.id)) {
            this.texture = resourceManager.get<AssetTexture>(this.id);
            this.updateGraphicBounds();
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
        // To do something you have to extend it :)
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
        return !this.positionUpdated || this.followedGraphic !== undefined;
    }

    public setPosition3D(position3D: IPosition3D): void {
        this.position3D = position3D;
        this.requestPositionUpdate();
    }

    public updatePosition(stageOffset: Point): void {
        if(this.followedGraphic !== undefined) {
            this.position.set(this.followedGraphic.position.x + this.position3D.x, this.followedGraphic.position.y + this.position3D.y);
            this.zIndex = this.followedGraphic.position3D.z + this.position3D.z;
        } else {
            this.position.set(stageOffset.x + this.position3D.x, stageOffset.y + this.position3D.y);
            this.zIndex = this.position3D.z;
        }

        this.setPositionUpdated();
        this.updateGraphicBounds();
    }

    getCurrentPosition(): IPosition3D {
        return this.position3D;
    }

    public getGraphicBounds() {
        return this.graphicBounds;
    }

    public updateGraphicBounds(): void {
        this.graphicBounds = new PRectangle(
            this.position.x - (this.anchor.x * (this.texture.width * this.scale.x)),
            this.position.y - (this.anchor.y * (this.texture.height * this.scale.y)),
            this.texture.width * this.scale.x,
            this.texture.height * this.scale.y
        );
    }

    public checkGraphicBounds(graphicBounds: PRectangle): void {
        this.visible = graphicBounds.intersects(this.graphicBounds);
    }

    public follow(graphic: Graphic) {
        this.followedGraphic = graphic;
    }

    public unfollow() {
        this.followedGraphic = undefined;
    }

    public checkInput(currentInputs: ICurrentInputs): boolean {
        if (!this.graphicBounds) return false;

        if (!this.graphicBounds.contains(currentInputs.currentCursor.x, currentInputs.currentCursor.y)) return false;

        if (this.graphicBounds.width < 2 || this.graphicBounds.height < 2) return false;

        if (!this.texture.source.hitMap) this.generateHitMap();

        const localX = (currentInputs.currentCursor.x - this.graphicBounds.x) / this.scale.x;
        const localY = (currentInputs.currentCursor.y - this.graphicBounds.y) / this.scale.y;

        const point = new Point(
            (this.texture.frame.x + localX) | 0,
            (this.texture.frame.y + localY) | 0
        );

        return this.texture.source.hitMap[point.y * this.texture.source.width + point.x] > 0;
    }

    public checkHover(currentInputs: ICurrentInputs): boolean {
        if (!this.canBeHovered) return false;

        if (!this.visible) return false;

        return this.checkInput(currentInputs);
    }

    protected generateHitMap(): void {
        const baseTex: ImageSource = this.texture.source;

        if (baseTex.hitMap !== undefined) return;
        if (!baseTex.resource) return;

        let canvas, context;
        if (baseTex.resource instanceof ImageBitmap) {
            canvas = document.createElement('canvas');
            context = canvas.getContext('2d');

            canvas.width = baseTex.resource.width;
            canvas.height = baseTex.resource.height;
            context.drawImage(baseTex.resource, 0, 0);
        } else {
            // @ts-expect-error TODO fix that pls
            canvas = baseTex.resource.source;
            context = canvas.getContext('2d');
        }

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        const hitMap = new Uint32Array(canvas.width * canvas.height);

        for (let i = 0; i < canvas.width * canvas.height; i++) {
            hitMap[i] = imageData.data[i * 4 + 3];
        }

        baseTex.hitMap = hitMap;
    }

    public getEventCategory(): EventCategory {
        return EventCategory.NONE;
    }

    public dispose(): void {
        this._disposed = true;
    }

    public get disposed() {
        return this._disposed;
    }

    public get canBeHovered() {
        return true;
    }

    public get canBeClicked() {
        return false;
    }
}
