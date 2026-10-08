import React from "react";
import { FooterBrand } from "./FooterBrand";
import { FooterNewsletter } from "./FooterNewsletter";
import { FooterLinks } from "./FooterLinks";
import { FooterBottom } from "./FooterBottom";

export function Footer() {
  return (
    <footer className="main-footer-gold bg-section dark-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="main-footer-box-gold">
              {/* Child 1: Brand & Socials */}
              <FooterBrand />

              {/* Child 2: Newsletter Box */}
              <FooterNewsletter />

              {/* Child 3: Quick & Service Links */}
              <FooterLinks />
            </div>
          </div>

          {/* Child 4: Copyright & Legal */}
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};
