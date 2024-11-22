import React, { useState } from "react";
import TokenIcon from "@mui/icons-material/Token";
import NavElement from "./nav-element";
import { FaTelegram, FaTwitter, FaMailBulk, FaCogs, FaUsers, FaClipboardList, FaFire, FaPaperPlane } from "react-icons/fa";
export const SideBar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHovered, setIsHorved] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setIsHorved(true)}
        onMouseLeave={() => setIsHorved(false)}
        className={`py-5 hidden lg:flex flex-col h-screen items-center ${
          isHovered ? "w-64" : "w-24"
        }`}
      >
        {isHovered && (
          <img
            src="/logowhite.png"
            alt="logo"
            className=" h-400 ml-auto mr-auto"
          />
        )}
        {!isHovered && (
          <img src="/logo.png" alt="logo" className=" w-60 ml-auto mr-auto" />
        )}
        <div className="mt-10 flex flex-col space-y-10 text-white text-base font-semibold mx-10">
          <div className="flex items-center space-x-4  cursor-pointer hover:text-blue-500">
            <TokenIcon  />
            {isHovered && (
              <NavElement
                label="Token Creator"
                href="/"
                navigationStarts={() => setIsNavOpen(false)}
              />
            )}
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <FaCogs size={25} />
            {isHovered && (
              <NavElement
                label="Token Manager(Soon!)"
                href="/basics"
                navigationStarts={() => setIsNavOpen(false)}
                disabled
              />
            )}
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <FaFire size={25} />
            {isHovered && (
              <NavElement
                label="Incinerator"
                href="/incinerator"
                navigationStarts={() => setIsNavOpen(false)}
              />
            )}
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <FaPaperPlane size={25} />
            {isHovered && (
              <NavElement
                label="Multi Sender"
                href="/multisender"
                navigationStarts={() => setIsNavOpen(false)}
              />
            )}
          </div>
        </div>
        <div className="mt-auto flex flex-col space-y-10 mb-5 text-white text-base font-semibold mx-10 fixed left-0 bottom-0">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={1}
              className="flex items-center space-x-4  cursor-pointer hover:text-blue-500"
            >
              <FaUsers size={25} />
              {isHovered && <p>Community</p>}
            </div>
            <ul
              tabIndex={1}
              className="p-2 shadow menu dropdown-content left-36 bottom-0 bg-gray-700 rounded-box sm:w-36"
            >
              <li>
                <div className="form-control bg-opacity-100 flex flex-row">
                  <label className="cursor-pointer label hover:text-blue-500">
                    <FaTelegram />
                    <a
                      href="https://t.me/tokenifypro"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-4"
                    >
                      Telegram
                    </a>
                  </label>
                </div>
              </li>
              <li>
                <div className="form-control bg-opacity-100 flex flex-row">
                  <label className="cursor-pointer label hover:text-blue-500">
                    <FaTwitter />
                    <a
                      href="https://twitter.com/tokenifypro"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-4"
                    >
                      Twitter
                    </a>
                  </label>
                </div>
              </li>
              <li>
                <div className="form-control bg-opacity-100 flex flex-row">
                  <label className="cursor-pointer label hover:text-blue-500">
                    <FaMailBulk />
                    <a
                      href="mailto:support@tokenify.pro"
                      target="_blank"
                      rel="noreferrer"
                      className="ml-4"
                    >
                      Mail
                    </a>
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-blue-500">
            <FaClipboardList size={25} />
            {isHovered && (
              <a
                href="http://docs.tokenify.pro"
                target="_blank"
                rel="noreferrer"
                className="ml-4"
              >
                Docs
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
