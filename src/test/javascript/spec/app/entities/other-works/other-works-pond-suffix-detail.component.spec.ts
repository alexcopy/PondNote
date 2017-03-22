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
import { OtherWorksPondSuffixDetailComponent } from '../../../../../../main/webapp/app/entities/other-works/other-works-pond-suffix-detail.component';
import { OtherWorksPondSuffixService } from '../../../../../../main/webapp/app/entities/other-works/other-works-pond-suffix.service';
import { OtherWorksPondSuffix } from '../../../../../../main/webapp/app/entities/other-works/other-works-pond-suffix.model';

describe('Component Tests', () => {

    describe('OtherWorksPondSuffix Management Detail Component', () => {
        let comp: OtherWorksPondSuffixDetailComponent;
        let fixture: ComponentFixture<OtherWorksPondSuffixDetailComponent>;
        let service: OtherWorksPondSuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [OtherWorksPondSuffixDetailComponent],
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
                    OtherWorksPondSuffixService
                ]
            }).overrideComponent(OtherWorksPondSuffixDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OtherWorksPondSuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OtherWorksPondSuffixService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new OtherWorksPondSuffix(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.otherWorks).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
