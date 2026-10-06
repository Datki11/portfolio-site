/** Deterministic positions keep the server and client markup identical. */
export default function StarField() {
  return (
    <div className="depth-starfield" aria-hidden="true">
      {Array.from({ length: 52 }, (_, index) => {
        const prominent = index % 9 === 0;
        return (
          <span
            key={index}
            className="depth-star"
            style={{
              left: `${(index * 37 + 5) % 100}%`,
              top: `${(index * 23 + 7) % 97}%`,
              width: prominent ? 5 : 2 + (index % 3),
              height: prominent ? 5 : 2 + (index % 3),
              opacity: prominent ? 0.75 : 0.22 + (index % 4) * 0.13,
            }}
          />
        );
      })}
    </div>
  );
}
