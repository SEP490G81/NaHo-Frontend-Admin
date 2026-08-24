### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi muốn bạn làm component Form (có thể đặt trong một Dialog/Modal của MUI) để cập nhật thông tin sách: `UpdateBookForm` (hoặc `UpdateBookModal`).
- Form cần thiết kế đẹp, hiện đại và chứa các trường tương ứng với `UpdateBookRequest`:
  1. Khối upload ảnh bìa (`coverImageFileId`): Cho phép chọn file ảnh từ máy (preview trước khi upload). Nếu là sách cũ thì hiển thị ảnh cũ (từ `BookResponse.coverImage.url`).
  2. Tên sách (`title`): Input text (Bắt buộc nhập).
  3. Mô tả (`description`): Textarea nhiều dòng.
  4. Trình độ JLPT (`jlptLevel`): Select box (N1, N2, N3, N4, N5) (Bắt buộc).
  5. Trình độ CEFR (`cefrLevel`): Select box (A1, A2, B1, B2, C1, C2) (Bắt buộc).
- Dưới cùng có 2 nút: "Hủy" và "Lưu thay đổi".
- Nút "Lưu" có loading spinner khi đang submit API.

### Yêu cầu

- Phân tách code nhỏ gọn, < 200 dòng/file.
- Khuyến khích dùng react-hook-form để quản lý state form.
- Hiển thị thông báo lỗi (validation) màu đỏ bên dưới input nếu người dùng nhập sai.
- Tất cả các lable, placeholder, error message đều phải lấy qua `next-intl`.
