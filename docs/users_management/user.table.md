### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi muốn bạn làm 1 ô search box gồm các fields như sau:

1. 1 ô input dài để nhập keyword => dùng để search email, full name, username (có 1 nút tìm kiếm bên cạnh, khi nào ấn
   thì sẽ tìm kiếm theo toàn bộ field)
2. 1 ô select option để chọn giới tính (mặc định là ALL => chuyển xuống BE là `null`), khi đổi option thì sẽ gọi API
3. 1 ô select option để chọn trạng thái của tài khoản (mặc định là ALL => chuyển xuống BE là `null`), khi đổi option thì
   sẽ gọi API
4. 1 ô select option để chọn trạng thái xác thực email (mặc định là ALL => chuyển xuống BE là `null`), khi đổi option
   thì sẽ gọi API
5. 1 ô select option để chọn ROLE của tài khoản (mặc định là ALL => chuyển xuống BE là `null`), khi đổi option thì sẽ
   gọi API
6. 1 ô input dobFrom và 1 ô input dobTo để cho phép người dùng nhập ngày sinh trong khoảng nào
7. 1 ô select option để chỉ định sort theo cột (mặc định là MẶC ĐỊNH => chuyển xuống BE là `UserSortColumn.ID`), khi đổi
   option sẽ gọi API
8. 1 nút bấm để khi ấn vào thì switch giữa tăng dần và giảm dần.

- Tôi muốn bạn làm cho tôi 1 bảng quản lí người dùng như sau:

1. Bảng gồm có các cột: STT, email, username, full name, role, is email verified và 1 cột các hành động
2. Ở cuối bảng có phân trang, sử dụng của MUI `<Pagination count={10} shape="rounded" />`, có nút ấn đề về trang đầu và
   trang cuối (có thể chỉnh số phần tử trong 1 trang trong phạm vi là [20, 100])
3. Trên heading của các cột đều có thể ấn vào để sort theo cột đó tăng dần/giảm dần trong 1 trang (sort này là thực hiện
   trên FE)
4. Cột cuối sẽ có các nút bấm như: xem chi tiết, cập nhật, khóa/mở khóa (status: ACTIVE, UNACTIVE)

### Yêu cầu

- Phân tách các module, các component, các hàm rõ ràng, dễ quản lí code, tránh code vào 1 file quá dài (> 200 dòng).
- Đặt tên các file theo cú pháp "a.b.c[đuôi file]" và nhìn vào có thể biết luôn là file đó làm cái gì.
- Mỗi 1 module sẽ có chuẩn sau:

+ components: chứa các component không gọi API
+ features: chứa các component gọi API
+ constants: chứa các hằng số để sử dụng cho module đó
+ hooks: chứa các custom hook để sử dụng cho module đó
+ types: chứa các kiểu dữ liệu UI cho module đó (không phải dto)
+ providers: chứa các wrapper component, react context...
+ utils: chứa các helper, validator,... cho module đó

- Các component to ở trong các page thì nên bọc <ContainerBox> vào để có background và border radius chung.
- Về các phần text, nội dung, hãy sử dụng next-intl như hiện tại tôi đang làm thông qua `const t = useTranslation(...)`,
  không nên truyền `t` làm tham số, chỗ nào cần thì bạn cứ khai báo ra là xong.
- Về phần style, hãy sử dụng tailwindcss và nên dùng các màu có sẵn của tôi trong file `../../styles/globals.css`
- Về phần gọi API ở backend thì phải thông qua `services`, nếu như là gọi từ phía client components thì phải gọi về
  backend của NextJS trước rồi NextJS server gọi backend thật. Nếu là gọi API từ phía server component thì có thể gọi
  trực tiếp backend thật.
- Về phần props, nếu truyền props >=3 component thì nên sử dụng react context