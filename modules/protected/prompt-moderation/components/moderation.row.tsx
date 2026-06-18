"use client";
import { TableCell, TableRow, Button } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useRouter } from "@/i18n/navigation";
import { CustomQuestionResponse } from "@/types/responses/custom.question.response";
import ModerationStatusBadge from "./moderation.status.badge";
import { formatSubmittedDate, getInitials } from "../utils/moderation.format";

interface ModerationRowProps {
    question: CustomQuestionResponse;
    viewLabel: string;
}

const ModerationRow = ({ question, viewLabel }: ModerationRowProps) => {
    const router = useRouter();
    const goDetail = () =>
        router.push(`/content-manager/prompt-moderation/${question.id}`);

    return (
        <TableRow
            hover
            onClick={goDetail}
            sx={{ cursor: "pointer", verticalAlign: "top" }}
        >
            <TableCell>
                <div className="flex items-center gap-3">
                    <span className="bg-bgc-highlight text-text-contrast flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                        {getInitials(question.submitterName)}
                    </span>
                    <div className="min-w-0">
                        <p className="font-medium">{question.submitterName}</p>
                        <p className="text-text-muted text-xs">
                            {question.submitterEmail}
                        </p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <p className="line-clamp-2 max-w-80 font-medium">
                    {question.japaneseQuestion}
                </p>
                <p className="text-text-muted line-clamp-1 max-w-80 text-xs">
                    {question.japaneseQuestionMarkup}
                </p>
            </TableCell>
            <TableCell>
                <p className="text-text-muted line-clamp-2 max-w-72 text-sm">
                    {question.contextualHint || "—"}
                </p>
            </TableCell>
            <TableCell className="whitespace-nowrap">
                {formatSubmittedDate(question.submittedAt)}
            </TableCell>
            <TableCell>
                <ModerationStatusBadge status={question.status} />
            </TableCell>
            <TableCell>
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<VisibilityOutlinedIcon fontSize="small" />}
                    onClick={(e) => {
                        e.stopPropagation();
                        goDetail();
                    }}
                    sx={{
                        whiteSpace: "nowrap",
                        color: "text.primary",
                        borderColor: "var(--color-bdc-muted)",
                    }}
                >
                    {viewLabel}
                </Button>
            </TableCell>
        </TableRow>
    );
};

export default ModerationRow;
