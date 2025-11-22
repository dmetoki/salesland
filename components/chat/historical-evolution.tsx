import { Fragment } from "react/jsx-runtime";
import ActualsAndTrend from "@/components/actuals-and-trend";
import TimeEvolutionMultipleMirror from "@/components/time-evolution-multiple-mirror";

type HistoricalEvolutionProps = {
  title: string,
  description: string,
  data: {
      date: string;
      volume: {
        positive: number;
        neutral: number;
        negative: number;
      };
      reach: {
        positive: number;
        neutral: number;
        negative: number;
      };
    }[];
  totals?: {
    volume: number;
    reach: number;
    engagement: number;
  }
};

export default function HistoricalEvolution({id, data}: {id: number, data: HistoricalEvolutionProps}) {
  return (
    <Fragment>
      <div key={id} className="w-full border border-border rounded-md p-4 mb-2">
        <div className="mb-4">
          <TimeEvolutionMultipleMirror
            title={"Mirror Area Chart"}
            description={"Showing total visitors for the last 3 months"}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div><ActualsAndTrend title={"Volumen Total"} description="" value={data.totals?.volume || 0} /></div>
          <div><ActualsAndTrend title={"Alcance Total"} description="" value={data.totals?.reach || 0} /></div>
          <div><ActualsAndTrend title={"Engagement Total"} description="" value={data.totals?.engagement || 0} /></div>
          <div><ActualsAndTrend title={"Unique Authors"} description="" value={data.totals?.engagement || 0} /></div>
        </div>
      </div>
    </Fragment>
  )
}