import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFilesRequest } from "../services/api";

interface UploadHookProps {
    onSuccessCallback?: (data: any) => void;
    onErrorCallback?: (error: any) => void;
}

export default function useUploadFile({ onSuccessCallback, onErrorCallback }: UploadHookProps) {

    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["uploadFile"],
        mutationFn: async (files: FileList | null) => {

            const formData = new FormData();

            if (files) {
                for (let file of files) {
                    formData.append("files", file);
                }
            }

            const response = await uploadFilesRequest(formData);

            return response;
        },
        onSuccess: (data) => {
            onSuccessCallback?.(data);
            queryClient.invalidateQueries({ queryKey: ["files"] });
        },
        onError: (error: any) => {
            onErrorCallback?.(error);
        }

    })
}