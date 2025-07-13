import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="bg-base-300 ">
      <footer className="footer sm:footer-horizontal  max-w-[1350px] mx-auto text-white py-10 px-5 lg:px-2">
        <div>
          <img className="max-w-[120px] mb-3" src={Logo} alt="" />
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
          <p>
            Development By{" "}
            <a
              className="font-medium hover:underline"
              target="blank"
              href="https://www.facebook.com/share/1HXNLBsofY/"
            >
              Shakil Ahamed
            </a>
          </p>
        </div>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a className="">Email: shakil200607@gmail.com</a>
          <a className="">Phone: +8801772144965</a>
          <a className="">WhatsApp: +880134614946</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="flex gap-5">
            <p>
              <FaFacebook size={25} />
            </p>
            <p>
              <FaTwitter size={25} />
            </p>
            <p>
              <FaInstagram size={25} />
            </p>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
