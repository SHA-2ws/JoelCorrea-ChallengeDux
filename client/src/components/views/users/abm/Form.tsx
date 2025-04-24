"use client"
import { Button } from "primereact/button";
import Inputs from "./Input";
import { useUserStore } from "@/store/UserContext";
import { addUser, deleteUser, editUser } from "@/services/users";
import { User, UserStatus } from "@/types/user";
import { useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserSchema } from "@/schemas/user.schema";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function UserForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { modalType, setModalType, selectedUser, setUsers, setSelectedUser } = useUserStore();
    const toast = useRef<Toast>(null);
    const form = useForm<UserSchema>({
        defaultValues: {
            id: selectedUser?.id || "",
            usuario: selectedUser?.usuario || "",
            estado: selectedUser?.estado || UserStatus.ACTIVO,
            sector: selectedUser?.sector || 2000
        },
        resolver: zodResolver(userSchema),
        mode: "onChange" // Validar al cambiar los campos
    });

    const resetForm = () => {
        form.reset();
        setSelectedUser(null);
        setModalType(null);
    }

    const handleSubmit: SubmitHandler<UserSchema> = async (data) => {

        setIsLoading(true);
        if (modalType === "add") {
            try {
                const res = await addUser(data as User);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Usuario creado',
                    detail: 'El usuario ha sido creado correctamente'
                });
                resetForm();
                // actualizar la lista de usuarios
                setUsers((prevUsers) => [...prevUsers, res]);

            } catch (error) {
                console.error(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Hubo un error al crear el usuario'
                });
            } finally {
                setIsLoading(false);
            }
            return;
        }
        if (modalType === "edit") {
            try {
                const res: User = await editUser(data as User, data.id as unknown as number);
                console.log(res);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Usuario editado',
                    detail: 'El usuario ha sido editado correctamente'
                });
                // actualizar la lista de usuarios
                setUsers((prevUsers) => prevUsers.map(user => user.id === res.id ? res : user));
                resetForm();
            } catch (error) {
                console.error(error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Hubo un error al editar el usuario'
                });
            } finally {
                setIsLoading(false);
            }
        }

    }

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteUser(selectedUser?.id as unknown as number);
            toast.current?.show({
                severity: 'success',
                summary: 'Usuario eliminado',
                detail: 'El usuario ha sido eliminado correctamente'
            });
            // actualizar la lista de usuarios
            setUsers((prevUsers) => prevUsers.filter(user => user.id !== selectedUser?.id));
            resetForm();
        } catch (error) {
            console.error(error);
            toast.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Hubo un error al eliminar el usuario'
            });
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-column gap-3 p-4">
                    <Inputs.TextInput
                        label="ID"
                        id="id"
                    />
                    <Inputs.TextInput
                        label="Usuario"
                        id="usuario"
                    />
                    <Inputs.SelectInput
                        label="Estado"
                        id="estado"
                        options={[UserStatus.ACTIVO, UserStatus.INACTIVO] as UserStatus[]}
                        onChange={() => { }}
                        placeholder="Seleccionar el estado"
                    />
                    <Inputs.SelectInput
                        label="Sector"
                        id="sector"
                        options={[2000]}
                        onChange={() => { }}
                        placeholder="Seleccionar el sector"
                    />
                    <footer className="flex justify-content-center w-full items-center gap-3">
                        <Button icon="pi pi-check" label="Guardar" loading={isLoading} type="submit" />
                        {
                            modalType === "edit" ? (
                                <Button icon="pi pi-trash" severity="danger" label="Eliminar" loading={isDeleting} type="button" onClick={handleDelete} />
                            ) :
                                (
                                    <Button icon="pi pi-times" outlined label="Cancelar" type="button" onClick={() => { setModalType(null); form.reset(); setSelectedUser(null) }} />
                                )
                        }
                    </footer>
                </form>
            </FormProvider>
        </>
    );
}
