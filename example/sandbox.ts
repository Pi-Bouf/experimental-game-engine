import { Engine } from '../src/Engine';
import { FloorType, IVector3D, ObjectType, PositionComputer, RoomGenerator, WallType } from '@holo5/roombuilder';
import { Tile } from '../src/objects/map/object/tile/Tile';
import { Wall } from '../src/objects/map/object/wall/Wall';

const sandbox = new Engine();

function addNewFigure(figure: string, position: IVector3D) {
    const something = sandbox.avatarModule.buildFromFigure(figure);

    something.avatarParts.forEach(child => {
        child.setPosition(position);
        sandbox.stage.addChild(child);
    });
}

sandbox.init()
    .then(() => {
        for (let i = 0; i < 1000; i++) {
            // const sprite = new Badge();
            // sprite.setPosition({ x: Math.random() * 1300 | 0, y: Math.random() * 800 | 0, z: 0 });
            // engine.stage.addChild(sprite);
            // sprite.addTween(new TranslateTween(sprite, 2000, { positions: { x: Math.random() * 1800 | 0, y: Math.random() * 800 | 0, z: Math.random() * 10 | 0 } }));
            //
            // const zoube = new PlaceholderVisualization();
            // zoube.setPosition({ x: Math.random() * 1300 | 0, y: Math.random() * 800 | 0, z: 5 });
            // engine.stage.addChild(zoube);
            // zoube.addTween(new TranslateTween(zoube, 2000, { positions: { x: Math.random() * 1800 | 0, y: Math.random() * 800 | 0, z: Math.random() * 10 | 0 } }));
        }

        PositionComputer.setOffsets(0, 0);
        let roomGenerator = new RoomGenerator();
        let model =
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx\r' +
            'x222222222222222222222222222x\r' +
            'x222222222222222222222222222x\r' +
            '2222222222222222222222222222x\r' +
            'x222222222222222222222222222x\r' +
            'x2222xxxxxx222222xxxxxxx2222x\r' +
            'x2222xxxxxx111111xxxxxxx2222x\r' +
            'x2222xx111111111111111xx2222x\r' +
            'x2222xx111111111111111xx2222x\r' +
            'x2222xx11xxx1111xxxx11xx2222x\r' +
            'x2222xx11xxx0000xxxx11xx2222x\r' +
            'x22222111x00000000xx11xx2222x\r' +
            'x22222111x00000000xx11xx2222x\r' +
            'x22222111x00000000xx11xx2222x\r' +
            'x22222111x00000000xx11xx2222x\r' +
            'x22222111x00000000xx11xx2222x\r' +
            'x22222111x00000000xx11xx2222x\r' +
            'x2222xx11xxxxxxxxxxx11xx2222x\r' +
            'x2222xx11xxxxxxxxxxx11xx2222x\r' +
            'x2222xx111111111111111xx2222x\r' +
            'x2222xx111111111111111xx2222x\r' +
            'x2222xxxxxxxxxxxxxxxxxxx2222x\r' +
            'x2222xxxxxxxxxxxxxxxxxxx2222x\r' +
            'x222222222222222222222222222x\r' +
            'x222222222222222222222222222x\r' +
            'x222222222222222222222222222x\r' +
            'x222222222222222222222222222x\r' +
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

        const room = roomGenerator.generateRoom(model);

        room.drawableTiles.forEach((drawableTile) => {
            if (drawableTile.floorType !== FloorType.BORDER_UNUSABLE) {
                let tileTextureData = sandbox.mapModule.getTileTextureData('111', drawableTile, 2);
                let tile = new Tile(tileTextureData.texture, drawableTile, tileTextureData.offset);
                tile.setPosition(PositionComputer.getObjectScreenPosition(drawableTile.position, ObjectType.TILE));

                sandbox.stage.addChild(tile);

                if (drawableTile.wallType !== WallType.NONE) {
                    let wallTextureData = sandbox.mapModule.getWallTextureData('201', drawableTile, 2, drawableTile.wallHeight, 2);
                    let wall = new Wall(wallTextureData.texture, drawableTile, wallTextureData.offset);
                    wall.setPosition(PositionComputer.getObjectScreenPosition(drawableTile.position, ObjectType.WALL));

                    sandbox.stage.addChild(wall);
                }
            }
        });
        //
        // let figures = [
        //     'hd-3537-1385.ch-3416-92.lg-281-1415.hr-3369-46.he-3548-70.ea-3262-1427',
        //     'hd-3536-4.lg-3320-96.sh-908-1326.hr-3020-1349.he-3295-1423.ea-3484-1321.ca-3464-1423.wa-3212-86.cp-3402-1332',
        //     'hd-3536-27.ch-808-1329.lg-3136-1337.sh-3419-83.ha-3268-92.he-1605-1324.ea-3169-1328.ca-3413-77.cc-3158-1415.cp-3315-73',
        //     'hd-3536-27.ch-3506-88.lg-3521-64.sh-3115-101.he-3385-1422.fa-3474-83.wa-3072-1337.cc-3158-88.cp-3402-85',
        //     'hd-3536-23.ch-3334-74.lg-3216-1425.he-1609-103.cp-3128-104',
        //     'hd-3536-1365.ch-3215-1338.lg-3057-88.ha-3130-85.hr-3357-1347.he-3465-1332.ea-1405-101.fa-3230-97.wa-3080-1337.cc-887-1324.cp-3308-1338',
        //     'hd-3536-12.ch-3459-108.lg-3434-106.hr-830-55.he-3547-1328.ea-3107-1408.fa-3344-1422.ca-3219-85.wa-2006-67.cc-3294-1333.cp-3312-1327',
        //     'hd-3103-3.lg-3320-100.ha-1017-1430.hr-3531-1396.he-3358-75.ea-3484-81.fa-3462-1333.ca-1810-95.wa-2009-89.cc-3186-78.cp-3124-1336',
        //     'hd-3103-26.ch-3443-99.lg-3364-74.ha-3305-89.he-3229-108.fa-3350-74.ca-1810-75.wa-2002-1418.cp-3314-64',
        //     'hd-3103-18.ch-210-92.lg-3341-1410.sh-3338-1433.ha-3117-1416.he-3181-81.ea-3083-1324.fa-3473-1412.ca-3131-1424.cc-3542-1422.cp-3119-1341',
        //     'hd-3103-1375.ch-3279-78.lg-3483-1412.hr-170-1407.he-3551-75.ea-1403-1413.fa-3472-1338.ca-3414-85.wa-2008-1326.cp-3122-79',
        //     'hd-3103-1362.lg-3328-72.ha-1013-104.hr-3568-1396.ca-3223-1324.wa-2012-1428.cp-3402-1413',
        //     'hd-3102-30.ch-3443-1324.lg-3337-1326.sh-3375-1410.hr-892-55.he-3081-74.ea-3170-80.fa-1211-67.ca-3131-1411.wa-3073-64.cc-3075-1320.cp-3284-80',
        //     'hd-3102-25.ch-3510-1337.lg-3401-64.ha-3495-76.hr-677-1344.ea-3262-70.fa-3476-108.ca-1808-1408.wa-3264-1414.cc-3522-70.cp-3288-105',
        //     'hd-3102-1391.ch-3438-94.lg-3483-98.sh-3383-95.ha-3478-1338.he-3295-99.ea-3484-1332.fa-1210-94.ca-3225-105.wa-3072-1325.cc-3573-1326.cp-3316-71',
        //     'hd-3101-28.lg-3384-1325.sh-3115-79.ha-3514-1335.he-3297-70.fa-1211-96.ca-1807-106.wa-2012-1431.cp-3317-82',
        //     'hd-3101-21.ch-3111-75.lg-3434-1336.sh-3154-68.ha-3454-1332.hr-802-44.ea-3224-102.ca-3219-1330.wa-3264-1423.cc-3002-1332.cp-3288-1335',
        //     'hd-3101-18.ch-3237-1418.lg-3320-1415.sh-3275-1426.he-3465-87.ea-3083-1323.fa-3476-94.ca-3131-1320.wa-3074-107.cp-3121-104',
        //     'hd-3101-14.ch-3030-1425.lg-3023-63.ha-3554-1324.he-3239-1431.ea-3224-73.fa-3378-66.ca-3225-1430.wa-3072-1335.cc-3246-89.cp-3308-1332',
        //     'hd-3101-1391.ch-225-103.lg-3088-79.sh-3089-93.ha-3534-76.hr-3357-1405.he-3081-110.ea-3083-76.fa-1209-105.ca-1803-73.wa-2005-105',
        //     'hd-3101-1384.ch-3527-88.lg-3328-1330.ha-3156-1408.hr-677-55.he-3557-1339.fa-1212-1408.wa-3072-1417.cc-3532-76.cp-3121-100',
        //     'hd-3101-1383.ch-876-1323.lg-3365-1414.sh-3016-84.ha-3452-1334.hr-829-58.he-3079-88.fa-3473-81.wa-3212-90.cp-3125-1415',
        //     'hd-3101-1368.lg-3401-97.sh-300-98.hr-677-1348.fa-3470-1329.ca-1804-1330.wa-2011-1428.cc-3087-98.cp-3124-83',
        //     'hd-3101-1365.ch-3015-97.lg-3337-1430.sh-3068-1341.ha-3026-1333.hr-681-1404.he-3562-93.ea-3170-108.fa-3350-1427.ca-3464-1326.wa-3072-76.cc-3289-66.cp-3311-76',
        //     'hd-3101-1364.ch-3015-95.lg-281-63.ha-3243-71.hr-125-40.fa-3471-101.ca-1801-1341.wa-2007-1424.cc-3326-1422.cp-3317-74',
        //     'hd-3101-1358.ch-3279-1426.lg-3023-66.sh-3035-1417.hr-3377-54.he-1603-1324.ca-1811-1427.wa-2006-72.cc-3512-85.cp-3126-83',
        //     'hd-3095-3.ch-3032-1428.lg-3353-67.ha-3567-1323.hr-3090-37.he-3149-99.fa-3193-1320.ca-1805-1336.wa-2007-1337.cp-3309-63',
        //     'hd-3094-20.lg-3333-1410.sh-3275-105.ha-3564-1425.hr-889-1407.ea-3262-1336.fa-1202-1415.ca-1819-107.wa-2011-1421.cc-3448-1338.cp-3286-71',
        //     'hd-3094-18.ch-3538-1417.lg-3401-1322.sh-3068-1421.ha-3421-1326.hr-3357-1347.he-3149-1324.ea-3493-1411.fa-3276-1336.ca-1805-102.wa-2003-93.cc-3448-1327',
        //     'hd-3094-1386.ch-3372-1414.lg-3353-91.sh-3383-1432.ha-3298-1332.hr-3021-43.he-3465-1432.wa-2007-88.cc-3512-1419.cp-3124-79',
        //     'hd-3094-1384.ch-250-67.lg-3365-1339.sh-3089-1323.ha-1009-1334.he-3379-1327.ea-3270-1334.fa-1205-1330.ca-1806-71.cc-3158-109',
        //     'hd-3093-8.ch-210-1426.lg-3320-64.ha-3394-109.hr-679-52.fa-3474-88.ca-3424-71.cc-3389-1339.cp-3125-91',
        //     'hd-3093-5.ch-3111-100.lg-3078-72.sh-295-1329.ha-1002-1421.hr-170-38.he-3229-1430.fa-3344-1322.ca-3503-1429.wa-3504-1327.cc-3512-82.cp-3127-83',
        //     'hd-3093-26.ch-3208-98.lg-3449-96.sh-3375-1423.ha-1023-1417.hr-830-32.ea-3148-94.fa-3345-1431.wa-2008-107.cc-3289-101',
        //     'hd-3093-21.ch-3110-1408.lg-3387-1432.sh-3115-97.ha-3394-1320.he-3239-95.fa-3462-100.ca-1809-64.wa-3212-1315.cc-3280-1322',
        //     'hd-3093-20.lg-3290-1327.sh-3467-106.he-3465-1412.ea-3169-1329.fa-3473-1338.ca-3466-1421.wa-2007-1424',
        //     'hd-3093-1382.lg-3361-1335.sh-3524-1423.ha-3139-1409.hr-3020-1316.he-3297-107.ea-1402-1326.fa-3276-1335.wa-3264-82.cc-3039-110',
        //     'hd-3093-1377.ch-3077-1329.lg-3216-1339.sh-3035-1327.ha-3415-78.hr-3247-46.ea-3270-95.fa-1210-80.ca-1814-66.wa-3504-67.cc-3360-1325.cp-3128-76',
        //     'hd-3093-1.ch-262-1423.lg-3434-1422.sh-3435-67.hr-830-1352.fa-3473-1416.ca-3217-1332.wa-2007-1429.cp-3286-1323',
        //     'hd-3092-30.ch-3109-1336.lg-275-1425.sh-3027-1332.ha-1009-1421.ea-3318-1333.fa-1212-105.ca-3410-1337.cc-260-91.cp-3312-70',
        //     'hd-3092-25.ch-215-1428.lg-281-72.ha-3331-89.hr-3281-1356.he-3227-70.fa-3346-1429.ca-3437-81.cc-3007-91',
        //     'hd-3092-20.lg-3333-91.sh-906-1330.ha-3156-1417.hr-3021-1352.fa-3475-1426.ca-3437-1341.cc-886-81.cp-3204-89',
        //     'hd-3092-1389.lg-3290-1427.sh-905-83.ha-3144-91.he-3358-73.fa-3475-86.ca-3410-1324.wa-3504-1418.cc-3405-1427.cp-3310-1421',
        //     'hd-3092-1389.ch-3446-87.lg-3333-1335.sh-3027-78.ha-3026-1432.hr-891-43.he-3548-99.ea-3226-76.fa-3296-1415.wa-2011-1336',
        //     'hd-3092-1386.lg-3384-1335.hr-3396-1394.he-3070-1341.ea-3196-1412.wa-3074-88.cc-3002-82',
        //     'hd-3092-10.lg-3235-1423.he-3070-1415.ea-1405-1417.fa-3193-79.cc-3039-1328.cp-3124-1420',
        //     'hd-3091-3.ch-3030-1326.lg-3017-83.hr-3386-54.he-3557-81.ea-3083-1428.fa-3471-82.ca-3151-1408.wa-2003-1320',
        //     'hd-3091-24.ch-3510-1416.lg-3058-1320.sh-300-1429.ha-3298-1321.hr-3172-56.ea-3388-71.fa-3475-85.ca-1803-1315.wa-2005-72',
        //     'hd-3091-19.ch-3059-82.lg-3483-1338.ha-3453-110.hr-828-1395.he-1603-1417.ea-3083-1420.fa-3476-1408.ca-1813-1408.wa-3073-1325.cc-3280-92',
        //     'hd-3091-1392.lg-275-1411.sh-3068-1321.ha-3441-1338.hr-155-1395.he-1603-1426.ea-3083-104.fa-1211-79.wa-3073-106.cc-3327-109',
        //     'hd-3091-1390.lg-3257-1320.sh-3089-1422.hr-891-1398.he-3379-1335.fa-1210-1412.ca-1814-1338.wa-2002-98.cc-3374-1412',
        //     'hd-3091-1387.lg-3058-1335.ha-3456-1428.hr-3011-1350.ea-1403-88.fa-3147-1423.ca-3414-1337.wa-2004-98.cc-3509-1337',
        //     'hd-3091-1363.lg-3017-67.sh-3275-110.hr-100-1396.fa-3471-96.ca-3151-1409.wa-2009-1410.cc-3398-81',
        //     'hd-3091-1362.ch-3400-72.lg-3058-72.ha-3479-1427.ea-3493-107.ca-3225-1414.wa-2006-68',
        //     'hd-209-4.lg-3391-1325.sh-295-1408.hr-831-1401.he-3549-1332.ea-3224-1432.wa-3211-95.cp-3126-1328',
        //     'hd-209-3.ch-3538-74.lg-3058-96.ha-3514-85.hr-3520-1397.he-1610-82.ea-3262-1418.fa-1209-100.wa-2003-70.cc-3299-72.cp-3314-64',
        //     'hd-209-26.ch-3540-71.lg-3449-1423.sh-3068-1414.ha-3441-72.hr-889-1396.he-3551-94.ea-3388-1425.ca-3151-83.wa-2012-103.cc-3532-87.cp-3286-1315',
        //     'hd-209-20.ch-262-1326.lg-3521-67.sh-290-1340.ha-3298-97.he-1604-83.fa-1211-1424.ca-1813-1414.wa-3212-96.cc-3532-1430',
        //     'hd-209-1392.ch-803-1329.lg-3361-1322.sh-3375-1421.ha-1023-102.hr-3519-41.ea-3168-1420.fa-3193-1408.ca-3425-106.wa-2007-1423.cc-3153-107',
        //     'hd-209-1381.lg-275-1426.sh-295-1330.ha-3421-1416.he-3559-110.ea-1401-1420.fa-1209-1416.ca-3458-1339.wa-3212-97.cp-3313-104',
        //     'hd-209-1364.ch-3400-1429.lg-285-85.ha-3567-1425.hr-3025-1403.he-3560-87.ea-3108-1409.fa-1203-80.ca-1815-1320.wa-3504-97.cc-3087-89.cp-3288-1315',
        //     'hd-209-11.ch-3432-82.lg-3116-1412.sh-3435-1430.hr-3499-34.he-3155-1336.fa-3296-92.ca-1815-1416.cc-3380-1420',
        //     'hd-208-9.ch-3030-1410.lg-3235-74.hr-3090-47.ea-3226-1321.fa-3470-87.ca-3177-1416',
        //     'hd-208-27.ch-3529-1330.lg-3521-75.hr-3021-1345.he-3258-93.ea-3388-1338.fa-3473-1410.wa-2011-1419.cc-887-91',
        //     'hd-208-24.ch-245-79.lg-3434-84.sh-290-1427.ha-3455-73.hr-3048-1348.fa-3476-91.wa-3073-91.cc-3158-1408.cp-3127-105',
        //     'hd-208-14.ch-806-64.lg-3353-1423.ha-3394-1335.hr-893-1346.he-3155-85.ea-3318-1413.fa-3296-1417.ca-3425-81.cc-3512-106.cp-3311-94',
        //     'hd-208-1391.ch-804-1427.lg-3337-1417.sh-3275-1335.fa-1203-1420.ca-3466-1333.wa-2009-84.cc-3532-1414.cp-3121-1315',
        //     'hd-208-1390.ch-210-84.lg-3290-109.sh-3027-91.ha-3268-1431.hr-3468-1344.he-3082-1333.wa-2007-1422.cc-260-78',
        //     'hd-208-1389.ch-215-1321.lg-281-99.ha-3481-67.hr-3396-1356.ea-3484-1420.ca-3131-86.cp-3315-1327',
        //     'hd-208-1386.ch-245-1321.lg-275-96.hr-831-1399.he-3324-86.ea-3318-1327.ca-1815-74.wa-3366-1324.cc-3280-110.cp-3125-1338',
        //     'hd-208-1383.ch-3342-1334.lg-3057-95.sh-3089-1339.hr-3393-59.he-3358-1427.fa-3473-1425.ca-1804-1334.cc-3360-77.cp-3402-79',
        //     'hd-208-1382.lg-280-1429.hr-3256-48.he-3379-1325.fa-1208-1333',
        //     'hd-208-1367.ch-3438-1325.lg-3058-88.sh-905-1338.ha-3477-102.hr-892-40.ea-1406-82.fa-1210-73.ca-3466-1322.wa-3427-1409.cc-3009-1330',
        //     'hd-208-1359.lg-3384-64.sh-3467-104.hr-679-34.he-3329-105.fa-3276-1327.wa-3264-63.cc-3075-78',
        //     'hd-208-12.lg-3407-73.sh-3338-77.ha-1023-1428.hr-3396-1356.he-3557-102.ea-3141-74.fa-3296-80.ca-1813-90.wa-3074-97.cc-3232-84.cp-3316-1324',
        //     'hd-208-1.ch-3527-88.lg-3364-100.sh-906-99.ha-3535-1427.he-1602-1414.ea-3141-1324.fa-1204-89.ca-3414-77.wa-3073-94.cc-3389-1332.cp-3317-1333',
        //     'hd-207-1386.ch-3368-98.lg-3235-1427.ha-3514-87.hr-165-1394.fa-1206-1424.ca-3412-105.wa-3073-1422.cc-3573-1336.cp-3284-97',
        //     'hd-207-1378.ch-3279-100.lg-285-72.sh-3354-1409.ha-1009-1339.hr-3043-32.he-3164-88.ea-1404-79.ca-1819-83.cc-3009-1326',
        //     'hd-207-1377.ch-240-91.lg-3136-1412.sh-905-1321.hr-830-45.he-3181-1315.ea-1405-1326.fa-3346-110.ca-3176-80.wa-2012-75.cp-3308-1409',
        //     'hd-206-7.lg-3353-95.sh-905-1324.ha-3566-1428.ea-3318-1415.fa-3473-74.ca-1808-1325.wa-3072-94.cp-3119-1333',
        //     'hd-206-30.ch-235-78.lg-281-1325.sh-3035-1424.ha-3478-64.hr-3531-44.he-3070-95.ea-3148-93.ca-3175-109.wa-2006-87.cc-3246-78.cp-3311-67',
        //     'hd-206-26.lg-3365-71.ha-1002-1432.he-1607-72.ea-3226-1337.fa-3345-1325.ca-3411-88.wa-3074-108',
        //     'hd-206-21.ch-3486-108.lg-3023-66.ha-3514-106.hr-3247-1354.he-3385-77.ea-3226-103.fa-3276-81.ca-3223-75.wa-3080-1421.cc-3232-109.cp-3314-83',
        //     'hd-206-20.ch-215-1321.lg-3088-88.sh-3252-92.he-3079-84.ea-3196-1421.fa-3472-80.cc-3246-1418',
        //     'hd-206-1387.ch-3486-1426.lg-3216-1420.sh-3375-1323.ha-1016-1331.hr-3090-1354.he-3071-1422.ea-3270-104.fa-3344-1323.wa-3264-1422.cp-3312-1414',
        //     'hd-206-1385.ch-3038-1428.lg-3257-1334.sh-3383-82.ha-3129-1322.he-3550-88.fa-1206-1415.ca-3151-96.wa-2006-71.cc-3280-1430.cp-3128-102',
        //     'hd-206-1372.lg-3290-1417.ha-3231-1411.he-3547-78.fa-1202-105.ca-3414-71.wa-3366-80.cc-3289-1414',
        //     'hd-206-1371.ch-809-1414.lg-3521-1418.sh-3027-1410.ha-3440-1321.hr-155-1396.ea-1406-1424.fa-1206-1410.wa-3366-81.cp-3122-1421',
        //     'hd-205-22.ch-3563-1426.lg-3333-77.sh-3089-76.ha-3254-1337.he-1610-1426.ea-1404-1326.ca-3414-67.wa-2012-79.cp-3121-77',
        //     'hd-205-2.ch-230-1433.lg-3023-1330.sh-905-94.ha-3452-1417.he-3189-1326.ea-3107-84.ca-1810-1427.wa-2004-1324.cc-3389-85.cp-3205-1333',
        //     'hd-205-1392.lg-3434-1417.hr-889-39.he-3081-83.ea-3141-86.wa-2012-1334',
        //     'hd-205-1385.ch-3321-1409.lg-3521-1426.sh-908-1413.ha-3567-87.hr-677-42.he-3385-68.fa-3462-1324.ca-1817-1411.wa-2003-71.cc-3380-1429.cp-3402-1419',
        //     'hd-205-1383.lg-285-1322.hr-3260-50.he-3070-87.fa-3230-1339.ca-3413-1341.wa-3072-1329.cp-3124-1330',
        //     'hd-205-1376.lg-3521-1323.hr-3325-1401.ca-3458-1341.wa-3366-103',
        //     'hd-205-1368.ch-235-1413.lg-3017-1423.sh-3467-1424.ha-3440-1418.he-3557-63.fa-1212-1417.ca-1811-1340.wa-2003-1321.cc-3327-85.cp-3309-1338',
        //     'hd-205-1359.ch-3332-1416.lg-3116-1415.sh-3348-1409.ha-3394-1332.he-3297-1429.fa-1205-70.ca-3175-78.wa-2003-1420.cc-3508-1334',
        //     'hd-205-13.ch-3234-1411.lg-3361-1421.sh-3252-1333.ha-3129-1341.ea-1401-97.fa-1203-106.ca-3292-1325.wa-2009-1323.cc-3075-77.cp-3122-64',
        //     'hd-205-10.lg-3235-1333.hr-3041-1405.he-3227-1428.ea-1405-93.fa-1212-1427.cp-3310-76',
        //     'hd-200-4.ch-3030-101.lg-3257-1425.hr-3516-38.he-3550-1422.ea-3108-99.fa-3472-1424.ca-3343-1429.wa-3211-77.cc-3269-67',
        //     'hd-200-26.ch-877-1341.lg-3337-87.sh-3068-1336.hr-830-49.fa-3462-90.ca-3411-1428.cc-3289-103.cp-3316-1341',
        //     'hd-200-18.ch-3540-89.lg-275-1336.sh-3035-1336.ha-3544-1341.hr-3499-49.he-3552-102.ea-3169-1416.fa-1203-106.ca-1819-1420.wa-2005-80.cc-3405-76.cp-3121-1329',
        //     'hd-200-1389.ch-3203-63.lg-281-1408.sh-3068-92.hr-3568-59.he-1603-110.ea-3226-1420.fa-3193-1326.cc-3389-1419',
        //     'hd-200-1376.ch-806-1321.lg-3320-1315.ha-1011-1324.hr-125-1397.he-3081-1409.fa-3346-1426.cp-3402-1422',
        //     'hd-195-21.ch-3208-1330.lg-3216-1420.hr-3260-1400.fa-1212-83.ca-3458-1326.cc-3405-76.cp-3122-107',
        //     'hd-195-21.ch-240-1432.lg-3401-1326.hr-3370-35.he-3379-96.ca-3131-89.wa-3072-1427.cc-3039-108.cp-3122-1410',
        //     'hd-195-19.lg-3408-1329.ha-3026-90.hr-3396-1400.fa-3230-89.ca-3425-107.wa-3073-1429.cc-3420-85.cp-3284-1410',
        //     'hd-195-15.ch-3563-91.lg-3017-88.sh-3467-1409.ha-3054-1420.hr-3278-1401.he-3395-100.ea-3493-77.fa-3378-1412.wa-3073-1414.cc-3153-1340',
        //     'hd-195-1384.ch-3077-1332.lg-3136-82.sh-305-66.he-3549-92.ca-3511-1327.cc-3009-1338.cp-3127-1422',
        //     'hd-195-1378.ch-804-1315.lg-3138-79.sh-295-104.ha-3139-82.hr-3011-33.fa-3346-76.ca-3413-83.wa-3427-1418.cp-3205-1432',
        //     'hd-195-1372.ch-3015-77.lg-3058-107.sh-908-1420.ha-3392-88.hr-828-58.ea-1405-64.fa-3474-63.ca-3423-1409.wa-2007-1325.cp-3128-91',
        //     'hd-195-1365.ch-3459-1325.lg-3136-106.sh-3275-103.ha-3347-1419.hr-3020-1403.he-3376-68.ea-1403-1433.ca-1810-1329',
        //     'hd-195-1363.ch-3332-106.lg-3202-70.sh-290-1411.he-3069-1429.ea-3388-1423.fa-1202-108.ca-1804-88.wa-3263-1315.cc-3153-1331',
        //     'hd-190-9.lg-3365-68.sh-3375-1339.ha-3156-83.hr-3520-53.ca-3187-1420.cc-3002-94.cp-3317-1341',
        //     'hd-190-8.lg-3418-1325.ha-3394-1321.hr-891-1356.he-3558-83.ea-1401-1340.ca-3412-1337.cc-3573-1419.cp-3205-1422',
        //     'hd-190-7.ch-3077-1315.lg-3449-1324.ha-1012-1413.he-3550-96.ea-1405-80.fa-3471-104.ca-1807-1426.wa-3366-1430.cc-3087-82.cp-3127-108',
        //     'hd-190-23.ch-3342-82.lg-3333-1320.sh-3354-1412.ha-3495-1328.ea-3318-94.ca-3187-1429.wa-3212-110.cc-3508-68.cp-3402-95',
        //     'hd-190-14.ch-3443-1418.lg-3333-75.sh-3016-1333.ha-3362-1417.hr-3436-1344.he-3079-108.ea-3224-96.fa-3345-66.ca-3437-63.wa-3211-1423.cc-3294-76.cp-3284-1422',
        //     'hd-190-14.ch-3372-74.lg-3017-1338.sh-3206-1430.ha-3363-80.hr-3393-60.ea-3168-1341.fa-3378-71.ca-1815-1426.wa-3211-92.cc-3389-1409.cp-3120-82',
        //     'hd-190-1381.ch-3234-1411.lg-3202-64.ha-1014-63.fa-3346-1410.cc-3398-110.cp-3309-94',
        //     'hd-190-1377.ch-3489-1341.lg-3355-97.sh-3375-1338.ea-3493-64.fa-1201-84.ca-3466-66.cc-3448-1419.cp-3315-1335',
        //     'hd-190-11.lg-3202-1339.hr-3516-40.ea-3224-1413.ca-3503-66.cc-3002-1423',
        //     'hd-185-1382.lg-285-88.sh-3275-1423.ha-1014-77.hr-3172-1355.ea-1403-1324.ca-3511-1423.wa-2004-1414.cc-886-1428.cp-3204-1413',
        //     'hd-185-1360.lg-3353-84.ha-3253-88.hr-3322-43.he-1604-1341.ea-3270-80.fa-3345-1321.wa-3212-96.cc-3232-106.cp-3124-1322',
        //     'hd-180-3.ch-878-1335.lg-3434-1334.sh-3338-1335.ha-3156-87.hr-3021-1402.fa-3473-100.cc-3299-98.cp-3316-1408',
        //     'hd-180-29.lg-3353-108.sh-305-80.hr-829-54.he-3146-1337.ea-3318-1412.fa-3476-1426.ca-3219-75.cc-3232-1324.cp-3205-1335',
        //     'hd-180-19.ch-875-1325.lg-3408-101.sh-3252-80.hr-681-59.he-3181-1315.fa-3378-1432.ca-1814-1340.wa-3211-1414.cp-3315-94',
        //
        // ];
        //
        // // for (let i = 0; i < figures.length; i++) {
        // //     addNewFigure(figures[i], new Vector3d(
        // //         Math.random() * 1000 + 40 | 0,
        // //         Math.random() * 900 | 0,
        // //         0,
        // //     ));
        // // }
        //
        // addNewFigure(figures[8], new Vector3d(
        //     Math.random() * 1000 + 40 | 0,
        //     Math.random() * 900 | 0,
        //     0,
        // ));

        console.log('Children count', sandbox.stage.children.length);
    });
