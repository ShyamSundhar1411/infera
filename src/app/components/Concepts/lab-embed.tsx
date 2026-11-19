import ConceptLab from "./concept-lab";
import TrackInteraction from "../Layout/track-interaction";
import EmbedButton from "./embed-button";
import { getLab } from "@/lib/data/labs.data";

/** `<Lab id="…" />` in MDX: an interactive lab spanning the full page width. */
export default function LabEmbed({ id }: { id: string }) {
  return (
    <div className="wide my-10 first:mt-0">
      <TrackInteraction event="lab_used" params={{ lab: id }}>
        <ConceptLab slug={id} />
      </TrackInteraction>
      <EmbedButton id={id} title={getLab(id)?.title ?? id} />
    </div>
  );
}
