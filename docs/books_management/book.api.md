### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Dựa vào các type đã tạo (như `BookResponse`, `UpdateBookRequest`), hãy tạo file `services/client/book.service.ts` để gọi API.
- Các API cần gọi (sử dụng fetch, trả về `Promise` và bọc lỗi trong `ApiError` giống hệ thống hiện tại):
  1. `GET /api/v1/books` - Trả về danh sách sách (ApiResponse<List<BookResponse>>).
  2. `GET /api/v1/books/{bookId}` - Trả về chi tiết sách.
  3. `PUT /api/v1/books/{bookId}` - Cập nhật sách, nhận vào `UpdateBookRequest`.
  4. `POST /api/v1/books/import` - Upload file excel (multipart/form-data) để import dữ liệu sách.

### Yêu cầu

- Phân tách các hàm rõ ràng.
- Đảm bảo header `Content-Type` chuẩn xác (lưu ý multipart/form-data không được set cứng Content-Type mà để fetch tự sinh boundary).
- Nếu API trả lỗi (response không ok) thì phải catch và throw `ApiError`.
- Tuân thủ format như file `user.service.ts` đã có.
