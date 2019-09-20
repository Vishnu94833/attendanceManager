import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customers } from '@app/models/customers.model';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { RestApiConstComponent } from 'rest-api-const.component';
import { CountryDropdownModel } from '@app/models/country.model';
import { RegisterModel } from '@app/models/register.model';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  mockUrl = 'http://localhost:3000/employees';

  getCustomers(): Observable<Customers> {
    return this.http.get<Customers>(RestApiConstComponent.CUSTOMERS)
  }

  public customers(response: any) {
    let list: Array<RegisterModel> = new Array<RegisterModel>();
    response.forEach((item: any) => {
      let obj = new RegisterModel();
      obj.employeeId = item.employeeId
      obj.userName = item.username
      obj.email = item.email
      obj.id = item.id
      obj.role = item.role

      list.push(obj)
    });
    return list;
  }

  addCustomer(resp: RegisterModel): Observable<RegisterModel> {
    debugger
    let res = {
      username: resp.userName,
      employeeId: resp.employeeId,
      email: resp.email,
      role: resp.role,
    }
    if(resp.role === 'ADMIN'){
    return this.http.post<RegisterModel>(RestApiConstComponent.ADMIN, res, headerOption);
    }
    if(resp.role === 'USER'){
      return this.http.post<RegisterModel>(RestApiConstComponent.EMPLOYEES, res, headerOption);
    }
  }

  createArray(res: string) {
    let resp = {
      res: Array
    }
    console.log(JSON.stringify(resp));

    return this.http.post(this.mockUrl + '/' + res, res, headerOption);

  }

  deleteCustomerLogic(customerId: number, customerObject: any) {
    for (var i = 0; i <= customerObject.length - 1; i++) {
      let obj = new Customers();
      if (customerId == customerObject[i].employeeId) {
        obj.employeeId = customerObject[i].employeeId;
        obj.firstName = customerObject[i].firstName;
        obj.lastName = customerObject[i].lastName;
        obj.city = customerObject[i].city;
        obj.state = customerObject[i].state;
        obj.address = customerObject[i].address;
        obj.orderTotal = customerObject[i].orderTotal;
        return obj;
      }
    }

    // let list :Array<Customers> = new Array<Customers>();
    // // list.push(new CountryDropdownModel('0', 'All'));
    // customerObject.forEach((item: any) => {
    //   if (customerId == customerObject[i].employeeId){
    //   list.push(item);

    // });
    // return list;
  }

  getCustomerById(id: number): Observable<Customers> {
    return this.http.get<Customers>(RestApiConstComponent.CUSTOMERS + "/" + id)
  }

  deleteCustomer(id: number): Observable<Customers> {
    return this.http.delete<Customers>(RestApiConstComponent.CUSTOMERS + '/' + id, headerOption);
  }

  editCustomer(res: Customers): Observable<Customers> {
    return this.http.put<Customers>(RestApiConstComponent.CUSTOMERS + '/' + res.id, res, headerOption);
  }

  // public FindLastUpdatedDate(currentDate: string): string {
  //   return moment(currentDate).format('DD MMM YY');
  // }

  // public FindLastUpdatedTime(currentDate: string): string {
  //   return moment(currentDate).format('DD MMM YY');
  // }

  // public FindCountry() {
  //   return this.http.get('http://localhost:3000/countries')
  // }

  // public FindCountryName(data: any): Array<CountryDropdownModel> {

  //   let list: Array<CountryDropdownModel> = new Array<CountryDropdownModel>();
  //   list.push(new CountryDropdownModel('0', 'All'));
  //   data.forEach((item: any) => {
  //     // if (item.code == 'IN') {
  //     list.push(new CountryDropdownModel(item.code, item.name));
  //     // }
  //   });
  //   return list;
  // }

  /* ************************** SAME AS ABOVE FUNC******************** */
  // public FindCountryName(data: any): Array<CountryDropdownModel> {
  //   let list: Array<CountryDropdownModel> = new Array<CountryDropdownModel>();
  //   list.push(new CountryDropdownModel('0', 'All'));
  //   return data.filter((r:any) => {
  //     return r.code == 'IN'
  //   })
  // }

  // public FindCityCode(data: any): Array<CityDropdownModel> {
  //   let list: Array<CityDropdownModel> = new Array<CityDropdownModel>();
  //   list.push(new CityDropdownModel(0, 'All'));
  //   data.forEach((item: any) => {
  //     list.push(new CityDropdownModel(item.cityId, item.cityName));
  //   });
  //   return list;
  // }

  filter(list: Array<Customers>, searchTerm: string): Array<Customers> {
    if (searchTerm != '') {
      return list.filter((item: Customers) => {
        return item.firstName == searchTerm;
      });
    } else {
      return list.filter((item: Customers) => {
        return item; //default..
      });
    }
  }
}
