import { Asset } from '../types/Asset';

export interface IAssetsManager {
    has(id: string): boolean;

    get<T extends Asset>(id: string): T;
}
