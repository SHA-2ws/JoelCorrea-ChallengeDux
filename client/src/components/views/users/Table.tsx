"use client"
import { getUsersWithPagination } from "@/services/users";
import { useUserStore } from "@/store/UserContext";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useCallback, useEffect } from "react";
import { EditUserButton } from "./abm/Modal";
import { TableFallback } from "./fallbacks";

export default function Table() {
    const { users, isLoading, lazyState, setUsers, setTotal, setIsLoading } = useUserStore();


    useEffect(() => {
        setIsLoading(true);

        // si bien hacemos el llamado a la funcion desde un useEffect
        // la llamada a la funcion se hace en el servidor
        // por lo que no hay problema de performance ni de seguridad

        getUsersWithPagination(lazyState.page, lazyState.rows).then(({ data, total }) => {
            setUsers(data);
            setTotal(Number(total));
            setIsLoading(false);
        });
    }, []);



    const UsersTable = useCallback(() => {
        return (
            <DataTable lazy value={users} loading={isLoading} emptyMessage="No hay usuarios." >
                <Column field="id" header="ID" sortable style={{ width: '25%', height: "45px" }}></Column>
                <Column field="usuario" header="Usuario" body={EditUserButton} sortable style={{ width: '25%' }}></Column>
                <Column field="estado" header="Estado" sortable style={{ width: '25%' }}></Column>
                <Column field="sector" header="Sector" sortable style={{ width: '25%' }}></Column>
            </DataTable>
        )
    }, [users, isLoading]);

    if (isLoading && users.length === 0) {
        return <TableFallback />
    }
    return (
        <UsersTable />
    );
}
