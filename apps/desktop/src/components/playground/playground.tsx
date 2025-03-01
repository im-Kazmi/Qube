import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Editor from "../editor/editor";
import { ChevronsUpDown, Ellipsis, GripHorizontal } from "lucide-react";
import { ResultsTable } from "../table/table";
import { Button } from "../ui/button";

export const Playground = () => {
  return (
    <div className="flex w-full h-full flex-col ">
      <div className="w-full flex bg-white">
        <Button>asdf</Button>
      </div>
      <PanelGroup direction="vertical" className="w-full flex-col gap-y-4">
        <Panel defaultSize={60} minSize={25}>
          <Editor />
        </Panel>
        <PanelResizeHandle className="transition-colors relative border border-muted-foreground/10 flex items-center justify-center">
          <Ellipsis className="absolute text-muted-foreground bg-muted" />
        </PanelResizeHandle>
        <Panel defaultSize={40} minSize={25} className="">
          <ResultsTable />
        </Panel>
      </PanelGroup>
    </div>
  );
};
