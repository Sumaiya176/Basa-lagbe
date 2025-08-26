import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer mt-20 sm:footer-horizontal bg-base-200 text-base-content p-10">
      <nav>
        <h6 className="">Services</h6>
        <Link href="/user/post_toLet" className="">
          Post To let
        </Link>
        <Link href="/user/myListings" className="">
          User Listing
        </Link>
        <Link href="" className="link link-hover">
          Marketing
        </Link>
        <Link href="" className="link link-hover">
          Advertisement
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <Link href="/aboutUs" className="/aboutUs">
          About us
        </Link>
        <Link href="/contact" className="">
          Contact
        </Link>
        <Link href="" className="">
          Jobs
        </Link>
        <Link href="" className="">
          Press kit
        </Link>
      </nav>
      <nav>
        <Link href="" className="">
          Terms of use
        </Link>
        <Link href="" className="">
          Privacy policy
        </Link>
        <Link href="" className="">
          Cookie policy
        </Link>
      </nav>
      {/* <form>
        <h6 className="footer-title">Newsletter</h6>
        <fieldset className="w-80">
          <label>Enter your email address</label>
          <div className="join">
            <input
              type="text"
              placeholder="username@gmail.com"
              className="input input-bordered join-item"
            />
            <button className="btn btn-primary join-item">Subscribe</button>
          </div>
        </fieldset>
      </form> */}
    </footer>
  );
};

export default Footer;
