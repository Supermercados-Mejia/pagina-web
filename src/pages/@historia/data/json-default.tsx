export interface TimelineEvent {
  id: number;
  year?: string;
  title?: string;
  content: React.ReactNode;
  Icon: React.ComponentType<{ size: number }>;
  backgroundColor: string;
  image?: string;
}

// data/timelineEvents.ts
import {
  HousePlus,
  Loader,
  Pickaxe,
  ShoppingBasket,
  ShoppingCart,
  Store,
  Truck,
  Users,
} from "lucide-react";

export const IMAGE_PATHS = {
  MERC3: "/merc3.jpg",
  UVAS: "/uvas.png",
} as const;

export const ICONS = {
  ShoppingBasket,
  Store,
  Users,
  Pickaxe,
  HousePlus,
  ShoppingCart,
  Truck,
  Loader,
} as const;

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    year: "1982",
    title: "Nuestros Inicios",
    content: (
      <>
        Todo inicio en un local con productos de segunda mano en el poblado
        Francisco Zarco (valle de Guadalupe) con el{" "}
        <b>Sr. José Guardado Puentes (Kaliman)</b>, el cual dedicó su vida a
        lograr crecer el negocio.
      </>
    ),
    Icon: ICONS.ShoppingBasket,
    backgroundColor: "#FF5656",
    image: IMAGE_PATHS.MERC3,
  },
  {
    id: 2,
    year: "1994",
    title: "Abarrotes Liz",
    content: (
      <>
        Años después <b>Sr. Jose</b> inauguró su primera sucursal como{" "}
        <i>abarrotes</i>, marcando el inicio formal de esta gran empresa.
      </>
    ),
    Icon: ICONS.Store,
    backgroundColor: "#FFA500",
    image: IMAGE_PATHS.UVAS,
  },
  {
    id: 3,
    title: "Familia",
    content: (
      <>
        Legado continuado por su hijo <b>José Luis Mejía</b> quien, con{" "}
        <i>constancia y esfuerzo</i>, junto al apoyo de sus hermanos{" "}
        <b>Elizabeth</b> y <b>Felipe</b>, ha impulsado el crecimiento con{" "}
        <i>pasión y compromiso</i>.
      </>
    ),
    Icon: ICONS.Users,
    backgroundColor: "#32CD32",
  },
  {
    id: 4,
    title: "Remodelaciones y sorpresas",
    content: (
      <>
        Más de 3 remodelaciones en la primera sucursal sentaron las bases para{" "}
        <u>grandes cambios estratégicos</u> en el modelo de negocio.
      </>
    ),
    Icon: ICONS.Pickaxe,
    backgroundColor: "#1E90FF",
  },
  {
    id: 5,
    year: "2012",
    title: "Nueva inauguración",
    content: (
      <>
        Expansión a <i>Testerazo</i> con una moderna <u>segunda sucursal</u> que
        duplicó la capacidad operativa de la empresa.
      </>
    ),
    Icon: ICONS.HousePlus,
    backgroundColor: "#6A5ACD",
  },
  {
    id: 6,
    year: "2015",
    title: "Mercados Liz",
    content: (
      <>
        Transformación estratégica a{" "}
        <i>
          <b>Mercados Liz</b>
        </i>
        , marcando el salto de pequeño comercio a cadena de supermercados
        regional.
      </>
    ),
    Icon: ICONS.ShoppingCart,
    backgroundColor: "#8A2BE2",
    image: IMAGE_PATHS.MERC3,
  },
  {
    id: 7,
    year: "2018",
    title: "Expansión a Valle de las Palmas",
    content: (
      <>
        Inauguración de la <u>tercera sucursal</u> en zona estratégica de{" "}
        <i>Valle de las Palmas</i>, triplicando cobertura geográfica.
      </>
    ),
    Icon: ICONS.HousePlus,
    backgroundColor: "#FFA500",
  },
  {
    id: 8,
    year: "2023",
    title: "Liz Mayoreo",
    content: (
      <>
        Especialización en <i>venta mayorista</i> con nueva sucursal dedicada a{" "}
        <u>distribución profesional</u> para negocios y hospitality industry.
      </>
    ),
    Icon: ICONS.Truck,
    backgroundColor: "#FF5656",
    image: IMAGE_PATHS.MERC3,
  },
  {
    id: 9,
    content: (
      <>
        Nuestro crecimiento se mide en el impacto positivo generado en clientes,
        empleados y proveedores, construyendo un <i>futuro sostenible</i> para
        toda la comunidad.
      </>
    ),
    Icon: ICONS.Loader,
    backgroundColor: "#32CD32",
    image: IMAGE_PATHS.MERC3,
  },
];
