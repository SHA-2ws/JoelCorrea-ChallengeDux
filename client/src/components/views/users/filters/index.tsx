import { Button } from "primereact/button";
import SearchUsers from "./Search"; 
import StatusUsers from "./Status";
export default function Filters() {
    return (
        <header className="flex gap-3 w-full p-2 justify-content-between items-center">
            <div className="flex gap-2 justify-content-center">    
                <SearchUsers />
                <StatusUsers />
            </div>
            {/* TODO: Agregar filtro por estado */}
        
            <div className="flex gap-2">
                <Button severity="secondary" icon="pi pi-filter"  />
                <Button severity="secondary" icon="pi pi-sliders-h" />
            </div>
        </header>
    );
}
