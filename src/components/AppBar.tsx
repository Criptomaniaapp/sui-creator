import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useAutoConnect } from "../contexts/AutoConnectProvider";
import NetworkSwitcher from "./NetworkSwitcher";
import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ReorderIcon from "@mui/icons-material/Reorder";
import Switch from "@mui/material/Switch";
import TokenIcon from "@mui/icons-material/Token";
import SettingsIcon from "@mui/icons-material/Settings";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import PeopleIcon from "@mui/icons-material/People";
import {
  FaTelegram,
  FaTwitter,
  FaMailBulk,
  FaCogs,
  FaUsers,
  FaClipboardList,
  FaFire,
  FaPaperPlane,
} from "react-icons/fa";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NavElement from "./nav-element";

import { WalletModal } from "./WalletModal";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const label = { inputProps: { "aria-label": "Switch demo" } };

export const AppBar: React.FC = () => {
  const [solanaData, setSolanaData] = useState(null);
  const { autoConnect, setAutoConnect } = useAutoConnect();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [modalopen, setModalOpen] = React.useState(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    const fetchSolanaData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/solana"
        );
        setSolanaData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSolanaData();
  }, []);

  const handleClose = () => {
    setModalOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box role="presentation" onClick={toggleDrawer(false)} >
      <div className="flex flex-col w-full min-h-screen py-10">
        <img
          src="/logoblack.png"
          alt="logo"
          className="w-[100px] ml-auto mr-auto"
        />
        <div className="mt-10 flex flex-col space-y-10 text-base font-semibold mx-10">
          <div className="flex items-center space-x-4  cursor-pointer hover:text-green-500">
            <TokenIcon />
            <NavElement
              label="Token Creator"
              href="/"
              navigationStarts={() => setIsNavOpen(false)}
            />
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-green-500">
            <FaCogs size={25} />
            <NavElement
              label="Token Manager(Soon!)"
              href="/basics"
              navigationStarts={() => setIsNavOpen(false)}
              disabled
            />
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-green-500">
            <FaFire size={25} />
            <NavElement
              label="Incinerator"
              href="/incinerator"
              navigationStarts={() => setIsNavOpen(false)}
            />
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-green-500">
            <FaPaperPlane size={25} />
            <NavElement
              label="Multi Sender"
              href="/multisender"
              navigationStarts={() => setIsNavOpen(false)}
            />
          </div>
        </div>
        <div className="mt-auto flex flex-col space-y-10 mb-5 text-white text-base font-semibold mx-10">
          <div className="flex items-center space-x-4  cursor-pointer hover:text-green-500">
            <PeopleIcon />
            <p>Community</p>
          </div>
          <div className="flex items-center space-x-4 cursor-pointer hover:text-green-500">
            <AssignmentIcon />
            <p>Docs</p>
          </div>
        </div>
      </div>
    </Box>
  );
  return (
    <div>
      {/* NavBar / Header */}
      <div
        className="navbar flex flex-row md:mb-2 bg-opacity-66 text-white"
        
      >
        
        <div className="lg:navbar-start align-items-center" >
          <div className="hidden lg:flex space-x-3 items-center">
            <img src="/solana.svg" alt="solanaLogo" width={18} height={18} />
            <div className="text-xs font-medium">
              ${solanaData?.market_data?.current_price?.usd}
            </div>
            <div
              className={`text-xs ${
                solanaData?.market_data?.price_change_24h > 0
                  ? "text-green-400"
                  : "text-red-400"
              } `}
            >
              {(solanaData?.market_data?.price_change_24h || 0).toFixed(2)}%
            </div>
            <div className="text-xs font-medium flex items-centers space-x-1">
              <p className="pb-[4px]">|</p>{" "}
              <p className="pt-[0.5px]">
                MC: $
                {(
                  solanaData?.market_data?.market_cap?.usd / 1000000000 || 0
                ).toFixed(2)}
                B
              </p>
            </div>
            <div
              className="text-xs px-[5px] py-[2px] rounded"
              style={{ background: "rgba(234, 234, 234, 0.33)" }}
            >
              #{solanaData?.market_data?.market_cap_rank}
            </div>
          </div>
          <img
            src="/logowhite.png"
            alt="logo"
            className="w-[100px] lg:hidden block ml-5"
          />
        </div>

        {/* Nav Links */}
        {/* Wallet & Settings */}
        <div className="lg:navbar-end ml-auto">
          <WalletMultiButtonDynamic />
          {/* <div className="hidden lg:block">
            <NotificationsNoneIcon
              sx={{ width: "24px", height: "24px", cursor: "pointer" }}
            />
          </div> */}
          <div className="lg:hidden block">
            <Drawer open={open} onClose={toggleDrawer(false)}>
              {DrawerList}
            </Drawer>
            <ReorderIcon onClick={toggleDrawer(true)} />
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="btn btn-square btn-ghost text-right mr-4"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content bg-gray-700 rounded-box sm:w-52"
            >
              <li>
                <div className="form-control bg-opacity-100">
                  <label className="cursor-pointer label">
                    <a>Autoconnect</a>
                    {/* <input type="checkbox" checked={autoConnect} onChange={(e) => setAutoConnect(e.target.checked)} /> */}
                    <Switch
                      {...label}
                      checked={autoConnect}
                      onChange={(e) => setAutoConnect(e.target.checked)}
                    />
                  </label>
                  <NetworkSwitcher />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <WalletModal modalopen={modalopen} handleClose={handleClose} />
    </div>
  );
};
