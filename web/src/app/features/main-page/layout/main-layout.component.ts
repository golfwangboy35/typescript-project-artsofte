import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { map } from 'rxjs/operators';

import { SidebarComponent } from '@features/main-page/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    LayoutModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterOutlet,
    SidebarComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly isHandset = toSignal(
    this.breakpointObserver.observe('(max-width: 959px)').pipe(map(({ matches }) => matches)),
    { initialValue: false },
  );
}
