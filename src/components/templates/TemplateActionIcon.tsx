import { Copy, Download, Eye } from "lucide-react";
import type { TemplateActionIconKind } from "@/lib/templateLabels";

type TemplateActionIconProps = {
  readonly kind: TemplateActionIconKind;
  readonly size?: number;
};

const assertNever = (value: never): never => {
  throw new Error(`Unsupported template action icon: ${value}`);
};

export function TemplateActionIcon({ kind, size = 16 }: TemplateActionIconProps) {
  const iconProps = {
    "aria-hidden": true,
    size,
  } as const;

  switch (kind) {
    case "copy":
      return <Copy {...iconProps} />;
    case "download":
      return <Download {...iconProps} />;
    case "view":
      return <Eye {...iconProps} />;
    default:
      return assertNever(kind);
  }
}
