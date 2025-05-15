import {
  House,
  Package,
  Tag,
  ClipboardList,
  List,
  Briefcase,
  Truck,
  UserPlus,
  Star,
  ScanBarcode,
  BookUser,
  Clock,
} from "lucide-react";
import React from "react";

const Pages = {
  Layout: () => import("@/pages/Layout"),
  LayoutVerificador: () => import("@/pages/@verificador/layout"),
  // ... otros componentes
};
export const navigationUser = [
  {
    name: "Pantalla Inicial",
    href: "/layout",
    icon: House,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Historia",
    href: "/Historia",
    icon: Clock,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Postulaciones",
    href: "/postulaciones",
    icon: Briefcase,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Vacantes",
    href: "/vacantes",
    icon: BookUser,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Valoracion",
    href: "/valoracion",
    icon: Star,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Verificador",
    href: "/verificador",
    icon: ScanBarcode,
    page: React.lazy(Pages.LayoutVerificador),
  },
];

export const navigationAdmin = [
  {
    name: "Pantalla Inicial",
    href: "/layout",
    icon: House,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Combos",
    href: "/combos",
    icon: Package,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Etiquetas",
    href: "/etiquetas",
    icon: Tag,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Evaluacion",
    href: "/evaluacion",
    icon: ClipboardList,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Listas",
    href: "/listas",
    icon: List,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Postulaciones",
    href: "/postulaciones",
    icon: Briefcase,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Proveedores",
    href: "/proveedores",
    icon: Truck,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Vacantes",
    href: "/vacantes",
    icon: UserPlus,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Valoracion",
    href: "/valoracion",
    icon: Star,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Verificador",
    href: "/verificador",
    icon: ScanBarcode,
    page: React.lazy(Pages.LayoutVerificador),
  },
];
