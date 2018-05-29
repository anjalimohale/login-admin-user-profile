import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {BreadcrumbModule, MenuItem } from 'primeng/primeng';

@Injectable()
export class BreadcrumbService {
    public breadcrumbItem: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
    private itemBreadcrums: MenuItem[];

    constructor() {
    }

    setBreadcrumbs(page: string) {
        this.itemBreadcrums = [];
        let refList: MenuItem[] = this.getBreadcrumsLink(page);
        this.breadcrumbItem.next(refList);
    }

    private getBreadcrumsLink(page: string): MenuItem[] {
        this.itemBreadcrums = [];
        // let item: BreadcrumItem = this.getsearchMoviePage();

        switch (page) {
            case 'dashboard':
                this.itemBreadcrums.push({ label: '' });
                break;
            case 'searchMovie':
                this.itemBreadcrums.push({ label: 'Dashboard', routerLink: ['dashboard/home'] });
                this.itemBreadcrums.push({ label: 'Search Movie' });
                break;
            case 'speechSearchMovie':
                this.itemBreadcrums.push({ label: 'Dashboard', routerLink: ['dashboard/home'] });
                this.itemBreadcrums.push({ label: 'Speech Search Movie' });
                break;
            default:
                this.itemBreadcrums = [];
        }
        return this.itemBreadcrums;
    }
}