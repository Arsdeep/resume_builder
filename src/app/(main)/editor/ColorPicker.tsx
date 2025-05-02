import { Color, ColorChangeHandler, TwitterPicker } from "react-color";
import { useState } from "react";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { PaletteIcon } from "lucide-react";

interface ColorPickerProps {
  color: Color | undefined;
  onChange: ColorChangeHandler;
}

export default function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title="Change Resume Color"
          onClick={() => setShowPopover(true)}
        >
          <PaletteIcon className="size-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto" align="end">
        <TwitterPicker
          color={color}
          onChange={onChange}
          triangle="top-right"
          colors={[
            "#000000", // Black
            "#1E88E5", // Bright Blue
            "#FDD835", // Bold Yellow
            "#FB8C00", // Energetic Orange
            "#E53935", // Striking Red
            "#8E24AA", // Rich Purple
            "#00ACC1", // Fresh Cyan
            "#7CB342", // Modern Lime
            "#D81B60", // Elegant Pink
            "#3949AB", // Deep Indigo
            "#5E35B1", // Strong Violet
            "#039BE5", // Sky Blue
            "#F4511E", // Fiery Orange
            "#6D4C41", // Sophisticated Brown
          ]}
        />
      </PopoverContent>
    </Popover>
  );
}
