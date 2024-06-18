import {
  avatar,
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
  banner9,
  sponsor1,
  sponsor2,
  sponsor3,
  sponsor4,
  sponsor5,
  banner,
} from "@/assets";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/anime", label: "Anime" },
  { href: "/manga", label: "Manga" },
  { href: "/members", label: "Members" },
];

export const bannerImgs = [
  {
    img: banner,
    id: "banner",
  },
  {
    img: banner1,
    id: "banner1",
  },
  {
    img: banner2,
    id: "banner2",
  },
  { img: banner3, id: "banner3" },
  { img: banner4, id: "banner4" },
  { img: banner5, id: "banner5" },
  { img: banner6, id: "banner6" },
  { img: banner7, id: "banner7" },
  { img: banner8, id: "banner8" },
  { img: banner9, id: "banner9" },
];

export const avatarImgs = [
  {
    img: avatar,
    id: "avatar",
  },
  {
    img: avatar1,
    id: "avatar1",
  },
  {
    img: avatar2,
    id: "avatar2",
  },
  {
    img: avatar3,
    id: "avatar3",
  },
  {
    img: avatar4,
    id: "avatar4",
  },
  {
    img: avatar5,
    id: "avatar5",
  },
  {
    img: avatar6,
    id: "avatar6",
  },
  {
    img: avatar7,
    id: "avatar7",
  },
  {
    img: avatar8,
    id: "avatar8",
  },
  {
    img: avatar9,
    id: "avatar9",
  },
  {
    img: avatar10,
    id: "avatar10",
  },
  {
    img: avatar11,
    id: "avatar11",
  },
  {
    img: avatar12,
    id: "avatar12",
  },
];

export const sponsors = [
  { img: sponsor1, id: 1 },
  { img: sponsor2, id: 2 },
  { img: sponsor3, id: 3 },
  { img: sponsor4, id: 4 },
  { img: sponsor5, id: 5 },
];

export const userInfo = [
  { type: "reviews", id: 1 },
  { type: "watchlist", id: 2 },
  { type: "readlist", id: 3 },
];

export const footerLinks = [
  {
    label: "Links",
    links: [
      { href: "anime", value: "Anime" },
      { href: "manga", value: "Manga" },
      { href: "community", value: "Community" },
      { href: "login", value: "Log in" },
      { href: "signup", value: "Sign up" },
    ],
  },
  {
    label: "Socials",
    links: [
      { href: "/", value: "Facebook" },
      { href: "/", value: "Twitter" },
      { href: "/", value: "Instagram" },
      { href: "/", value: "Dribbble" },
      { href: "/", value: "Github" },
    ],
  },
  {
    label: "Legal",
    links: [
      { href: "/", value: "Privacy Policy" },
      { href: "/", value: "Terms Of Use" },
      { href: "/", value: "FAQ" },
      { href: "/", value: "Cookies" },
      { href: "/", value: "Conditions" },
    ],
  },
];

export const filterOptions = [
  { label: "reviews", id: 1 },
  { label: "watchlist", id: 2 },
  { label: "readlist", id: 3 },
];
