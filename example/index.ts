import { Engine } from '../src/Engine';

// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept(() => {
        window.location.reload();
    });

}

const sandbox = new Engine({
    width: 1000,
    height: 1000,
    canvasContainer: document.body,
    backgroundAlpha: 0,
    mouseEventFrequency: 50,
    autoResize: true,
    maxAnimationRate: 8,
    maxDisplayRate: 140,
    images: {
        imageDomain: 'http://127.0.0.1:8082/'
    }
});