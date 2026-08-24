### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi muốn bạn sửa lại giao diện `modules/protected/admin/users/components/user.details.modal.tsx`
- Phần chi tiết người dùng tôi chỉ muốn hiện các thông tin sau:

+ Thông tin tài khoản gồm:Avatar, Full name, email, role, status (ACTIVE, UNACTIVE), Gender, trạng thái xác thực email,
  dob.
+ Tiến trình học tập gồm: mức rank hiện tại, số điểm hiện tại, streak hiện tại.

- Có 1 nút close để đóng modal ở góc trên bên phải, bỏ nút `đóng`
- Tạo 1 component avatar của user để dùng chung cho toàn bộ dự án như sau:

+ Nếu avatarUrl và avatarUrl trong authProviders đều rỗng thì lấy chữ cái đầu full name của người dùng làm avatar.
+ Nếu avatarUrl không rỗng thì lấy avatarUrl làm avatar của người dùng.
+ Nếu avatarUrl rỗng và avatarUrl trong authProviders khác rỗng thì lấy avatarUrl trong authProviders làm avatar của
  người dùng.

- Sửa lại style của nút `nâng cấp gói` trong `modules/protected/admin/users/components/user.table.row.tsx` sao cho đồng
  bộ với nút `xem chi tiết` và nút `khóa tài khoản`
- Ở các heading của table, thêm các mũi tên lên xuống hình tam giác để biết được đang được sort theo hướng nào của từng
  cột.

### Yêu cầu

- Phân tách các module, các component, các hàm rõ ràng, dễ quản lí code, tránh code vào 1 file quá dài (1 file phải ít
  hơn 200 dòng).
- Đặt tên các file theo cú pháp "a.b.c[đuôi file]" và nhìn vào có thể biết luôn là file đó làm cái gì.
- Mỗi 1 module sẽ có chuẩn sau:

+ components: chứa các component không gọi API
+ features: chứa các component có tương tác, gọi tới API
+ constants: chứa các hằng số để sử dụng cho module đó
+ hooks: chứa các custom hook để sử dụng cho module đó
+ types: chứa các kiểu dữ liệu UI cho module đó (không phải dto)
+ providers: chứa các wrapper component, react context...
+ utils: chứa các helper, validator,... cho module đó

- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`,
  không nên truyền `t` làm tham số, chỗ nào cần thì bạn cứ khai báo ra là xong.
- Về phần style, hãy sử dụng tailwindcss và các component có sẵn của MUI và nên dùng các màu có sẵn của tôi trong file
  `styles/globals.css`
- Về phần gọi API ở backend thì phải thông qua `services`, nếu như là gọi từ phía client components thì phải gọi về
  backend của NextJS trước rồi NextJS server gọi backend thật. Nếu là gọi API từ phía server component thì có thể gọi
  trực tiếp backend thật.
- Về phần props, nếu truyền props >=3 component thì nên sử dụng react context. Các props mà chỉ đọc thì phải để thành
  `Readonly`