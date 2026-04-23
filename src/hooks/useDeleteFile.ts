import { useMutation } from "@tanstack/react-query";
import { deleteFile } from "../services/api";

export default function useDeleteFile() {
    return useMutation({
        mutationKey: ["deleteFile"],
        mutationFn: async (id: string) => {
            await deleteFile(id);
        },
    })
}