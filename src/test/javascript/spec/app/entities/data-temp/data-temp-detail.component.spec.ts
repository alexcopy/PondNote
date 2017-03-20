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
import { DataTempDetailComponent } from '../../../../../../main/webapp/app/entities/data-temp/data-temp-detail.component';
import { DataTempService } from '../../../../../../main/webapp/app/entities/data-temp/data-temp.service';
import { DataTemp } from '../../../../../../main/webapp/app/entities/data-temp/data-temp.model';

describe('Component Tests', () => {

    describe('DataTemp Management Detail Component', () => {
        let comp: DataTempDetailComponent;
        let fixture: ComponentFixture<DataTempDetailComponent>;
        let service: DataTempService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [DataTempDetailComponent],
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
                    DataTempService
                ]
            }).overrideComponent(DataTempDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DataTempDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DataTempService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DataTemp(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.dataTemp).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
