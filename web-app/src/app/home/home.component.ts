import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GeometryService } from "../geometry.service";
import { Building } from "../Building";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(
    private geometryService: GeometryService,
    private router: Router
  ) {
    this.router = router;
  }

  ngOnInit() {}

  get list() {
    return this.geometryService.getGeoList();
  }

  onClick(id) {
    this.router.navigateByUrl(`/edit/${id}`);
  }

  addNew() {
    this.router.navigateByUrl("new");
  }
}
