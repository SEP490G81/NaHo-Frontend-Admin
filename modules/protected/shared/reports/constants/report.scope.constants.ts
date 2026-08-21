import { ReportScope, ReportType } from "@/types/enums/report.enum";

/**
 * Bản sao phía FE của `GetReportUseCase` bên backend: loại báo cáo nào thì
 * thuộc trách nhiệm của vai trò nào.
 *
 * - `getReportsByAdmin()`          → findByReportTypeIn(SYSTEM)
 * - `getReportsByContentManager()` → findByReportTypeIn(QUESTION, COMMENT)
 *
 * Backend đã lọc sẵn theo endpoint nên FE KHÔNG dùng hằng số này để lọc dữ liệu,
 * mà chỉ để sinh danh sách chọn cho bộ lọc "loại báo cáo" của từng màn hình.
 * Khi backend đổi cách định tuyến (ví dụ đẩy thêm SPAM / HARASSMENT /
 * INAPPROPRIATE_CONTENT về content manager) thì chỉ sửa đúng file này.
 */
export const REPORT_TYPES_BY_SCOPE: Record<ReportScope, ReportType[]> = {
    [ReportScope.ADMIN]: [ReportType.SYSTEM],
    [ReportScope.CONTENT_MANAGER]: [ReportType.QUESTION, ReportType.COMMENT],
};

export function getReportTypesByScope(scope: ReportScope): ReportType[] {
    return REPORT_TYPES_BY_SCOPE[scope];
}
