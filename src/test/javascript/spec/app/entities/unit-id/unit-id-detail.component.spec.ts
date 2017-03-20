import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UnitIdDetailComponent } from '../../../../../../main/webapp/app/entities/unit-id/unit-id-detail.component';
import { UnitIdService } from '../../../../../../main/webapp/app/entities/unit-id/unit-id.service';
import { UnitId } from '../../../../../../main/webapp/app/entities/unit-id/unit-id.model';

describe('Component Tests', () => {

    describe('UnitId Management Detail Component', () => {
        let comp: UnitIdDetailComponent;
        let fixture: ComponentFixture<UnitIdDetailComponent>;
        let service: UnitIdService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [UnitIdDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    UnitIdService
                ]
            }).overrideComponent(UnitIdDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UnitIdDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UnitIdService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UnitId(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.unitId).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
