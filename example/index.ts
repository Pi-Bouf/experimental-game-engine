import { Engine } from '../src/Engine';
import { Position3D } from '../src/geometry/Position3D';
import { Avatar } from './Avatar';
import { AvatarPositionComputer } from './AvatarPositionComputer';
import { Effect } from "./Effect";
import { Action } from './enum/Action';
import { Direction } from './enum/Direction';

const sandbox = new Engine({
    width: 1000,
    height: 1000,
    canvasContainer: document.body,
    backgroundAlpha: 0,
    mouseEventFrequency: 10000,
    autoResize: true,
    maxAnimationRate: 16,
    maxDisplayRate: 140,
    images: {
        imageDomain: process.env.ASSETS_URL ?? 'http://127.0.0.1:8081/',
    },
});

const urlParams = new URLSearchParams(window.location.search);
const avatarCount = urlParams.get('avatarCount') ? parseInt(urlParams.get('avatarCount')) : 100;

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

    const avatars = ['avatar/archer_001.png', 'avatar/archer_001.png', 'avatar/archer_001.png'];
    const effects = ['effect/effect_001.png', 'effect/effect_002.png'];

    console.log(`Creating ${avatarCount} avatars`);

    for (let i = 0; i < avatarCount; i++) {
        const randomDirection = direction[Math.random() * 4 | 0];
        const randomAction = action[Math.random() * 8 | 0];
        const randomAvatar = avatars[Math.random() * 3 | 0];

        const player = new Avatar(randomAvatar, randomAction, randomDirection);
        player.setPosition3D(new Position3D(Math.random() * 1300 | 0, Math.random() * 700 | 0));
        sandbox.stage.addChild(player);

        const randomEffect = effects[Math.random() * 2 | 0];

        const effect = new Effect(randomEffect);
        effect.setPosition3D(new Position3D(32, 0));
        sandbox.stage.addChild(effect);
        effect.follow(player);
    }
});