import {
  logoFacebook,
  logoInstagram,
  logoTwitter,
  logoTiktok,
  logoLinkedin,
  logoWhatsapp,
} from "ionicons/icons";

interface socialLinksProps {
  label: string;
  color?: string;
  icon: string;
  className: string;
}

interface socialLinksData {
  [key: string]: socialLinksProps;
}
export const socialLinks: socialLinksData = {
  facebook: {
    label: "Facebook",
    icon: logoFacebook,
    className: "text-blue-600",
  },

  instagram: {
    label: "Instagram",
    icon: logoInstagram,
    className: "text-pink-500",
  },
  x: {
    label: "x",
    icon: logoTwitter,
    className: "text-sky-500",
  },

  tikTok: {
    label: "TikTok",
    icon: logoTiktok,
    className: "text-black",
  },

  linkedIn: {
    label: "LinkedIn",
    icon: logoLinkedin,
    className: "text-blue-700",
  },
  whatsapp: {
    label: "WhatsApp",
    icon: logoWhatsapp,
    className: "text-green-500",
  },
};
