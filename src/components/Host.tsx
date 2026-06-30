import { Mic } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { HOST } from "@/data/content";

export function Host() {
  return (
    <section id="conducao" className="bg-brand-900 py-20 text-white lg:py-32">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="reveal max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-subtle">Condução</p>
          <h2 className="mt-4 font-heading text-3xl text-white sm:text-4xl">Quem conduz o palco principal</h2>
        </div>

        <div className="reveal mt-12 grid items-center gap-8 rounded-lg border border-white/10 bg-brand-700/40 p-6 sm:p-8 lg:grid-cols-[320px_1fr] lg:gap-12">
          {/* Retrato (avatar on-brand) */}
          <div className="relative overflow-hidden rounded-lg">
            <Avatar name={HOST.name} />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-brand-900/80 px-4 py-2 text-sm font-medium text-brand-subtle backdrop-blur-sm">
              <Mic className="size-4" strokeWidth={2} aria-hidden /> Mestre de cerimônias
            </span>
          </div>

          {/* Bio */}
          <div>
            <h3 className="font-heading text-2xl text-white sm:text-3xl">{HOST.name}</h3>
            <p className="mt-2 font-medium text-brand-subtle">{HOST.role}</p>
            <p className="mt-6 text-lg leading-relaxed text-ink-200">{HOST.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
