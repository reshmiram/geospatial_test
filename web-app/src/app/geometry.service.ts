import { Injectable } from "@angular/core";
import { Building } from "./Building";
import { HttpClient } from "@angular/common/http";
import { Subscription, Subscribable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GeometryService {
  dataList;
  getDataSubscription: any;

  constructor(private http: HttpClient) {
    this.setDataFromDB();
  }

  getData() {
    let apiUrl = "http://localhost:3000/";
    return this.http.get(apiUrl);
  }

  setDataFromDB() {
    /** Data read from the Database */
    let apiUrl = "http://localhost:3000/";
    this.http.get(apiUrl).subscribe((data) => {
      this.dataList = data;
    });
  }

  getGeoList() {
    return this.dataList;
  }

  getCurrentEntry(id) {
    return this.dataList.find((item) => {
      return item.geom_id === id;
    });
  }

  /** add operation performed in a list maintained in the service */
  addToGeoList(entry: Building) {
    let id = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "");
    entry.geom_id = id;
    this.dataList.push(entry);

    /** incomplete*/
    let apiUrl = "http://localhost:3000/add";
    return this.http.post(apiUrl, entry).subscribe((data) => {});
  }

  /** update operation performed in a list maintained in the service */
  updateGeoList(entry: Building) {
    this.deleteFromGeoList(entry.geom_id);
    this.dataList.push(entry);
  }

  /** delete operation performed in a list maintained in the service */

  deleteFromGeoList(id) {
    let index = this.dataList.findIndex((obj) => obj.geom_id === id);
    this.dataList.splice(index, 1);
  }
}
