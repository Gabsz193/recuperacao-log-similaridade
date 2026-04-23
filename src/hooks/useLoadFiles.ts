import { useQuery } from "@tanstack/react-query";
import { fetchFiles, FileData } from "../services/api";

export default function useLoadFiles() {
    return useQuery<FileData[]>({
        queryKey: ["files"],
        queryFn: async () => {
            const { files } = await fetchFiles();            

            return files || [];
        },
        initialData: [],
    })
}