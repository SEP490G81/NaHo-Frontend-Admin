### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi muốn bạn làm cho tôi 2 API là:

1. `http://localhost:8386/api/v1/users/all`

- Gọi phía nextjs server và cho vào users page
- method POST
- request gồm JWT và request body `UserQueryRequest`
- Response: `ApiResponse<List<UserResponse>>`

```
{
    "meta": {
        "traceId": "e1c2a5f8-1f29-4188-a893-cd59c1987a18",
        "timestamp": "2026-08-10T17:30:29.414014500Z",
        "pageMeta": {
            "currentPage": 0,
            "pageSize": 20,
            "totalPages": 1,
            "totalElements": 10,
            "hasNext": false,
            "hasPrevious": false
        }
    },
    "message": "Lấy người dùng thành công!",
    "data": [
        {
            "id": 2,
            "role": {
                "id": 2,
                "roleName": "LEARNER",
                "description": ""
            },
            "authProviders": [],
            "avatarUrl": null,
            "userLearningProgressId": 1,
            "username": "bronzelearner1",
            "email": "bronzelearner1@naho.org",
            "fullName": "Nguyễn Đồng Anh",
            "gender": "MALE",
            "dob": "1995-01-01",
            "status": "ACTIVE"
        },
        ...
    ]
}
```

- Ở backend tôi đang xử lí là nếu có field nào `null` thì sẽ không filter theo field đó.

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