"use client";
import React, { useEffect, useState } from "react";
import "react-photo-view/dist/react-photo-view.css";

import { loc, setLanguage } from "../../../../src/app/utils";
import { MiniGame, PageLayout } from "../../../../src/app/widgets";

export default function Page() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setLanguage(localStorage.getItem("language") || navigator.language).then(
      () => {
        setReady(true);
      },
    );
  }, []);

  if (!ready) return <div className="loading"></div>;

  return (
    <PageLayout
      title={loc("MiniGame")}
      className="minigame-page"
      showFooter={true}
    >
      <div className="minigame-content">
        <MiniGame />
      </div>
    </PageLayout>
  );
}
