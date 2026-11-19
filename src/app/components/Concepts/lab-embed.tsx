import ConceptLab from "./concept-lab";
import TrackInteraction from "../Layout/track-interaction";

/** `<Lab id="…" />` in MDX: an interactive lab spanning the full page width. */
export default function LabEmbed({ id }: { id: string }) {
  return (
    <TrackInteraction event="lab_used" params={{ lab: id }} className="wide my-10 first:mt-0">
      <ConceptLab slug={id} />
    </TrackInteraction>
  );
}
