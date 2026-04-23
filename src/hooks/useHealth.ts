import { useQuery } from "@tanstack/react-query";
import { fetchHealth, HealthStatus } from "../services/api";

export default function useHealth() {
    return useQuery<HealthStatus>({
        queryKey: ["health"],
        queryFn: async () => {
            const health = await fetchHealth();

            return health;
        },
        initialData: undefined,
    })
}