import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { GeometryService } from "../geometry.service";
import { Building } from "../Building";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-edit-building",
  templateUrl: "./edit-building.component.html",
  styleUrls: ["./edit-building.component.scss"],
})
export class EditBuildingComponent implements OnInit {
  current: Building;
  saveUpdate: string = "Save";
  buildingForm = this.fb.group({
    address: "",
    city: "",
    country: "",
    roof_material: "",
    roof_type: "",
    area: "",
    storeys: "",
    height: "",
    geometry: "",
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private geometryService: GeometryService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      let id = params["id"];

      if (id) {
        this.saveUpdate = "Update";
        this.current = this.geometryService.getCurrentEntry(id);

        this.buildingForm = this.fb.group({
          geom_id: this.current.geom_id,
          address: this.current.address,
          city: this.current.city,
          country: this.current.country,
          roof_material: this.current.roof_material,
          roof_type: this.current.roof_type,
          area: this.current.area,
          storeys: this.current.storeys,
          height: this.current.height,
          geometry: JSON.stringify(this.current.geometry),
        });
      }
    });
  }
  isUpdate() {
    return this.saveUpdate === "Update";
  }

  onSubmit() {
    this.geometryService.addToGeoList(this.buildingForm.value);
    this.router.navigateByUrl("home");
  }

  onUpdate() {
    this.geometryService.updateGeoList(this.buildingForm.value);
    this.router.navigateByUrl("home");
  }
  onDelete() {
    this.geometryService.deleteFromGeoList(this.buildingForm.value.geom_id);
    this.router.navigateByUrl("home");
  }
}
