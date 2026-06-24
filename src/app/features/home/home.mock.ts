import {TableColumn, TableRow} from '@shared/components/table/table.component';

/**
 * Datos simulados (mock) del Panel de Inicio.
 * El contenido de las filas está en español; las cabeceras usan claves i18n.
 */

export interface DashboardStats {
    overdue: number;
    dueToday: number;
    readyToIssue: number;
}

export const DASHBOARD_STATS: DashboardStats = {
    overdue: 4,
    dueToday: 3,
    readyToIssue: 2,
};

/* ----------------------------- Préstamos vencidos ----------------------------- */

export const OVERDUE_COLUMNS: TableColumn[] = [
    {field: 'lector', header: 'PAGES.HOME.COL.READER', type: 'especial', minWidth: '180px', visible: true},
    {field: 'libro', header: 'PAGES.HOME.COL.BOOK', type: 'text', minWidth: '200px', visible: true},
    {field: 'fechaLimite', header: 'PAGES.HOME.COL.DUE_DATE', type: 'text', minWidth: '120px', visible: true},
    {field: 'dias', header: 'PAGES.HOME.COL.DAYS', type: 'text', minWidth: '80px', textAlign: 'center', visible: true},
    {field: 'importe', header: 'PAGES.HOME.COL.AMOUNT', type: 'especial', minWidth: '100px', visible: true},
    {field: 'acciones', header: 'PAGES.HOME.COL.ACTION', type: 'especial', minWidth: '120px', textAlign: 'center', visible: true},
];

export const OVERDUE_ROWS: TableRow[] = [
    {lector: 'Ana Pérez', libro: 'Don Quijote de la Mancha', fechaLimite: '24 may 2026', dias: '+17', importe: '7,50 €'},
    {lector: 'Carlos Gómez', libro: 'Cien años de soledad', fechaLimite: '1 jun 2026', dias: '+9', importe: '2,25 €'},
    {lector: 'María López', libro: 'La casa de los espíritus', fechaLimite: '5 jun 2026', dias: '+5', importe: '1,25 €'},
    {lector: 'Diego Martín', libro: 'Rayuela', fechaLimite: '7 jun 2026', dias: '+3', importe: '0,75 €'},
];

/* --------------------------- Pendientes de recogida --------------------------- */

export const AWAITING_COLUMNS: TableColumn[] = [
    {field: 'lector', header: 'PAGES.HOME.COL.READER', type: 'especial', minWidth: '180px', visible: true},
    {field: 'libro', header: 'PAGES.HOME.COL.BOOK', type: 'text', minWidth: '200px', visible: true},
    {field: 'inventario', header: 'PAGES.HOME.COL.INVENTORY', type: 'text', minWidth: '150px', visible: true},
    {field: 'notificado', header: 'PAGES.HOME.COL.NOTIFIED', type: 'text', minWidth: '120px', visible: true},
    {field: 'acciones', header: 'PAGES.HOME.COL.ACTION', type: 'especial', minWidth: '120px', textAlign: 'center', visible: true},
];

export const AWAITING_ROWS: TableRow[] = [
    {lector: 'María López', libro: 'Pedro Páramo', inventario: 'INV-2026-0066', notificado: '9 jun 2026'},
    {lector: 'Diego Martín', libro: 'El Aleph', inventario: 'INV-2025-0077', notificado: '10 jun 2026'},
];

/* --------------------------------- Reservas ----------------------------------- */

export const RESERVATIONS_COLUMNS: TableColumn[] = [
    {field: 'lector', header: 'PAGES.HOME.COL.READER', type: 'especial', minWidth: '180px', visible: true},
    {field: 'libro', header: 'PAGES.HOME.COL.BOOK', type: 'text', minWidth: '200px', visible: true},
    {field: 'desde', header: 'PAGES.HOME.COL.SINCE', type: 'text', minWidth: '120px', visible: true},
    {field: 'estado', header: 'PAGES.HOME.COL.STATUS', type: 'text', minWidth: '120px', visible: true},
    {field: 'acciones', header: 'PAGES.HOME.COL.ACTION', type: 'especial', minWidth: '120px', textAlign: 'center', visible: true},
];

export const RESERVATIONS_ROWS: TableRow[] = [
    {lector: 'Lucía Fernández', libro: 'Ficciones', desde: '8 jun 2026', estado: 'En espera'},
];
