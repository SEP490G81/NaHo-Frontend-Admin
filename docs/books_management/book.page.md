### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Nhiệm vụ cuối cùng của bạn là ghép tất cả các thành phần lại và tạo thành một trang hoàn chỉnh: `app/[locale]/(protected)/books/page.tsx`.
- Trang này sẽ là màn hình Quản lý Sách chính.
- Ở trên cùng có một Header hiển thị Tiêu đề "Quản lý Sách" và một nút "Import Sách" (mở hộp thoại chọn file Excel để upload).
- Ngay dưới là component `BookSearchFilter`.
- Dưới cùng là component `BookTable`.
- Khi ấn "Cập nhật" ở một hàng trong bảng, component `UpdateBookForm` (Modal) sẽ hiện lên.
- Trang này sẽ phụ trách gọi hàm `findAllBooks()` từ `book.service.ts` và truyền data xuống cho Table.

### Yêu cầu

- Tuân thủ các chuẩn trong Next.js App Router.
- Nếu file `page.tsx` chứa nhiều logic state quá (> 200 dòng), hãy tách logic ra thành custom hook `useBookManagement` (lưu ở `modules/books/hooks/`).
- Bọc toàn bộ các khối nội dung lớn trong `<ContainerBox>`.
- Đảm bảo thiết kế liền mạch, spacing, padding chuẩn xác.
