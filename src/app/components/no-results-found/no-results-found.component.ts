import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core";

@Component({
  selector: "app-no-results-found",
  templateUrl: "./no-results-found.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoResultsFoundComponent {
  @Input() public text: string;
  @HostBinding("class") public hostClass = "app-no-results-found";
}
