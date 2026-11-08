import ConceptLab from "./concept-lab";

/** `<Lab id="…" />` in MDX: an interactive lab spanning the full page width. */
export default function LabEmbed({ id }: { id: string }) {
  return (
    <div className="wide my-10 first:mt-0">
      <ConceptLab slug={id} />
    </div>
  );
}
