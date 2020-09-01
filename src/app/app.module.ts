import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatOptionModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ChartsModule} from "ng2-charts";
import {AppComponent} from "./app.component";
import {MarketingDashboardComponent} from "./components/marketing-dashboard.component";
import {LoaderComponent} from "./loader/loader.component";
import {MarketingDashboardPopoverComponent} from "./marketing-dashboard-popover/marketing-dashboard-popover.component";
import {NoResultsFoundComponent} from "./no-results-found/no-results-found.component";

@NgModule({
  declarations: [
    AppComponent,
    MarketingDashboardComponent,
    MarketingDashboardPopoverComponent,
    LoaderComponent,
    NoResultsFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
