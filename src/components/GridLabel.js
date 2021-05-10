import { useState, useEffect } from 'react';

const GridLabel = ({ range: { start, end }, row }) => {
  const [label, setLabel] = useState([]);
  useEffect(() => {
    setLabel([...Array(end - start).keys()].map((n) => n + start + 1));
  }, [start, end]);

  return label.map((n, indx) => {
    const classList = indx === 0 ? 'label first' : 'label';
    return (
      <div
        key={indx}
        className={classList}
        style={{
          gridRow: `${row}`,
        }}
      >
        {n}
      </div>
    );
  });
};

export default GridLabel;
