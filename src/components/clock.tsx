import { useAppSelector } from '../app/hooks';

const format = (t: Date) => t.toJSON().slice(11, 19); // cut off except hh:mm:ss

export default function Clock() {
  const lastUpdate = useAppSelector((state) => state.persist.lastUpdate);
  const light = useAppSelector((state) => state.persist.light);
  return (
    <div className={light ? 'light' : ''}>
      {format(new Date(lastUpdate))}
      <style jsx>{`
        div {
          padding: 15px;
          display: inline-block;
          color: #82fa58;
          font: 50px menlo, monaco, monospace;
          background-color: #000;
        }
        .light {
          background-color: #999;
        }
      `}</style>
    </div>
  );
}
