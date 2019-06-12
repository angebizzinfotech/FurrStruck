import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../../../service/admin/user.service';
import {UserModalComponent} from './user-modal/user-modal.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {ApiService} from '../../../service/admin/api.service';
import {HttpService} from '../../../service/admin/http.service';
import {AdminAuthService} from '../../../helper/admin-auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    displayedColumns: string[] = ['firstName', 'userName', 'action'];
    list = [];
    dataSource: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    constructor(private userService: UserService,
                public dialog: MatDialog,
                public spinner: NgxSpinnerService,
                private api: ApiService,
                private http: HttpService,
                private router: Router,
                public authService: AdminAuthService) {
    }

    ngOnInit() {
        if (this.authService.getRoleNo() === '10') {
            this.getUserList();
        }
    }


    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    loadData() {
        setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.list);
            this.dataSource.paginator = this.paginator;
            this.spinner.hide();
        });
    }

    getUserList() {
        this.list = [];
        this.http.postRequest(this.api.getUserList, {}).subscribe(
            res => {
                const result: any = res;
                if (result.status) {
                    this.list = result.data;
                    this.loadData();
                } else {
                    this.spinner.hide();
                }
            }
        );
    }
}
