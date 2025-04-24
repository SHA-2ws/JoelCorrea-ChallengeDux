"use client"
import UserForm from "./Form";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { useUserStore } from "@/store/UserContext";
import { User } from "@/types/user";
import { useCallback } from "react";

export default function UserModal() {
    const { modalType, setModalType, selectedUser, setSelectedUser } = useUserStore();
    const Form = useCallback(() => {
        return <UserForm />
    }, [modalType, selectedUser])
    return (
        <Dialog style={{ width: "650px" }} pt={{
            closeButton: {
                className: 'bg-transparent border-none shadow-none text-white hover:bg-transparent hover:text-white'
            }
        }} draggable={false} header="Usuario" headerStyle={{ backgroundColor: "#007bff", color: "#fff" }} closeOnEscape closeIcon="pi pi-minus" visible={Boolean(modalType)} onHide={() => { setModalType(null); setSelectedUser(null) }}>
            <Form />
        </Dialog>
    );
}

export function AddUserButton() {
    const { setModalType } = useUserStore();
    return (
        <Button label="Nuevo Usuario" icon="pi pi-plus" className="p-2" type="button" onClick={() => { setModalType("add") }} />

    );
}

export function EditUserButton(user: User) {
    const { setModalType, setSelectedUser } = useUserStore();
    const handleClick = () => {
        setSelectedUser(user);
        setModalType("edit");
    }
    return (
        <Button label={user.usuario} pt={{ label: { style: { textDecoration: "underline", color: "#0763E7" } } }} text link className="p-2" type="button" onClick={handleClick} />
    );
}


