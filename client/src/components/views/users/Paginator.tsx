"use client"

import { Paginator } from 'primereact/paginator';
import { useUserStore } from '@/store/UserContext';
import { PaginatorFallback } from './fallbacks';

export default function PaginatorTable() {
    const { total, lazyState, setLazyState, isLoading } = useUserStore();
    
    if (isLoading && total === 0) {
        return <PaginatorFallback />
    }
    return (
        <Paginator totalRecords={total} rows={lazyState.rows} first={lazyState.first} onPageChange={(data) => {
            setLazyState({ first: data.first, rows: data.rows, page: (data.page ?? 0) + 1, search: lazyState.search, status: lazyState.status })
        }} rowsPerPageOptions={[5, 10]} />
    );
}
