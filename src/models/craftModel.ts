export interface craftModel {
    item: string;
    amount: number;
    materials: any;
    catalysts: string[];
    craftLocation: string;
    cooldown: number;
}

export class craftModel implements craftModel {

}