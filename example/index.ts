import { Engine } from '../src/Engine';
import { Position3D } from '../src/geometry/Position3D';
import { Avatar } from './Avatar';
import { AvatarPositionComputer } from './AvatarPositionComputer';
import { Action } from './enum/Action';
import { Direction } from './enum/Direction';

const sandbox = new Engine({
    width: 1000,
    height: 1000,
    canvasContainer: document.body,
    backgroundAlpha: 0,
    mouseEventFrequency: 10000,
    autoResize: true,
    maxAnimationRate: 8,
    maxDisplayRate: 140,
    images: {
        imageDomain: 'http://127.0.0.1:8081/',
    },
});

sandbox.init().then(() => {

    AvatarPositionComputer.init();

    // for (let i = 0; i < 100; i++) {
    //
    //     const archer = new Avatar('avatar/archer_001.png');
    //     archer.setPosition(new Position3D(Math.random() * 1300 | 0, Math.random() * 800 | 0));
    //     sandbox.stage.addChild(archer);
    // }


    const direction = [Direction.N, Direction.E, Direction.S, Direction.W];
    const action = [
        Action.WAIT,
        Action.WALK,
        Action.RUN,
        Action.ATTACK,
        Action.DEFEND,
        Action.BEHIT,
        Action.USE,
        Action.DIE,
    ];

    const avatar = ['avatar/archer_001.png', 'avatar/archer_001.png', 'avatar/archer_001.png'];

    for (let i = 0; i < 1000; i++) {
        const randomDirection = direction[Math.random() * 4 | 0];
        const randomAction = action[Math.random() * 8 | 0];
        const randomAvatar = avatar[Math.random() * 3 | 0];

        const player = new Avatar(randomAvatar, randomAction, randomDirection);
        player.setPosition3D(new Position3D(Math.random() * 1000 | 0, Math.random() * 700 | 0));
        sandbox.stage.addChild(player);
    }

// const player = new Avatar('avatar/wizard_001.png',Action.ATTACK, Direction.E);
// player.setPosition(new Position3D(100, 100));
// sandbox.stage.addChild(player);
});