import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { EditBuildingComponent } from "./edit-building/edit-building.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "edit/:id", component: EditBuildingComponent },
  { path: "new", component: EditBuildingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
