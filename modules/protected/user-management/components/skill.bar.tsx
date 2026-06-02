import { LinearProgress } from "@mui/material";

interface SkillBarProps {
    label: string;
    value: number;
}

const SkillBar = ({ label, value }: SkillBarProps) => {
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-sm">
                <span>{label}</span>
                <span className="font-semibold">{value}%</span>
            </div>
            <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: "var(--color-bdc-primary)",
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: "var(--color-bgc-highlight)",
                        borderRadius: 3,
                    },
                }}
            />
        </div>
    );
};

export default SkillBar;
