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
import { LocationPondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/location/location-pond-suffix-detail.component';
import { LocationPondSuffixService } from '../../../../../../main/webapp/app/entities/location/location-pond-suffix.service';
import { LocationPondSuffix } from '../../../../../../main/webapp/app/entities/location/location-pond-suffix.model';

describe('Component Tests', () => {

    describe('LocationPondSuffix Management Detail Component', () => {
        let comp: LocationPondSuffixDetailComponent;
        let fixture: ComponentFixture<LocationPondSuffixDetailComponent>;
        let service: LocationPondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LocationPondSuffixDetailComponent],
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
                    LocationPondSuffixService
                ]
            }).overrideComponent(LocationPondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LocationPondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocationPondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LocationPondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.location).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
