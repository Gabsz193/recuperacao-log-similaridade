import { StatusBox, StatusDot } from "../../app/styles";
import useHealth from "../../hooks/useHealth";
import { theme } from "../../theme";

export default function StatusES() {
    const { data: esStatus, isLoading } = useHealth();

    const getColor = () => {
        if (!esStatus) return theme.palette.error.main;
        if (esStatus.status === "green") return theme.palette.success.main;
        if (esStatus.status === "yellow") return theme.palette.warning.main;
        return theme.palette.error.main;
    };

    if (isLoading) return <StatusBox>Carregando status...</StatusBox>;

    if (!esStatus) return <StatusBox><StatusDot color={theme.palette.error.main} /> Elasticsearch indisponível</StatusBox>;

    return (
        <StatusBox>
            <StatusDot color={getColor()} />
            Elasticsearch
            <span>{esStatus.documents} docs</span>
        </StatusBox>
    )
}