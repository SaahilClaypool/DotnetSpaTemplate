import { useQuery } from "@tanstack/react-query";
import { GatewayApi } from "../api/Api";

export const weatherQueryKey = ["weather"];

export function useWeatherQuery() {
  return useQuery({
    queryKey: weatherQueryKey,
    queryFn: async () => {
      const results = await GatewayApi.getWeatherForecast().then((x) => x.data);
      return results;
    },
  });
}
export function WeatherPage() {
  let { data } = useWeatherQuery();
  return (
    <div className="flex gap-1 flex-col">
      Weather
      {data &&
        data.map((x) => (
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{x.date?.toLocaleString()}</h2>
              <p>{x.summary} {x.temperatureF}F</p>
            </div>
          </div>
        ))}
    </div>
  );
}
