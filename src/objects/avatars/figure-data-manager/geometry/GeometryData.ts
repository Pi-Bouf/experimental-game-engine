import { Rectangle } from 'pixi.js';

export const GeometryData = {
    sizes: {
        vertical: new Rectangle(-12, -116, 90, 130),
        horizontal: new Rectangle(-60, -66, 128, 80),
    },
    offsets: {
        vertical: { x: 0, y: 12 },
        horizontal: { x: 22, y: 44 },
    },
    reversedDirection: [4, 5, 6],
    normalDirection: [2, 1, 0],
    draworder: {
        std: {
            0: [
                'li', 'lh', 'ls', 'ri', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'rh', 'rs', 'hd', 'fc', 'ey',
                'hr', 'hrb', 'fa', 'ea', 'ha', 'he',
            ],
            1: [
                'li', 'lh', 'ls', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'ri', 'rh', 'rs', 'hd', 'fc', 'ey',
                'hr', 'hrb', 'fa', 'ea', 'ha', 'he',
            ],
            2: [
                'li', 'lh', 'ls', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'rh', 'rs', 'hd', 'fc', 'ey', 'hr',
                'hrb', 'fa', 'ea', 'ha', 'he', 'ri',
            ],
            3: [
                'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'li', 'lh', 'ls', 'rh', 'rs', 'hd', 'fc', 'ey', 'hr',
                'hrb', 'fa', 'ea', 'ha', 'he', 'ri',
            ],
            4: [
                'rh', 'rs', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'lh', 'ls', 'li', 'hd', 'fc', 'ey', 'hr',
                'hrb', 'fa', 'ea', 'ha', 'he', 'ri',
            ],
            5: [
                'rh', 'rs', 'ri', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'li', 'lh', 'ls', 'hd', 'fc', 'ey',
                'hr', 'hrb', 'fa', 'ea', 'ha', 'he',
            ],
            6: [
                'rh', 'rs', 'ri', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'li', 'lh', 'ls', 'hd', 'fc', 'ey',
                'hr', 'hrb', 'fa', 'ea', 'ha', 'he',
            ],
            7: [
                'li', 'lh', 'ls', 'ri', 'rh', 'rs', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'hd', 'fc', 'ey',
                'hr', 'hrb', 'fa', 'ea', 'ha', 'he',
            ],
        },
        'lh-up': {
            4: [
                'rh', 'rs', 'bd', 'sh', 'lg', 'ch', 'wa', 'ri', 'ca', 'hd', 'fc', 'ey', 'hr', 'hrb', 'fa',
                'ea', 'ha', 'he', 'lh', 'ls', 'li',
            ],
            5: [
                'rh', 'rs', 'ri', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'hd', 'fc', 'ey', 'hr', 'hrb', 'fa',
                'ea', 'ha', 'he', 'li', 'lh', 'ls',
            ],
            6: [
                'rh', 'rs', 'ri', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'hd', 'fc', 'ey', 'hr', 'hrb', 'fa',
                'ea', 'ha', 'he', 'li', 'lh', 'ls',
            ],
        },
        'rh-up': {
            0: [
                'li', 'lh', 'ls', 'ri', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'hd', 'fc', 'ey', 'hr', 'hrb',
                'fa', 'ea', 'ha', 'he', 'rh', 'rs',
            ],
            1: [
                'li', 'lh', 'ls', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'hd', 'fc', 'ey', 'hr', 'hrb', 'fa',
                'ea', 'ha', 'he', 'ri', 'rh', 'rs',
            ],
            2: [
                'li', 'lh', 'ls', 'bd', 'sh', 'lg', 'ch', 'wa', 'ca', 'hd', 'fc', 'ey', 'hr', 'hrb', 'fa',
                'ea', 'ha', 'he', 'ri', 'rh', 'rs',
            ],
            3: [
                'bd', 'sh', 'lg', 'ch', 'wa', 'li', 'lh', 'ls', 'ca', 'hd', 'fc', 'ey', 'hr', 'hrb', 'fa',
                'ea', 'ha', 'he', 'ri', 'rh', 'rs',
            ],
        },
        sit: {
            2: [
                'li', 'lh', 'ls', 'bd', 'lg', 'ch', 'wa', 'ca', 'rh', 'rs', 'hd', 'fc', 'ey', 'hr', 'hrb',
                'fa', 'ea', 'ha', 'he', 'ri', 'sh',
            ],
            3: [
                'bd', 'lg', 'ch', 'wa', 'ca', 'li', 'lh', 'ls', 'rh', 'rs', 'hd', 'fc', 'ey', 'hr', 'hrb',
                'fa', 'ea', 'ha', 'he', 'ri', 'sh',
            ],
            4: [
                'rh', 'rs', 'bd', 'lg', 'ch', 'wa', 'ca', 'lh', 'ls', 'li', 'hd', 'fc', 'ey', 'hr', 'hrb',
                'fa', 'ea', 'ha', 'he', 'ri', 'sh',
            ],
        },
        'sit.lh-up': {
            4: [
                'rh', 'rs', 'bd', 'lg', 'ch', 'wa', 'ri', 'ca', 'hd', 'fc', 'ey', 'hr', 'hrb', 'fa', 'ea',
                'ha', 'he', 'lh', 'ls', 'li', 'sh',
            ],
        },
        'sit.rh-up': {
            2: [
                'li', 'lh', 'ls', 'bd', 'lg', 'ch', 'wa', 'ca', 'hd', 'fc', 'ey', 'hr', 'hrb', 'fa', 'ea',
                'ha', 'he', 'ri', 'rh', 'rs', 'sh',
            ],
            3: [
                'bd', 'lg', 'ch', 'wa', 'li', 'lh', 'ls', 'ca', 'hd', 'fc', 'ey', 'hr', 'hrb', 'fa', 'ea',
                'ha', 'he', 'ri', 'rh', 'rs', 'sh',
            ],
        },
        lay: {
            2: [
                'lh', 'ls', 'li', 'bd', 'lg', 'sh', 'ch', 'hd', 'fc', 'ey', 'wa', 'ri', 'rh', 'rs', 'ca',
                'hr', 'hrb', 'fa', 'ea', 'ha', 'he',
            ],
            4: [
                'rh', 'rs', 'ri', 'bd', 'lg', 'sh', 'ch', 'hd', 'fc', 'ey', 'wa', 'li', 'lh', 'ls', 'ca',
                'hr', 'hrb', 'fa', 'ea', 'ha', 'he',
            ],
        },
    },
    vertical: {
        top: {
            x: '0',
            y: '0',
            z: '0.0',
            radius: '2.0',
        },
        bottom: {
            x: '0',
            y: '0',
            z: '0.0',
            radius: '0.001',
        },
        behind: {
            x: '0',
            y: '0',
            z: '0.2',
            radius: '0.3',
        },
        torso: {
            x: '0',
            y: '0',
            z: '0',
            radius: '0.4',
            items: {
                bd: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                bds: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                ch: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.04',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                sh: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                lg: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.03',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ss: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.04',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                cp: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.045',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                wa: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.05',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                cc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.06',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ca: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.07',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        leftitem: {
            x: '0',
            y: '0',
            z: '-0.29',
            radius: '0.3',
            items: {
                li: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        rightitem: {
            x: '0',
            y: '0',
            z: '-0.29',
            radius: '0.55',
            items: {
                ri: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        leftarm: {
            x: '-1',
            y: '0',
            z: '-0.51',
            radius: '0.3',
            items: {
                lh: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                lhs: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ls: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                lc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.025',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        rightarm: {
            x: '1',
            y: '0',
            z: '-0.51',
            radius: '0.5',
            items: {
                rh: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                rhs: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                rs: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                rc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.025',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        head: {
            x: '0',
            y: '0',
            z: '0',
            radius: '0.5',
            items: {
                hd: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                fc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ey: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.03',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                hr: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.04',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                hrb: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.05',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                fa: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.06',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ea: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.07',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ha: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.08',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                he: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.09',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
    },
    sitting: {
        top: {
            x: '0',
            y: '0',
            z: '0.0',
            radius: '2.0',
        },
        bottom: {
            x: '0',
            y: '0',
            z: '0.0',
            radius: '0.001',
        },
        behind: {
            x: '0',
            y: '0',
            z: '0.2',
            radius: '0.3',
        },
        torso: {
            x: '0',
            y: '0',
            z: '0',
            radius: '0.4',
            items: {
                bd: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                bds: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                ch: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.03',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                sh: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.04',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                lg: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ss: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.04',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                cp: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.045',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                wa: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.05',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                cc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.06',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ca: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.07',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        leftitem: {
            x: '0',
            y: '0',
            z: '-0.29',
            radius: '0.3',
            items: {
                li: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        rightitem: {
            x: '0',
            y: '0',
            z: '-0.29',
            radius: '0.3',
            items: {
                ri: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        leftarm: {
            x: '-1',
            y: '0',
            z: '-0.51',
            radius: '0.5',
            items: {
                lh: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                lhs: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ls: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                lc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.025',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        rightarm: {
            x: '1',
            y: '0',
            z: '-0.51',
            radius: '0.5',
            items: {
                rh: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                rhs: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                rs: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                rc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.025',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        head: {
            x: '0',
            y: '0',
            z: '0',
            radius: '0.5',
            items: {
                hd: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                fc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ey: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.03',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                hr: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.04',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                hrb: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.05',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                fa: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.06',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ea: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.07',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ha: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.08',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                he: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.09',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
    },
    horizontal: {
        torso: {
            x: '0',
            y: '0',
            z: '0',
            radius: '0.4',
            items: {
                bd: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                bds: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                ch: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                cp: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.025',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                sh: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.04',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                lg: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.03',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ss: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.03',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                wa: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.05',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                cc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.06',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ca: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.07',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        leftitem: {
            x: '0',
            y: '0',
            z: '-0.29',
            radius: '0.3',
            items: {
                li: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        rightitem: {
            x: '0',
            y: '0',
            z: '-0.29',
            radius: '0.3',
            items: {
                ri: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        leftarm: {
            x: '-1',
            y: '0',
            z: '0',
            radius: '0.6',
            items: {
                lh: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                lhs: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ls: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                lc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.025',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        rightarm: {
            x: '1',
            y: '0',
            z: '0',
            radius: '0.6',
            items: {
                rh: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                rhs: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                rs: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                rc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.025',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
        head: {
            x: '0',
            y: '0',
            z: '0',
            radius: '0.5',
            items: {
                hd: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.01',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                fc: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.02',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ey: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.03',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                hr: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.04',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                hrb: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.05',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '1',
                },
                fa: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.06',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ea: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.07',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                ha: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.08',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
                he: {
                    x: '0',
                    y: '0',
                    z: '0',
                    radius: '0.09',
                    nx: '0',
                    ny: '0',
                    nz: '-1',
                    double: '0',
                },
            },
        },
    },
};
