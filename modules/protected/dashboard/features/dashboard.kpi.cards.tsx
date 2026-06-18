"use client";
import React from "react";
import { useTranslations } from "next-intl";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { DashboardKpis } from "@/types/responses/dashboard.response";
import DashboardStatCard from "../components/dashboard.stat.card";

const DashboardKpiCards = ({ kpis }: { kpis: DashboardKpis }) => {
    const t = useTranslations("dashboard.kpi");
    const caption = t("vsPrevious");

    const cards = [
        {
            label: t("totalUsers"),
            value: kpis.totalUsers,
            deltaPct: kpis.totalUsersDeltaPct,
            icon: <GroupOutlinedIcon sx={{ fontSize: 20 }} />,
            iconClassName: "bg-sky-100 text-sky-600",
        },
        {
            label: t("activeLearners"),
            value: kpis.activeLearners,
            deltaPct: kpis.activeLearnersDeltaPct,
            icon: <RecordVoiceOverOutlinedIcon sx={{ fontSize: 20 }} />,
            iconClassName: "bg-emerald-100 text-emerald-600",
        },
        {
            label: t("teachers"),
            value: kpis.teachers,
            deltaPct: kpis.teachersDeltaPct,
            icon: <SchoolOutlinedIcon sx={{ fontSize: 20 }} />,
            iconClassName: "bg-violet-100 text-violet-600",
        },
        {
            label: t("newUsersThisWeek"),
            value: kpis.newUsersThisWeek,
            deltaPct: kpis.newUsersDeltaPct,
            icon: <PersonAddAltOutlinedIcon sx={{ fontSize: 20 }} />,
            iconClassName: "bg-amber-100 text-amber-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
                <DashboardStatCard
                    key={card.label}
                    label={card.label}
                    value={card.value}
                    deltaPct={card.deltaPct}
                    deltaCaption={caption}
                    icon={card.icon}
                    iconClassName={card.iconClassName}
                />
            ))}
        </div>
    );
};

export default DashboardKpiCards;
