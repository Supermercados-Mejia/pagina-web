import { logoFacebook, logoWhatsapp, mailSharp } from "ionicons/icons";

interface socialLinksProps {
  className?: string;
  href?: string;
  description?: string;
  target?: string;
  color?: string;
  icon?: any;
}

export const socialLinks: socialLinksProps[] = [
  {
    href: "https://www.facebook.com/share/1WZv93NVER/",
    target: "_blank",
    color: undefined,
    icon: logoFacebook,
    className: "text-blue-600",
  },
  {
    href: "https://wa.me/526462087706",
    target: "_blank",
    color: "success",
    icon: logoWhatsapp,
    className: "text-green-500",
  },
  {
    href: "https://mail.google.com/mail/?view=cm&to=atncliente@mercadosliz.com&su=Consulta%20sobre%20servicio%20y%20más%20información&body=Hola,%20quisiera%20saber%20más%20información%20sobre%20sus%20productos%20y%20servicios%20que%20ofrecen.%0AGracias",
    target: "_blank",
    icon: mailSharp,
    className: "text-purple-800",
  },
];
