import Link from "next/link";

const menuItems = ["page1", "page2", "page3", "page4", "page5", "page6"];

export default function MenuBar() {
  return (
    <aside  className="p-4" id="menu-bar">
      <nav className="flex flex-column justify-content-center w-full items-center gap-4">
          {menuItems.map((item) => (
            <Link className="flex justify-content-center items-center w-full" key={item} href={`#${item}`}>
                <span className="pi pi-box text-center" style={{fontSize: "24px", color: "white"}}   ></span>
            </Link>
          ))}
      </nav>
    </aside>
  );
}
