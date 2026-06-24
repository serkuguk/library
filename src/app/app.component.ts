import {ChangeDetectionStrategy, Component, HostListener, inject, OnInit, Renderer2, signal} from '@angular/core';
import {Observable} from "rxjs";
import {ISideNavToggle} from '@layouts/components/sidenav/interfaces/side-nav-toggle.interface';
import {CommonModule} from "@angular/common";

//Store
import {select, Store} from "@ngrx/store";
import * as fromAuth from "@features/auth";
import * as fromLoginSelectors from "@features/auth/store/user.selectors";
import * as fromLoginAction from "@features/auth/store/user.actions";
import {BodyComponent} from "@layouts/components/body/body.component";
import {HeaderComponent} from "@layouts/components/header/header.component";
import {FooterComponent} from "@layouts/components/footer/footer.component";
import {SidenavComponent} from "@layouts/components/sidenav/components/sidenav/sidenav.component";
import {filter} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        SidenavComponent,
        HeaderComponent,
        BodyComponent,
        FooterComponent,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    public isSideNavCollapsed = signal<boolean>(false);
    public screenWidth = signal<number>(window.innerWidth);
    public mobileOpen = signal<boolean>(false);

    public store: Store<fromAuth.State> = inject(Store);
    public router: Router = inject(Router);
    private readonly renderer = inject(Renderer2);
    public isAuthenticated$: Observable<boolean> | undefined;

    @HostListener('window:resize')
    public onWindowResize(): void {
        this.screenWidth.set(window.innerWidth);
        if (window.innerWidth > 768 && this.mobileOpen()) {
            this.mobileOpen.set(false);
            this.renderer.removeClass(document.body, 'mobile-nav-open');
        }
    }

    ngOnInit(): void {

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.store.dispatch(fromLoginAction.init());
        });

        this.isAuthenticated$ = this.store.pipe(select(fromLoginSelectors.getIsAuthenticated));
    }

    public onToggleSideNav(data: ISideNavToggle): void {
        this.screenWidth.set(data.screenWidth);
        this.isSideNavCollapsed.set(data.collapsed);
    }

    public onHamburgerClick(): void {
        this.mobileOpen.set(true);
        this.renderer.addClass(document.body, 'mobile-nav-open');
    }

    public onSidenavClose(): void {
        this.mobileOpen.set(false);
        this.renderer.removeClass(document.body, 'mobile-nav-open');
    }

}
