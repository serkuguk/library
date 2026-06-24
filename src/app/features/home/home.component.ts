import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {TableComponent, TableRow} from "@shared/components/table/table.component";
import {ButtonComponent} from "@shared/components/button/button.component";
import {
    AWAITING_COLUMNS,
    AWAITING_ROWS,
    DASHBOARD_STATS,
    OVERDUE_COLUMNS,
    OVERDUE_ROWS,
    RESERVATIONS_COLUMNS,
    RESERVATIONS_ROWS,
} from "./home.mock";

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, TranslateModule, TableComponent, ButtonComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

    readonly today = this.formatDateEs(new Date());

    readonly stats = DASHBOARD_STATS;

    readonly overdueColumns = OVERDUE_COLUMNS;
    readonly overdueRows = OVERDUE_ROWS;

    readonly awaitingColumns = AWAITING_COLUMNS;
    readonly awaitingRows = AWAITING_ROWS;

    readonly reservationsColumns = RESERVATIONS_COLUMNS;
    readonly reservationsRows = RESERVATIONS_ROWS;

    private formatDateEs(date: Date): string {
        const months = [
            'enero','febrero','marzo','abril','mayo','junio',
            'julio','agosto','septiembre','octubre','noviembre','diciembre'
        ];
        return `${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    }

    onIssue(): void {}
    onReaderClick(row: TableRow): void {}
    onDetails(row: TableRow): void {}
    onDeliver(row: TableRow): void {}
    onReservationAction(row: TableRow): void {}
}
