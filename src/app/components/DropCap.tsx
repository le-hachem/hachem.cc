/**
 * An ornamental initial: the first character is split off the text and set as a
 * drop cap, the way a newspaper opens a column.
 */
export function DropCap({ text }: { text: string }) {
  return (
    <>
      <span className="np-dropcap-letter">{text.charAt(0)}</span>
      {text.slice(1)}
    </>
  );
}
