### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi muốn bạn cập nhật trang users như sau:

1. Cho phần header: `Quản lý người dùng` vào trong ContainerBox của search box
2. Phần sắp xếp theo và nút tăng dần/giảm dần thì nên để 1 một hàng với ngày sinh và 2 nhóm đó cho justify between
3. Có thêm nút reset fields và search lại, ngoài ra cũng reset được cả cái sort trong các thẻ heading của table
4. Mỗi khi đổi option trong select thì phải submit toàn bộ form (bao gồm cả searchKeyword và các fields khác)
5. Có thêm scrollbar để cuộn dọc cho dễ trong trường hợp quá nhiều elements.
6. Cho thêm sắc màu cho các action buttons
7. Xác thực email nên để thành 2 trạng thái là "chưa xác thực" và "dã xác thực" cho nó đẹp

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