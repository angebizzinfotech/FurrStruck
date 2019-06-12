import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import {ApiService} from '../../../../service/admin/api.service';
import {HttpService} from '../../../../service/admin/http.service';
import {CommonService} from '../../../../service/admin/common.service';
import { ProductService } from  '../../../../service/admin/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-view-modal',
  templateUrl: './product-view-modal.component.html',
  styleUrls: ['./product-view-modal.component.css']
})
export class ProductViewModalComponent implements OnInit {

  constructor(private route : Router, private api : ApiService, private http : HttpService, private common : CommonService, private productService : ProductService, public dialogRef : MatDialogRef<ProductService>, @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit() {
  }

}
