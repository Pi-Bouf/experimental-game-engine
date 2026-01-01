export type GameLoopFunction = (delta: number) => void;

export class GameTicker {
    private _fps: number = 60;
    private _lastTime: number = 0;
    private _fpsInterval = 1000 / this._fps;

    private _gameLoopFunction: GameLoopFunction;

    update(): void {
        const currentTime = performance.now();
        const delta = currentTime - this._lastTime;

        if (delta >= this._fpsInterval) {
            this._lastTime = currentTime;

            if(this._gameLoopFunction) {
                this._gameLoopFunction(delta);
            }
        }

        requestAnimationFrame(this.update.bind(this));
    }

    public attach(gameLoopFunction: GameLoopFunction): void {
        this._gameLoopFunction = gameLoopFunction;
    }

    start(): void {
        requestAnimationFrame(this.update.bind(this));
    }

    setFps(fps: number): GameTicker {
        this._fps = fps;
        this._fpsInterval = 1000 / fps;

        return this;
    }

    getFps(): number {
        return this._fps;
    }
}