import {TestBed} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {BodyComponent} from "@app/layouts";

describe('BodyComponent (unit methods only)', () => {
    let component: BodyComponent;

    beforeEach(async () => {
        const routerEvents$ = new Subject<any>();

        await TestBed.configureTestingModule({
            providers: [
                provideMockStore(),
                {
                    provide: Router,
                    useValue: {
                        events: routerEvents$.asObservable(),
                        navigate: jest.fn(),
                    },
                },
            ],
        }).compileComponents();

        component = TestBed.runInInjectionContext(() => new BodyComponent());
    });

    describe('onToggleSideNav', () => {
        it('updates screenWidth and isSideNavCollapsed', () => {
            component.getBodyClass();
            expect(component.screenWidth()).toBe(768);
            expect(component.collapsed()).toBe(true);
        });

        it('handles collapsed = false', () => {
            component.getBodyClass();
            expect(component.screenWidth()).toBe(768);
            expect(component.collapsed()).toBe(false);
        });
    });
});


