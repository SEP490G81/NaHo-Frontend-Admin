### Bạn là ai?

- Bạn là 1 designer với 20 năm kinh nghiệm làm việc trong lĩnh vực thiết kế giao diện website.
- Tool sở trưởng của bạn là Next.JS, MUI, và Tailwindcss.
- Bạn đã làm việc cho các tập đoàn lớn và dành được giải thưởng lớn trong các cuộc thi thiết kế.

### Mô tả bài toán

- Tôi muốn bạn làm cho tôi chức năng xem chi tiết 1 người dùng như sau:

1. Sử dụng lại `UserResponse`  để hiển thị toàn bộ thuộc tính của người dùng trong 1 modal
2. Khi ấn vào xem chi tiết phải gọi thêm Api backend: `http://localhost:8386/api/v1/user-learning-progresses/{userId}`,
   method Get

- Request sẽ phải gửi kèm JWT token
- Response sẽ trả ra dạng JSON có kiểu dữ liệu và dạng JSON như sau:

```
public record UserLearningProgressResponse(
        Long id,
        Long farthestAvailableNodeId,
        Double farthestAvailableNodeGlobalOrderIndex,
        Long lastLearningNodeId,
        Double lastLearningNodeGlobalOrderIndex,
        Instant lastLearningAt,
        Integer currentStreak,
        Integer longestStreak,
        Double totalPoint,
        LeaderboardUserResponse leaderboardUser
) {
}

public record LeaderboardUserResponse(
        Long id,
        Long leagueId,
        Integer rank,
        String fullName,
        String avatarUrl,
        List<String> authAvatarUrl,
        Double totalPoint
) {
}

```

```
{
    "meta": {
        "traceId": "9700ceb4-8b4a-4b1e-9dc2-d1659638ffee",
        "timestamp": "2026-08-11T14:50:33.751301Z",
        "pageMeta": null
    },
    "message": "Lấy tiến trình học tập của người dùng thành công!",
    "data": {
        "id": 100,
        "farthestAvailableNodeId": 1,
        "farthestAvailableNodeGlobalOrderIndex": 1.0,
        "lastLearningNodeId": null,
        "lastLearningNodeGlobalOrderIndex": null,
        "lastLearningAt": null,
        "currentStreak": 0,
        "longestStreak": 0,
        "totalPoint": 5950.0,
        "leaderboardUser": {
            "id": 101,
            "leagueId": 10,
            "rank": 1,
            "fullName": "Bùi Cương Sơn",
            "avatarUrl": null,
            "authAvatarUrl": [],
            "totalPoint": 5950.0
        }
    }
}
```

- Trường hợp không có thì bạn không cần hiển thị, có message để admin biết là người này chưa học là được.

3. Nếu trong `types/responses` chưa có các kiểu dữ liệu trả về như trên thì hãy tạo thêm các kiểu dữ liệu response mới.

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