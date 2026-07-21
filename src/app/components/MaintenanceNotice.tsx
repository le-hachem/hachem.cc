import { DraftingCompass } from "lucide-react";
import { Reveal } from "./Reveal";
import { PlateCorners } from "./Ornaments";

/**
 * The empty-state a section shows while its contents are withheld — set as a
 * printer's notice pasted onto the page rather than a lone floating line: an
 * architect's compass between two hairlines, a small-caps kicker, and the
 * message, the whole thing squared off with plate corner-marks so the gap
 * reads as a deliberate device instead of missing copy.
 */
export function MaintenanceNotice({
  kicker,
  line1,
  line2,
}: {
  kicker: string;
  line1: string;
  line2?: string;
}) {
  return (
    <Reveal className="mx-auto my-6 max-w-xl sm:my-10">
      <div className="relative border border-[var(--np-rule)] bg-[var(--c-161413)]/40 px-6 py-12 text-center sm:px-10 sm:py-16">
        <PlateCorners offset={7} />

        {/* Compass between drawn-out hairlines */}
        <div className="mb-7 flex items-center justify-center gap-5">
          <span className="h-px w-10 bg-[var(--np-rule)] sm:w-20" />
          <DraftingCompass
            className="h-7 w-7 shrink-0 text-[var(--c-9a927f)]"
            strokeWidth={1.25}
            aria-hidden
          />
          <span className="h-px w-10 bg-[var(--np-rule)] sm:w-20" />
        </div>

        <p className="np-kicker np-smallcaps mb-5 text-[var(--c-8a8071)]">
          {kicker}
        </p>

        <p className="np-body mx-auto max-w-md text-[15px] italic leading-[1.7] text-[var(--c-bcb3a3)]">
          {line1}
          {line2 && (
            <>
              {" "}
              <span className="text-[var(--c-8a8071)]">{line2}</span>
            </>
          )}
        </p>
      </div>
    </Reveal>
  );
}
