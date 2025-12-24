"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";

export default function ConditionalNavigation() {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // ❌ Auth page + token থাকলে nav hide
    if (pathname === "/auth" && token) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [pathname]);

  return showNav ? <Navigation /> : null;
}
