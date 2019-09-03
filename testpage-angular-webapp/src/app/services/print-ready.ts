import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PrReportsPhantomService {
    private readyToPrintEventName = 'pr-ready-to-print-event';

    constructor(
        @Inject('$rootScope') private $rootScope: any
    ) {}

        /**
     * @ngdoc method
     * @name broadcastReadyToPrintEvent
     * @methodOf pr.reports.service:prReportsPhantomService
     * @description
     * Invokes `$rootScope.$broadcast('pr-ready-to-print-event')` so that phantom knows when page is loaded and it's safe to snapshot the PDF. This should be changed to $emit for performance.
     */
    broadcastReadyToPrintEvent() {
        this.$rootScope.$broadcast('pr-ready-to-print-event');
    }

    /**
     * @ngdoc method
     * @name subscribeToReadyToPrintEvent
     * @methodOf pr.reports.service:prReportsPhantomService
     * @description
     * Invokes `$rootScope.$on('pr-ready-to-print-event')` assigning the passed-in handler so that phantom can subscribe to the broadcasted 'pr-ready-to-print-event' and snapshot the web page within the handler.
     * It deregisters itself upon being executed. This should be changed to $emit for performance.
     *
     * @param {function} handler The function to execute when event is fired.
     */
    subscribeToReadyToPrintEvent(handler): any {
        const deregister = this.$rootScope.$on(this.readyToPrintEventName, () => {
            deregister();
            handler();
        });
    }

}
