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
  TicketPercent,
  LayoutList,
} from "lucide-react";
import React from "react";

const Pages = {
  Layout: () => import("@/pages/Layout"),
  LayoutVerificador: () => import("@/pages/@verificador/layout"),
  LayoutPostulaciones: () => import("@/pages/@postulaciones/layout"),
  LayoutHistoria: () => import("@/pages/@historia/layout"),
  LayoutValoraciones: () => import("@/pages/@valoracion/layout"),
  LayoutVacantes: () => import("@/pages/@vacantes/layout"),
  LayoutPromociones: () => import("@/pages/@promociones/layout"),
  // ... otros componentes
};

export const navigationDefault = [
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
    page: React.lazy(Pages.LayoutHistoria),
  },
  {
    name: "Promociones",
    href: "/promociones",
    icon: TicketPercent,
    page: React.lazy(Pages.LayoutPromociones),
  },
  {
    name: "Vacantes",
    href: "/vacantes",
    icon: BookUser,
    page: React.lazy(Pages.LayoutVacantes),
  },
  {
    name: "Postulaciones",
    href: "/postulaciones",
    icon: Briefcase,
    page: React.lazy(Pages.LayoutPostulaciones),
  },
  {
    name: "Valoracion",
    href: "/valoracion",
    icon: Star,
    page: React.lazy(Pages.LayoutValoraciones),
  },
];

export const navigationUser = [
  {
    name: "Pantalla Inicial",
    href: "/layout",
    icon: House,
    page: React.lazy(Pages.Layout),
  },
  {
    name: "Verificador",
    href: "/verificador",
    icon: ScanBarcode,
    page: React.lazy(Pages.LayoutVerificador),
  },
  {
    name: "Listas",
    href: "/listas",
    icon: LayoutList,
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
    page: React.lazy(Pages.LayoutPostulaciones),
  },
  {
    name: "Promociones",
    href: "/promociones",
    icon: TicketPercent,
    page: React.lazy(Pages.LayoutPromociones),
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
    page: React.lazy(Pages.LayoutVacantes),
  },
  {
    name: "Valoracion",
    href: "/valoracion",
    icon: Star,
    page: React.lazy(Pages.LayoutValoraciones),
  },
  {
    name: "Verificador",
    href: "/verificador",
    icon: ScanBarcode,
    page: React.lazy(Pages.LayoutVerificador),
  },
];
