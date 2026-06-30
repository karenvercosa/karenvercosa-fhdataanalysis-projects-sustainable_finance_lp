import {
  TrendingUp,
  Layers,
  Cpu,
  Users,
  Building2,
  Coins,
  Rocket,
  Landmark,
  Sprout,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/data/content";

const MAP: Record<IconName, LucideIcon> = {
  trending: TrendingUp,
  layers: Layers,
  cpu: Cpu,
  users: Users,
  building: Building2,
  coins: Coins,
  rocket: Rocket,
  bank: Landmark,
  sprout: Sprout,
  fileCheck: FileCheck2,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = MAP[name];
  return <C className={className} strokeWidth={1.8} aria-hidden />;
}
