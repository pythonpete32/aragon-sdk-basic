import { useEffect, useState } from "react";
import { DaoSortBy, IDaoQueryParams, SortDirection } from "@aragon/sdk-client";
import { useAragonSDKContext } from "../context/AragonSDK";

export default function useGetDaos(queryParams: IDaoQueryParams = {}) {
  const { client } = useAragonSDKContext();

  const [daos, setDaos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!client) return;
    console.log({ client });
    async function fetchDaos(params: IDaoQueryParams) {
      setLoading(true);
      try {
        const query: IDaoQueryParams = {
          skip: 0,
          limit: 10,
          direction: SortDirection.ASC,
          sortBy: DaoSortBy.POPULARITY,
          ...params,
        };
        const fetchedDaos = await client.methods.getDaos(query);
        setDaos(fetchedDaos);
        setLoading(false);
      } catch (error: any) {
        setError(error ?? new Error("Unknown error"));
        setLoading(false);
      }
    }

    if (client) {
      console.log("fetching daos");
      fetchDaos(queryParams);
    }
  }, [client?.methods, queryParams, client]);

  return { daos, loading, error };
}
