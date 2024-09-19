import { Asset } from '../types/Asset';

export interface IAssetsManager {
    init(baseFiles: string[]): Promise<void>

    has(id: string): boolean;

    get<T extends Asset>(id: string): T;
}
