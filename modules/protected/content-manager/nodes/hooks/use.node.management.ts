import { useQuery } from "@tanstack/react-query";
import { findObjectiveDetail } from "@/services/client/objective.service";
import { useMemo } from "react";

export const useNodeManagement = (objectiveId: number) => {
    // Fetch nodes by fetching objective detail
    const {
        data: objectiveDetailResponse,
        isLoading: isFetchingNodes,
        refetch: refetchNodes,
    } = useQuery({
        queryKey: ["nodes", objectiveId],
        queryFn: () => findObjectiveDetail(objectiveId),
        enabled: !!objectiveId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const nodes = useMemo(() => objectiveDetailResponse?.data?.learningPathNodes || [], [objectiveDetailResponse]);

    return {
        nodes,
        isFetchingNodes,
        refetchNodes,
    };
};
