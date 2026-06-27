import { NavLink } from "react-router-dom";
import { Home, Sprout, Gamepad2, BookOpen, Users } from "lucide-react";
import { familyNav } from "../data";

const icons = { Home, Sprout, Gamepad2, BookOpen, Users } as const;

export default function BottomNav() {
  return (
    <nav className="absolute bottom-0 left-0 right-0 z-40">
      <div className="mx-3 mb-3 rounded-3xl bg-white/95 backdrop-blur border border-leaf-dark/5 shadow-[0_-6px_24px_-12px_rgba(17,77,40,0.35)]">
        <ul className="grid grid-cols-5">
          {familyNav.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold transition-colors ${
                      isActive ? "text-leaf" : "text-muted"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-2xl transition-all ${
                          isActive ? "bg-leaf-soft scale-105" : "bg-transparent"
                        }`}
                      >
                        <Icon size={20} strokeWidth={2.4} />
                      </span>
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
