import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  @HostBinding("class") public hostClass = "app-loader";
}
