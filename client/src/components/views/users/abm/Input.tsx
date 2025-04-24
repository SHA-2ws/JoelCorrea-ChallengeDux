"use client"
import { InputText } from "primereact/inputtext";

import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { useFormContext, Controller } from "react-hook-form";
import { User } from "@/types/user";


function ErrorMessage({ error, id, help }: { error: boolean, id: string, help: string }) {
    return (
        <small style={{ visibility: error ? "visible" : "hidden", color: "red" }} id={`${id}-help`}>{help}</small>
    );
}

function TextInput({ label, id }: { label: string, id: string }) {
    const { control, formState: { errors } } = useFormContext<User>();
    return (
        <fieldset className="flex flex-column gap-2 border-none">
            <label htmlFor={id}>{label}</label>
            <Controller
                control={control}
                name={id as keyof User}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <InputText onChange={onChange} onBlur={onBlur} value={String(value)} ref={ref} invalid={Boolean(errors[id as keyof User])} id={id} aria-describedby={`${id}-help`} />
                )}
            />
            {
                errors[id as keyof User] && (
                    <ErrorMessage error={Boolean(errors[id as keyof User])} id={id} help={errors[id as keyof User]?.message || ""} />
                )
            }
        </fieldset>
    );
}


function SelectInput<T>({ options, onChange, label, id, placeholder }: { options: T[], onChange: (e: string) => void, label: string, id: string, placeholder: string }) {
   
    const { control, formState: { errors } } = useFormContext<User>();

    const handleChange = (e: DropdownChangeEvent, onChangeForm: (e: string) => void) => {
        onChangeForm(e.value);
        onChange(e.value);
    }


    return (
        <fieldset className="flex flex-column gap-2 border-none">
            <label htmlFor={id}>{label}</label>
            <Controller
                control={control}
                name={id as keyof User}
                render={({ field: { onChange: onChangeForm, onBlur, value, ref } }) => (
                    <Dropdown
                        onChange={(e) => handleChange(e, onChangeForm)}
                        value={value}
                        onBlur={onBlur}
                        options={options}
                        placeholder={placeholder}
                        ref={ref}
                        id={id}
                        aria-describedby={`${id}-help`}
                        invalid={Boolean(errors[id as keyof User])}
                        className="w-full"
                    />
                )}
            />
            {
                errors[id as keyof User] && (
                    <ErrorMessage error={Boolean(errors[id as keyof User])} id={id} help={errors[id as keyof User]?.message || ""} />
                )
            }
        </fieldset>
    );
}

export default {
    TextInput,
    SelectInput
}
