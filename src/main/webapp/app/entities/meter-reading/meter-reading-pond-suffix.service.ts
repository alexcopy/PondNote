import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, BaseRequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { MeterReadingPondSuffix } from './meter-reading-pond-suffix.model';
import { DateUtils } from 'ng-jhipster';
@Injectable()
export class MeterReadingPondSuffixService {

    private resourceUrl = 'api/meter-readings';
    private resourceSearchUrl = 'api/_search/meter-readings';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(meterReading: MeterReadingPondSuffix): Observable<MeterReadingPondSuffix> {
        let copy: MeterReadingPondSuffix = Object.assign({}, meterReading);
        copy.readingDate = this.dateUtils.toDate(meterReading.readingDate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(meterReading: MeterReadingPondSuffix): Observable<MeterReadingPondSuffix> {
        let copy: MeterReadingPondSuffix = Object.assign({}, meterReading);

        copy.readingDate = this.dateUtils.toDate(meterReading.readingDate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<MeterReadingPondSuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            let jsonResponse = res.json();
            jsonResponse.readingDate = this.dateUtils
                .convertDateTimeFromServer(jsonResponse.readingDate);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<Response> {
        let options = this.createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res))
        ;
    }

    private convertResponse(res: any): any {
        let jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            jsonResponse[i].readingDate = this.dateUtils
                .convertDateTimeFromServer(jsonResponse[i].readingDate);
        }
        res._body = jsonResponse;
        return res;
    }

    private createRequestOption(req?: any): BaseRequestOptions {
        let options: BaseRequestOptions = new BaseRequestOptions();
        if (req) {
            let params: URLSearchParams = new URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);

            options.search = params;
        }
        return options;
    }
}
