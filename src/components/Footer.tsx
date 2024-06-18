import { BsYinYang } from "react-icons/bs";
import { footerLinks } from "@/constants";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter, FaStarOfLife } from "react-icons/fa6";
import { LuSendHorizonal } from "react-icons/lu";

const socials = [
  { icon: <FaFacebookF /> },
  { icon: <FaInstagram /> },
  { icon: <FaXTwitter /> },
  { icon: <FaYoutube /> },
];

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-85 mt-[100px] py-5">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 text-primary mb-3">
              <BsYinYang className="text-4xl" />
              <h1 className="text-xl font-semibold">Animox</h1>
            </div>

            <p className="text-white ">
              Animox, your anime hub. Discover new episodes, explore our
              library, and join our community!
            </p>
          </div>
          {footerLinks.map((item) => (
            <div key={item.label}>
              <h1 className="text-white text-xl mb-4">{item.label}</h1>
              <ul className="list-none">
                {item.label === "Links"
                  ? item.links.map((link) => (
                      <li key={link.value} className="text-slate-300 my-3">
                        {link.value}
                      </li>
                    ))
                  : item.links.map((link) => (
                      <li key={link.value} className="text-slate-300 my-3">
                        <Link href={link.href}>{link.value}</Link>
                      </li>
                    ))}
              </ul>
            </div>
          ))}
          <div>
            <h1 className="text-white text-xl mb-3">Subscribe</h1>
            <div className="relative">
              <input
                type="text"
                className="border-[1px] border-primary rounded-md outline-none w-full bg-bg-color p-2"
                placeholder="Email"
              />
              <button className="absolute top-0 right-0 p-3 flex justify-center items-center text-primary">
                <LuSendHorizonal />
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-primary my-5"></div>
        <div className="flex justify-between items-center">
          <p className="text-slate-300">
            &copy; 2024 Zoroto - All rights reserved.
          </p>
          <div className="flex gap-x-5">
            {socials.map((item, index) => (
              <div
                className="h-[40px] w-[40px] rounded-md flex justify-center items-center text-xl bg-[#4a4a4a] text-primary cursor-pointer duration-300 hover:bg-primary hover:text-white"
                key={index}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
