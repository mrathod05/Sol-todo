import { applicationData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#0A0E16] to-[#1A2238] text-white py-6 h-full mb-0">
      <div className="container mx-auto px-4 flex flex-col items-center">
        {/* Developer Profile Section */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Link
            href="https://meetrathoddeveloper.netlify.app/"
            target="_blank"
            className="w-12 h-12 bg-purple-900/30 rounded-full border-2 border-purple-500/50 overflow-hidden flex items-center justify-center"
          >
            <Image
              className="rounded-full object-cover"
              width={48}
              height={48}
              alt={`${applicationData.developer.name}`}
              src="/developer.jpg"
              quality={90}
            />
          </Link>
          <div>
            <blockquote className="text-xs text-purple-300/80 italic mb-1">
              Developed By
            </blockquote>
            <Link
              href={`${applicationData.developer.link}`}
              target="_blank"
              className="text-md font-semibold text-purple-300 hover:text-purple-200 transition-colors"
            >
              {`${applicationData.developer.name}`}
            </Link>
          </div>
        </div>

        {/* Copyright and Divider */}
        <div className="container mx-auto px-4 mt-6 pt-4 border-t border-purple-900/30 text-center">
          <p className="text-xs text-purple-300/50">
            {`© 2025 ${applicationData.developer.name}. All rights reserved.`}
            <span className="ml-2 text-purple-400 hover:text-purple-300 transition-colors">
              {`Powered by ${applicationData.app.name}`}
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
