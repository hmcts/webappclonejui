import {TestBed, async, inject} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../../shared/shared.module';
import {BrowserTransferStateModule} from '@angular/platform-browser';
import {DomainModule} from '../domain.module';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HearingService} from './hearing.service';
import {ConfigService} from '../../config.service';

const configMock = {
    config: {
        api_base_url: 'http://test-doodah/api/hearings/'
    }
};

describe('HearingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule(({
            imports: [
                DomainModule,
                SharedModule,
                BrowserTransferStateModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: ConfigService, userValue: configMock
                },
            ]
        }));
    });

    it('should be created', inject([HearingService], (service: HearingService) => {
        expect(service).toBeTruthy();
    }));

    describe('HTTP requests', () => {
        const fetchResult = { online_hearing_state: 'continuous_online_hearing_relisted_draft', reason: 'test' };

        it('should return hearing', async(inject([HearingService, HttpTestingController],
            (service: HearingService, backend: HttpTestingController) => {
            service.fetch('1221').subscribe(value => {
                expect(value).toEqual(fetchResult);
            });

            backend.expectOne('/blah').flush(fetchResult, { status: 200, statusText: 'Ok' });
    })));

        it('should save list-for-hearing in draft mode', async(inject([HearingService, HttpTestingController],
            (service: HearingService, backend: HttpTestingController) => {
            service.draftListForHearing('1234', 'some reason').subscribe();

            const httpMock = backend.expectOne(req => {
                const body = req.body;

                return req.method === 'POST'
                    && req.url === '/blah'
                    && body.online_hearing_state === 'continuous_online_hearing_relisted_draft'
                    && body.reason === body.reason;
            });
        })));
    });
});
