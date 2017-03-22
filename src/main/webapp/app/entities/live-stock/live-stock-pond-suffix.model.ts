
const enum StockCase {
    'ADDED',
    'REMOVED',
    'DIED'

};
export class LiveStockPondSuffix {
    constructor(
        public id?: number,
        public date?: any,
        public reason?: StockCase,
        public description?: string,
        public qty?: number,
        public tempVal?: number,
        public timestamp?: number,
        public tankId?: number,
    ) {
    }
}
