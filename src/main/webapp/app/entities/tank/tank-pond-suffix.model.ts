
const enum TankType {
    'POND',
    'AQUARIUM'

};
export class TankPondSuffix {
    constructor(
        public id?: number,
        public tankName?: string,
        public tankType?: TankType,
        public description?: string,
        public timestamp?: number,
        public locationId?: number,
        public userId?: number,
    ) {
    }
}
