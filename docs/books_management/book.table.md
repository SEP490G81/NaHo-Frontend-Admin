### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi muốn bạn làm 1 component bảng để quản lý sách: `BookTable`
- Bảng gồm có các cột: STT, Ảnh bìa (coverImage), Tên sách (title), Mô tả (description), JLPT Level, CEFR Level, và cột Hành động.
- Ở cuối bảng có phân trang `<Pagination>` của MUI.
- Component này phải sử dụng type `BookResponse` làm data.
- Phía trên bảng, tạo 1 component `BookSearchFilter` gồm:
  1. 1 ô input dài để nhập keyword tìm kiếm theo tên sách.
  2. 1 ô select option để chọn JLPT Level (ALL, N1, N2, N3, N4, N5).
  3. 1 ô select option để chọn CEFR Level (ALL, A1, A2, B1, B2, C1, C2).
- Cột hành động sẽ có các nút như: Xem chi tiết, Cập nhật thông tin.

### Yêu cầu

- Phân tách các module, các component, các hàm rõ ràng, dễ quản lí code, tránh code vào 1 file quá dài (> 200 dòng).
- Bọc component bảng trong `<ContainerBox>` để có background và border radius chung.
- Về các phần text, nội dung, hãy sử dụng `next-intl` thông qua `const t = useTranslation(...)`.
- Style bằng tailwindcss và các component có sẵn của MUI.
- Props mà chỉ đọc thì phải để thành `Readonly`.
