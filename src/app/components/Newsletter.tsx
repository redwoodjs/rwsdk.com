"use client";

import { useEffect, useRef } from "react";
import { SDKButton } from "./SDKButton";
import { CloudflareImage } from "./CloudflareImage";
declare global {
  interface Window {
    __kwesformsScriptAdded?: boolean;
  }
}

export function Newsletter() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!window.__kwesformsScriptAdded) {
      const script = document.createElement("script");
      script.src = "https://kwesforms.com/v2/kf-script.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      window.__kwesformsScriptAdded = true;
    }

    // Add custom styles for KwesForms
    const style = document.createElement("style");
    style.textContent = `
      /* Error styling */
      .field.kw-has-error {
        border-color: #ff0000 !important;
        border-width: 2px !important;
      }
      
      .kw-field-error-message {
        color: #8B2243 !important;
        font-size: 14px !important;
        margin-top: 4px !important;
        display: block !important;
        font-family: 'Jersey', sans-serif !important;
        font-weight: normal !important;
        text-shadow: none !important;
        position: absolute !important;
        bottom: -25px !important;
        left: 0 !important;
      }
      
      .kw-field-error-message::before {
        content: "* " !important;
        color: #8B2243 !important;
      }
      
      /* Success styling */
      .field.kw-has-success {
        border-color: #4caf50 !important;
        border-width: 2px !important;
      }
      
      .kw-field-success-message {
        color: #8B2243 !important;
        font-size: 14px !important;
        margin-top: 4px !important;
        display: block !important;
        font-family: 'Jersey', sans-serif !important;
        font-weight: bold !important;
        text-transform: uppercase !important;
        text-shadow: none !important;
        position: absolute !important;
        bottom: -25px !important;
        left: 0 !important;
      }
      
      /* Remove default KwesForms error styling */
      .kw-border-error {
        border: none !important;
      }
      
      /* Remove default KwesForms success styling */
      .kw-border-success {
        border: none !important;
      }
      
      /* Add success styling to the parent div when input has success class */
      input.kw-border-success {
        border: none !important;
      }
      
      /* Fix for success state - apply to parent div */
      .field:has(input.kw-border-success) {
        border-color: #4caf50 !important;
        border-width: 2px !important;
      }
      
      /* Style for top-level error message */
      .kw-alert.kw-alert-error {
        background-color: #E73C3638 !important;
        color: #8B2343 !important;
        padding: 12px 16px !important;
        margin-top: 15px !important;
        font-family: 'Jersey', sans-serif !important;
        font-weight: light !important;
        font-size: 16px !important;
        width: fit-content !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }
      
      /* Style for top-level success message */
      .kw-alert.kw-alert-success {
        background-color:#FFAD4841;
        color: #F37238 !important;
        padding: 12px 16px !important;
        margin-top: 15px !important;
        font-family: 'Jersey', sans-serif !important;
        font-weight: bold !important;
        font-size: 16px !important;
        width: fit-content !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }
      
      /* Add margin to the input container to make room for error messages */
      .field {
        position: relative !important;
        margin-bottom: 35px !important;
      }
      
      /* Move top-level error message below inputs */
      .kf-form {
        display: flex !important;
        flex-direction: column !important;
      }
      
      .kf-form > .kw-alert {
        order: 10 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="flex flex-row gap-4 max-w-[1400px] mx-auto px-10 py-20">
      <div className="flex flex-col gap-6 max-w-[800px] text-center lg:text-left">
        <h2 className="text-[36px] sm:text-[48px] md:text-[72px] lg:text-[80px] font-bold font-playfair leading-[81%] mb-3 sm:mb-4 md:mb-8 grid-bg py-4 px-2 w-fit">
          Be the first to know
        </h2>
        <p className="text-[18px] sm:text-[24px] md:text-[28px] font-noto leading-[1]">
          Get a summary of what we've shipped, articles we've written, and
          upcoming events straight to your inbox, at most once every two weeks.
        </p>
        <form
          ref={formRef}
          action="https://kwesforms.com/api/foreign/forms/j3K2Y919pleglPFXuuAz"
          className="kf-form flex flex-col gap-4"
        >
          <div className="flex flex-row flex-wrap gap-0 sm:gap-4 items-end">
            <div className="field bg-orange-light text-white border-orange-dark border-1 p-3 w-full sm:w-fit">
              <input
                type="name"
                id="name"
                name="name"
                placeholder="* Enter your name"
                data-kw-rules="required"
                className="w-full sm:w-[180px] bg-transparent border-none text-purple placeholder-purple focus:outline-none"
              />
            </div>
            <div className="field bg-orange-light text-white border-orange-dark border-1 p-3 w-full sm:w-fit">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="* Enter your @ email address"
                data-kw-rules="required|email"
                className="w-full sm:w-[300px] bg-transparent border-none text-purple placeholder-purple focus:outline-none"
              />
            </div>
            <button
              id="newsletter-signup"
              type="submit"
              className="text-orange-medium border border-2 border-orange-light bg-black font-playfair w-full sm:w-fit hover:text-orange-light transition-colors text-[18px] sm:text-[20px] md:text-[24px] px-4 sm:px-3 md:px-8 py-1 h-[52px] sm:mb-[33px]"
            >
              Subscribe
            </button>
          </div>
          {/* Error and success messages will be inserted here by KwesForms */}
        </form>
      </div>
      <div>
        <CloudflareImage
          imageId="f32bcf3d-9f19-455e-1247-dfa18baf4f00"
          alt="logo"
          className="w-[180px] sm:w-[220px] md:w-[300px]"
        />
      </div>
    </section>
  );
}
