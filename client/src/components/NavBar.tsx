import Image from "next/image";
import { Button } from "primereact/button";

export default function NavBar() {
  return (
    <header id="nav-bar">
      <nav className="flex justify-content-between flex-row items-center w-full"> 
        <Image src="/dux-icon.webp" alt="logo" width={45} height={45} className="ml-2 aspect-square"  />
        <Button text icon="pi pi-cog" className="text-white"/>
      </nav>
    </header>
  );
}
