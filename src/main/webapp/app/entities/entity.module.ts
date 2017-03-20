import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PondNotesWaterCounterModule } from './water-counter/water-counter.module';
import { PondNotesDataTempModule } from './data-temp/data-temp.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PondNotesWaterCounterModule,
        PondNotesDataTempModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PondNotesEntityModule {}
