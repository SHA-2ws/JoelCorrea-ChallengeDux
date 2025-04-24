"use client"
import { getUsersWithPagination } from "@/services/users";
import { useUserStore } from "@/store/UserContext";
import { useEffect, useState } from "react";
import { UserStatus } from "@/types/user";
import { Dropdown } from "primereact/dropdown";

export default function StatusUsers() {

  
    const { setUsers, lazyState, setTotal, setIsLoading, setLazyState } = useUserStore();
    const [inputValue, setInputValue] = useState<UserStatus | null>(lazyState.status);
    const handleChange = (value: string) => {
        setInputValue(value as UserStatus);
        setLazyState(prev => ({ ...prev, status: value as UserStatus }));
    }
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            await getUsersWithPagination(lazyState.page, lazyState.rows, lazyState.search, inputValue).then(({ data, total }) => {
                setUsers(data);
                setTotal(Number(total));
                setIsLoading(false);
            });
        }
        fetchUsers();
    }, [inputValue, lazyState.page, lazyState.rows, lazyState.search, setUsers, setTotal, setIsLoading, setLazyState]);

    return (

        <fieldset className="flex flex-column gap-2 border-none">
            <Dropdown
                onChange={(e) => handleChange(e.value)}
                value={inputValue}
                options={[UserStatus.ACTIVO, UserStatus.INACTIVO] as UserStatus[]}
                placeholder={"Buscar por estado"}
                aria-describedby={`filtro-estado`}

                className="w-full"
            />
        </fieldset>
    )
}