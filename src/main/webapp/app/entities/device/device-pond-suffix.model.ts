
const enum DeviceType {
    'PUMP',
    'FILTER',
    'UVLAMP',
    'UVCLARIFIER',
    'AIRPUMP',
    'OTHER'

};
export class DevicePondSuffix {
    constructor(
        public id?: number,
        public deviceName?: string,
        public deviceType?: DeviceType,
        public description?: string,
        public timestamp?: number,
        public tankId?: number,
    ) {
    }
}
