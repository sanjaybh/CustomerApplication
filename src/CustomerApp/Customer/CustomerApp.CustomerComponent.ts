import { Component , Injector  } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import {Customer} from "./CustomerApp.model";
import {BaseLogger} from "../Utility/CustomerApp.Logger";

@Component({
  templateUrl: "./CustomerApp.CustomerView.html"
})
export class CustomerComponent {
  title = "CustomerApplication";
  CustomerModel: Customer = new Customer();
  CustomerModels: Array<Customer> = new Array<Customer>();
  Logobj: BaseLogger = null;

  constructor(_injector: Injector, public httpc: HttpClient) {
    this.Logobj = _injector.get("1");
    this.Logobj.Log();
  }
  
  PosttoServer(){
    //Adding DTO
    var custdto : any = {};
    custdto.CustomerCode = this.CustomerModel.CustomerCode;
    custdto.CustomerName = this.CustomerModel.CustomerName;
    custdto.CustomerAmount = this.CustomerModel.CustomerAmount;
    
    //Adding Server Call
    this.httpc.post('http://localhost:3000/Customers', custdto).subscribe(res=>this.Success(res), res=>this.Error(res))
  }
  
  GetFromServer(res){
    this.httpc.get("http://localhost:3000/Customers").subscribe(res => this.SuccessGet(res), res => this.Error(res))
  }

  SuccessGet(data){
    this.CustomerModels = data;
  }
  Success(res){
    this.GetFromServer(res);
  }

  Error(res) {
    console.debug(res.json());
  }

  SelectCustomer(_selected: Customer) {
    this.CustomerModel = _selected;
  }

  Add() {
    this.CustomerModels.push(this.CustomerModel);
    this.CustomerModel = new Customer(); // clear UI
  }

  hasError(typeofvalidator: string, controlname: string): boolean {
    return this.CustomerModel.formCustomerGroup.controls[controlname].hasError(
      typeofvalidator
    );
  }
}