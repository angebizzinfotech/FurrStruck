import { Component, OnInit } from '@angular/core';
import {AdminAuthService} from '../../helper/admin-auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    tagName = '';
    activeClass: boolean;
    menu = [];
    constructor(public authService: AdminAuthService) { }

    ngOnInit() {
        const array = JSON.parse(localStorage.getItem('menu'));
        if (array !== null) {
            for (let i = 0; i < array.length; i++) {
                this.menuBarActive(array[i].tagname, i);
            }
        }
    }

    menuBarActive(tagName, level) {
        let data: any
        switch (level) {
            case 0:
                if (this.menu[level] === undefined) {
                    this.menu.push({tagname: tagName, activeClass: true});
                } else if (this.menu[0].tagname === tagName) {
                    this.menu = [];
                } else {
                    this.menu = [];
                    this.menu.push({tagname: tagName, activeClass: true});
                }
                data = this.menu;
                localStorage.setItem('menu', JSON.stringify(data));
                break;
            case 1:
                if (this.menu[level] === undefined) {
                    this.menu.push({tagname: tagName, activeClass: true});
                } else if (this.menu[1].tagname === tagName) {
                    this.menu.splice(-1, 1);
                } else {
                    this.menu.splice(-1, 1);
                    this.menu.push({tagname: tagName, activeClass: true});
                }
                data = this.menu;
                localStorage.setItem('menu', JSON.stringify(data));
                break;
        }
    }

}
