### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi muốn bạn tạo các interface/type cho Typescript để quản lý Sách (Book) dựa trên JSON mẫu dưới đây.
- Hãy tạo file `types/responses/book.response.ts` và `types/requests/book.request.ts`.
- File `types/responses/book.response.ts` sẽ chứa `BookResponse`.
- File `types/requests/book.request.ts` sẽ chứa `UpdateBookRequest` và `BookQueryRequest` (nếu cần phân trang/filter).

JSON mẫu của `BookResponse` (từ API GET /api/v1/books):
```json
{
  "id": 1,
  "title": "Mina no Nihongo",
  "description": "Sách học tiếng Nhật cơ bản",
  "jlptLevel": "N5",
  "cefrLevel": "A1",
  "orderIndex": 1.0,
  "firstNodeGlobalOrderIndex": 1.0,
  "lastNodeGlobalOrderIndex": 10.0,
  "coverImage": {
    "id": 123,
    "url": "https://example.com/image.jpg",
    "name": "mina.jpg"
  }
}
```

JSON mẫu của `UpdateBookRequest`:
```json
{
  "coverImageFileId": 123,
  "title": "Mina no Nihongo Tập 1",
  "description": "Sửa lại mô tả",
  "jlptLevel": "N5",
  "cefrLevel": "A1"
}
```

### Yêu cầu

- Đặt tên các file theo cú pháp "a.b.c[đuôi file]".
- Các properties chỉ đọc thì phải để thành `readonly`.
