import Image from "next/image";

export default function NavBar() {
  return (
    <header id="nav-bar">
      <nav > 
        <Image src="/dux-icon.webp" alt="logo" width={45} height={45} className="ml-2 aspect-square"  />
      </nav>
    </header>
  );
}
