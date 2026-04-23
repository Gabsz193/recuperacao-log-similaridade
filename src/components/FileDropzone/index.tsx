import { useState } from "react";
import useUploadFile from "../../hooks/useUploadFile";
import { Dropzone } from "../Dropzone";
import { UploadMessageBox } from "../../app/styles";

export default function FileDropzone() {

    const [uploadMsg, setUploadMsg] = useState<{ type: "ok" | "err"; text: string }>();


    const { mutate: uploadFiles, isPending } = useUploadFile({
        onSuccessCallback: (data) => {
            setUploadMsg({ type: "ok", text: `Upload de ${data.files.length} arquivo(s) concluído com sucesso!` });
        },
        onErrorCallback: (error) => {
            setUploadMsg({ type: "err", text: `Erro ao fazer upload: ${error.message}` });
        }
    });
    const [dragging, setDragging] = useState(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        uploadFiles(e.dataTransfer.files);
    };

    return (
        <>
            {uploadMsg && (
                <UploadMessageBox type={uploadMsg.type}>
                    {uploadMsg.text}
                </UploadMessageBox>
            )}

            <Dropzone
                uploading={isPending}
                dragging={dragging}
                setDragging={setDragging}
                onDrop={handleDrop}
                onUpload={uploadFiles}
            />
        </>

    )
}