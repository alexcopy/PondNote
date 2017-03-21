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
import { DevicePondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/device/device-pond-suffix-detail.component';
import { DevicePondSuffixService } from '../../../../../../main/webapp/app/entities/device/device-pond-suffix.service';
import { DevicePondSuffix } from '../../../../../../main/webapp/app/entities/device/device-pond-suffix.model';

describe('Component Tests', () => {

    describe('DevicePondSuffix Management Detail Component', () => {
        let comp: DevicePondSuffixDetailComponent;
        let fixture: ComponentFixture<DevicePondSuffixDetailComponent>;
        let service: DevicePondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [DevicePondSuffixDetailComponent],
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
                    DevicePondSuffixService
                ]
            }).overrideComponent(DevicePondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DevicePondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DevicePondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DevicePondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.device).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
