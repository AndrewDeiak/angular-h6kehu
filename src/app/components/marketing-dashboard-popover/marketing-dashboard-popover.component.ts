import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core";

@Component({
  selector: "app-marketing-dashboard-popover",
  templateUrl: "./marketing-dashboard-popover.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketingDashboardPopoverComponent {
  @HostBinding("class") public hostClass = "app-marketing-dashboard-popover";
}
