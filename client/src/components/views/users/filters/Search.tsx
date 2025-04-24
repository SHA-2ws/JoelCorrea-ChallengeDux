"use client"
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { useEffect } from "react";

import { useDebounce } from 'primereact/hooks';
import { useUserStore } from "@/store/UserContext";
import { getUsersWithPagination } from "@/services/users";
export default function SearchUsers() {
    const [inputValue, debouncedValue, setInputValue] = useDebounce('', 400);
    const { setUsers, lazyState, setTotal, setIsLoading, setLazyState} = useUserStore();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }
    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
             await getUsersWithPagination(lazyState.page, lazyState.rows, debouncedValue, lazyState.status).then(({ data, total }) => {
                setUsers(data);
                setTotal(Number(total));
                setIsLoading(false);
                setLazyState(prev => ({ ...prev, search: debouncedValue }));
            });
        }
        fetchUsers();
    }, [debouncedValue, lazyState.page, lazyState.rows, lazyState.status, setUsers, setTotal, setIsLoading, setLazyState]);
    return (
        <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText className="py-3" placeholder="Search" value={inputValue} onChange={handleChange} />
        </IconField>
    )
}       