import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PondNotesDevicePondSuffixModule } from './device/device-pond-suffix.module';
import { PondNotesFilterPumpCleaningPondSuffixModule } from './filter-pump-cleaning/filter-pump-cleaning-pond-suffix.module';
import { PondNotesMeterReadingPondSuffixModule } from './meter-reading/meter-reading-pond-suffix.module';
import { PondNotesTempMeterPondSuffixModule } from './temp-meter/temp-meter-pond-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PondNotesDevicePondSuffixModule,
        PondNotesFilterPumpCleaningPondSuffixModule,
        PondNotesMeterReadingPondSuffixModule,
        PondNotesTempMeterPondSuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesEntityModule {}
