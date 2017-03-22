export class WaterChangePondSuffix {
    constructor(
        public id?: number,
        public changeDate?: any,
        public description?: string,
        public readingBefore?: number,
        public readingAfter?: number,
        public tempVal?: number,
        public timestamp?: number,
        public tankId?: number,
    ) {
    }
}
