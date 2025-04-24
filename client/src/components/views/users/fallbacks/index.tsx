import { Skeleton } from "primereact/skeleton"


export function TableFallback() {
    return (
        <Skeleton className="p-datatable p-component p-datatable-responsive-scroll" height="400px" width="100%" />
    )
}

export function FiltersFallback() {
    return (
        <header className="flex gap-3 w-full p-2 justify-content-between items-center">
            <div className="flex gap-2 justify-content-center">
                <Skeleton className="p-datatable p-component p-datatable-responsive-scroll" height="62px" width="280px" />

                <Skeleton className="p-datatable p-component p-datatable-responsive-scroll" height="62px" width="280px" />

            </div>

            <div className="flex gap-2">
                <Skeleton className="p-datatable p-component p-datatable-responsive-scroll" height="62px" width="45px" />

                <Skeleton className="p-datatable p-component p-datatable-responsive-scroll" height="62px" width="45px" />

            </div>
        </header>
    )
}

export function PaginatorFallback() {
    return (
        <div className="p-paginator p-component flex flex-row self-center justify-content-center items-center w-full h-full" data-pc-name="paginator" data-pc-section="root">
            <Skeleton height="62px" width="400px" />
        </div>
    )

}

const Fallbacks = {
    TableFallback,
    FiltersFallback,
    PaginatorFallback
}

export default Fallbacks;
