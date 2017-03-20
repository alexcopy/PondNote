
const enum WaterCounterTypes {
    'PondId',
    ' PondId1',
    ' PondId3'

};
export class WaterCounter {
    constructor(
        public id?: number,
        public date?: any,
        public counterId?: WaterCounterTypes,
        public waterTemp?: number,
    ) {
    }
}
