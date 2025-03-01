import { Minus, Square, X } from "lucide-react";

interface WindowControlsProps {
  platform?: "mac" | "windows";
}

export function WindowControls({ platform = "mac" }: WindowControlsProps) {
  const handleMinimize = () => {
    if (window.qube) {
      window.qube.minimize();
    }
  };

  const handleMaximize = () => {
    if (window.qube) {
      window.qube.maximize();
    }
  };

  const handleClose = () => {
    if (window.qube) {
      window.qube.close();
    }
  };

  if (platform === "mac") {
    return (
      <div className="flex h-full items-center px-3">
        <div className="flex gap-1.5">
          <button
            onClick={handleClose}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-red-500 hover:bg-red-600"
            aria-label="Close"
          >
            <X className="h-2 w-2 text-red-800 opacity-0 hover:opacity-100" />
          </button>
          <button
            onClick={handleMinimize}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-500 hover:bg-yellow-600"
            aria-label="Minimize"
          >
            <Minus className="h-2 w-2 text-yellow-800 opacity-0 hover:opacity-100" />
          </button>
          <button
            onClick={handleMaximize}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-green-500 hover:bg-green-600"
            aria-label="Maximize"
          >
            <Square className="h-2 w-2 text-green-800 opacity-0 hover:opacity-100" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <button
        onClick={handleMinimize}
        className="flex h-9 w-12 items-center justify-center hover:bg-accent"
        aria-label="Minimize"
      >
        <Minus className="h-4 w-4" />
      </button>
      <button
        onClick={handleMaximize}
        className="flex h-9 w-12 items-center justify-center hover:bg-accent"
        aria-label="Maximize"
      >
        <Square className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={handleClose}
        className="flex h-9 w-12 items-center justify-center hover:bg-red-500 hover:text-white"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
