import DesktopHeader from "../header/DesktopHeader";
import MobileHeader from "../header/MobileHeader";

export default function Header() {
  return (
    <>
      <div className="block md:hidden">
        <MobileHeader />
      </div>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
    </>
  );
}
