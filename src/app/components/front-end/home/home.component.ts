import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/admin/api.service';
import { HttpService } from '../../../service/admin/http.service';
import {Router} from '@angular/router';
import {CommonService} from '../../../service/admin/common.service';
import { NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    list = [];

    constructor(private router : Router, private api : ApiService, private http : HttpService, private commonService: CommonService, private spinner : NgxSpinnerService) { }

    ngOnInit() {
    }

    productDetail(pId:number){
       
        this.router.navigate(['/front-end/home']);
    }


    searchProduct(event: any){
        
        this.http.postRequest(this.api.searchProductDetail, {'searchProduct' : event}).subscribe(res => {
            const result : any = res;
            if(result.status)
            {
                this.list = result.data;
                this.router.navigate(['/front-end/product-list']);

            }
        });

    }

}
