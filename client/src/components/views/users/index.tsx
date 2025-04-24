import dynamic from "next/dynamic";
import { AddUserButton } from "./abm/Modal";
import { TableFallback, FiltersFallback, PaginatorFallback } from "./fallbacks";

// usamos next/dynamic para cargar los componentes de manera lazy en lugar de React.lazy porque esta mejor adaptado para next.js (internamente utiliza React.lazy y Suspense)
// ssr: false para que no se cargue en el servidor (previene el layout shift a causa del desfase de estilos)
// loading: para mostrar un mensaje de carga (fallback de Suspense)

const Table = dynamic(() => import("./Table"), { ssr: false, loading: () => <TableFallback />, });
const Filters = dynamic(() => import("./filters"), { ssr: false, loading: () => <FiltersFallback />, });
const PaginatorTable = dynamic(() => import("./Paginator"), { ssr: false, loading: () => <PaginatorFallback />, });
const UserModal = dynamic(() => import("@/components/views/users/abm/Modal"), { ssr: false });


export default function UserList() {
    return (
        <section className="flex flex-column justify-content-center items-center w-full h-full">
            <header className="flex gap-3 w-full p-2 justify-content-between items-center">
                <h1 className="font-bold m-0 p-0 text-4xl vertical-align-text-bottom line-height-2">Usuarios</h1>
                <AddUserButton />
            </header>
            <main className="flex-column justify-content-center items-center w-full flex-1">
                <Filters />
                <Table />
                <UserModal />
            </main>
            <footer>
                <PaginatorTable />
            </footer>
        </section>
    );
}
