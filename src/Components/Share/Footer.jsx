import React from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
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
              href="https://shakil-ahmed-dev.netlify.app/"
            >
              Shakil Ahamed
            </a>
          </p>
        </div>
        <nav>
          <h6 className="footer-title">Contact Us</h6>
          <a href="mailto:shakil200607@gmail.com" >Email: <span className="hover:underline">shakil200607@gmail.com</span></a>
          <a href="tel:+8801323540375" >Phone: <span className="hover:underline">+880 1323-540375</span></a>
          <a href="https://wa.me/8801772551376?text=Hello%2C%20I%20want%20to%20connect%20with%20you." target="blank">WhatsApp: <span className="hover:underline">+880 1772-551376</span></a>
        </nav>
        <nav>
          {/* <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a> */}
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="flex gap-5">
            <a href="https://facebook.com/adnanShakilAyan" target="blank">
              <FaFacebook size={25} />
            </a>
            <a href="https://x.com/shakilahamed07" target="blank">
              <FaTwitter size={25} />
            </a>
            <a href="https://www.linkedin.com/in/shakil-ahmed-745566379" target="blank">
              <FaLinkedinIn size={25} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
