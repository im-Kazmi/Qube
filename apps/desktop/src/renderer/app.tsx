"use client";

import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import React, { useEffect, useRef } from "react";
import { MenuBar } from "../components/menu-bar/menu-bar";
import { Sidebar } from "../components/sidebar/sidebar";
import { TinySidebar } from "../components/sidebar/tiny-sidebar";
import {
  getPanelElement,
  getPanelGroupElement,
  getResizeHandleElement,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import {
  ChevronsLeftRightIcon as ChevronsLeftRightEllipsis,
  EllipsisVertical,
  GripVertical,
} from "lucide-react";
import { useSidebar } from "../hooks/use-sidebar";
import { Playground } from "../components/playground/playground";

function MainPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const refs = useRef<Object>(null);
  const sidebar = useSidebar();

  useEffect(() => {
    const groupElement = getPanelGroupElement("group");
    const leftPanelElement = getPanelElement("left-panel");
    const rightPanelElement = getPanelElement("right-panel");
    const resizeHandleElement = getResizeHandleElement("resize-handle");

    refs.current = {
      groupElement,
      leftPanelElement,
      rightPanelElement,
      resizeHandleElement,
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-muted">
      <div className="flex flex-col h-screen">
        <MenuBar title="Qube" />

        <div className="w-full flex flex-1 overflow-hidden">
          <TinySidebar />

          <PanelGroup
            autoSaveId="main-layout"
            direction="horizontal"
            className="flex-1"
          >
            <Panel id="left-panel" defaultSize={20} minSize={15} maxSize={30}>
              <Sidebar />
            </Panel>

            <PanelResizeHandle className="transition-colors relative border border-muted-foreground/10 flex items-center justify-center">
              <EllipsisVertical className="absolute text-muted-foreground bg-muted" />
            </PanelResizeHandle>

            <Panel id="center-panel" defaultSize={60} minSize={40}>
              <Playground />
            </Panel>

            <PanelResizeHandle className="transition-colors relative border border-muted-foreground/10 flex items-center justify-center">
              <EllipsisVertical className="absolute text-muted-foreground bg-muted" />
            </PanelResizeHandle>

            <Panel
              id="right-panel"
              className=""
              defaultSize={20}
              minSize={15}
              maxSize={30}
            >
              {/* <div className="p-4 h-full bg-white dark:bg-slate-800 overflow-auto">
                <h3 className="text-lg font-medium mb-4">Details</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <h4 className="font-medium text-sm mb-1">Connection</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      PostgreSQL @ localhost:5432
                    </p>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <h4 className="font-medium text-sm mb-1">Schema</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      public
                    </p>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <h4 className="font-medium text-sm mb-1">Query History</h4>
                    <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                      <li>SELECT * FROM users</li>
                      <li>SELECT * FROM orders</li>
                      <li>SELECT * FROM products</li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </Panel>
          </PanelGroup>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}
