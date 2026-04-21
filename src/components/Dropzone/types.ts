export type IDropzoneProps = {
  uploading: boolean;
  dragging: boolean;
  setDragging: (value: boolean) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onUpload: (files: FileList | null) => void;
};
