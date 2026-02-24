"use client";
import React, { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { MajdataLogo } from "./index";
import { loc } from "../utils";
import { apiroot3 } from "../apiroot";
import { AiOutlineLoading3Quarters, AiOutlineUser } from "react-icons/ai";

export default function UnifiedHeader() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMainNavOpen, setIsMainNavOpen] = useState(false);
  const [isMobileAuthMenuOpen, setIsMobileAuthMenuOpen] = useState(false);
  const [isRankingsMenuOpen, setIsRankingsMenuOpen] = useState(false);
  const [isMobileRankingsOpen, setIsMobileRankingsOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mainNavRef = useRef(null);
  const mobileAuthMenuRef = useRef(null);
  const rankingsMenuRef = useRef(null);

  const fetcher = (url) =>
    fetch(url, { mode: "cors", credentials: "include" }).then((res) =>
      res.json()
    );

  /*const {
    data: userInfo,
    error,
    isLoading,
  } = useSWR(apiroot3 + "/account/info/", fetcher);
  const username = userInfo?.username || "";
  const isLoggedIn = !!username && !error;*/

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (mainNavRef.current && !mainNavRef.current.contains(event.target)) {
        setIsMainNavOpen(false);
        setIsMobileRankingsOpen(false); // 主菜单关闭时，同时关闭子菜单
      }
      if (
        mobileAuthMenuRef.current &&
        !mobileAuthMenuRef.current.contains(event.target)
      ) {
        setIsMobileAuthMenuOpen(false);
      }
      if (
        rankingsMenuRef.current &&
        !rankingsMenuRef.current.contains(event.target)
      ) {
        setIsRankingsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // 调用服务器登出API
      await fetch(apiroot3 + "/account/Logout", {
        method: "POST",
        mode: "cors",
        credentials: "include",
      });

      // 清除本地Cookie作为备用措施
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // 关闭用户菜单
      setIsUserMenuOpen(false);

      // 跳转到首页
      window.location.href = "/";
    } catch (error) {
      console.error(loc("LogoutFailed"), error);
      // 即使API调用失败，也清除本地状态并跳转
      document.cookie =
        "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsUserMenuOpen(false);
      window.location.href = "/";
    }
  };

  return (
    <header className="unified-header">
      <div className="header-container">
        {/* 左侧区域：Logo + 导航 */}
        <div className="header-left-section">
          {/* Logo Section */}
          <div className="header-logo">
            <a href="/">
              <MajdataLogo />
            </a>
          </div>
        </div>

        <div className="mobile-header-logo">
          <a href="/">
            {/* <img
              className="xxlb"
              src="../../../salt.webp"
              alt="xxlb"
            >
            </img> */}
            <MajdataLogo />
          </a>
        </div>
      </div>
    </header>
  );
}
