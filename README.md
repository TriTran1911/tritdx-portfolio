# Portfolio — tritdx.io.vn

Trang cá nhân của Tri Tran Dao Xuan. React 19 + Vite + Tailwind v4 + GSAP.
Nội dung bằng tiếng Anh; ghi chú trong code bằng tiếng Việt.

## Chạy

```bash
npm install
npm run dev        # http://localhost:5180
npm run build      # ra dist/
```

Sửa nội dung: **chỉ sửa `src/lib/data.ts`**. Giao diện không chứa chữ nào của CV,
nên đổi việc làm hay thêm dự án không phải đụng vào JSX.

## Đưa lên tritdx.io.vn

Domain đã trỏ về Cloudflare, nên đường ít ma sát nhất là Cloudflare Pages:

1. Đẩy repo này lên GitHub.
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → nối repo.
3. Build command `npm run build`, output directory `dist`.
4. Sau khi deploy: tab **Custom domains** → thêm `tritdx.io.vn` và `www.tritdx.io.vn`.
   Cloudflare tự tạo bản ghi DNS, không phải thêm tay.

**Đừng host trên máy cá nhân** như api·log. Công cụ nội bộ chỉ cần sống trong giờ
làm; portfolio thì nhà tuyển dụng có thể mở lúc nửa đêm — máy ngủ là họ thấy trang lỗi.

Giữ mọi tên ở **một cấp** subdomain: chứng chỉ SSL miễn phí của Cloudflare không
phủ `a.b.tritdx.io.vn`.

## Nguyên tắc chuyển động

Người thích animation thì dễ làm quá tay. Bốn quy tắc tự đặt ra:

**1. Chỉ ghim một lần.** Đúng một mục được `pin` — sơ đồ luồng api·log. Ghim nhiều
là đánh nhau với cảm giác cuộn tự nhiên của trình duyệt, và trên điện thoại thì tệ.

**2. Chuyển động phải giải thích điều gì đó.** Gói tin chạy app → proxy → backend rồi
rơi xuống thành dòng log: xem xong là hiểu api·log làm gì, không cần đọc đoạn văn nào.
Chuyển động chỉ để đẹp thì bỏ.

**3. Không animate `width`/`height`.** Hàng dự án mở ra bằng `grid-template-rows: 0fr → 1fr`;
gạch chân hover bằng `scaleX`; vùng sáng theo con trỏ bằng biến CSS. Không có gì buộc
trình duyệt tính lại layout mỗi frame.

**4. Tách chữ theo ký tự chỉ cho tiêu đề.** `SplitText` sinh một thẻ cho mỗi ký tự —
dùng cho cả đoạn văn là phình DOM và làm khó trình đọc màn hình. Chỉ dùng cho tên,
và `split.revert()` khi unmount.

Mọi animation đi qua `motionSafe()` trong `src/lib/motion.ts`. Ai bật *giảm chuyển động*
trong hệ điều hành sẽ nhận **trạng thái cuối ngay lập tức**, không phải bản chạy nhanh hơn.

`index.html` có khối `<noscript>` ép hiện lại toàn bộ nội dung: `gsap.from()` đặt
`opacity: 0` ngay lập tức, nên JS lỗi tải là trang trắng vĩnh viễn — với portfolio thì
đó là mất trắng, và bộ thu thập dữ liệu cũng không đọc được.

Bản dev mở `window.__gsap` để gỡ lỗi (`__gsap.globalTimeline.getChildren().forEach(t => t.progress(1))`
để nhảy tới trạng thái cuối). Bản build không có — Vite loại bỏ theo `import.meta.env.DEV`.

## Thiết kế

| | |
|---|---|
| Nền | `#0C0D0F` graphite, không phải đen tuyệt đối |
| Chữ | `#EDEAE3` bone — trắng ngà ấm, không phải trắng tinh |
| Nhấn | `#C9A961` brass — **màu có sắc duy nhất** trên trang |
| Cảnh báo | `#D2694A` rust, chỉ dùng cho mã lỗi trong sơ đồ |

Mọi màu chữ đã đo tương phản với nền và đạt WCAG AA: muted 6.8:1, faint 4.86:1,
brass 8.64:1, bone 16.2:1, rust 5.43:1. Hai màu trong bản đầu không đạt
(faint 3.0:1, rust 4.34:1) nên đã đổi.
| Tiêu đề | Instrument Serif |
| Thân | Inter Tight |
| Dữ liệu | JetBrains Mono |

Chọn serif cho tiêu đề là một quyết định có chủ đích: portfolio developer gần như
luôn dùng grotesque hoặc mono. Serif trên nền graphite với nhấn đồng thau đọc ra
"biên tập" chứ không phải "terminal", và tránh được ba lối mòn quen thuộc — kem +
serif + đất nung, đen + xanh neon, và gradient tím sang xanh.

Có một lớp hạt nhiễu mỏng (`.grain`, opacity 3.5%) phủ toàn trang: vùng tối lớn trên
màn OLED mà phẳng tuyệt đối thì trông như màn hình chết.

## Nguồn trang trí, asset và animation

Tất cả đều miễn phí dùng thương mại. Kiểm lại giấy phép trước khi dùng thứ gì mới —
điều khoản có thể đổi.

**Chuyển động**
- [GSAP](https://gsap.com/docs/v3/) — từ bản 3.13 mọi plugin (SplitText, ScrollTrigger, Flip,
  MorphSVG, DrawSVG…) đã miễn phí cả cho dự án thương mại. Trang này dùng SplitText + ScrollTrigger.
- [Motion](https://motion.dev) (trước là Framer Motion) — nhẹ hơn cho animation gắn với state React.
  Bạn đã dùng ở dự án Honda.
- [LottieFiles](https://lottiefiles.com) — animation vector dạng JSON, có bộ miễn phí lớn.
- [Rive](https://rive.app) — animation tương tác, nặng đô hơn Lottie.
- [Easings.net](https://easings.net) — tra đường cong easing, dán được thẳng vào CSS/GSAP.

**Hoạ tiết và nền**
- [Haikei](https://haikei.app) — sinh nền SVG (sóng, blob, lưới, hạt), tải về dùng tự do.
- [Hero Patterns](https://heropatterns.com) — hoạ tiết SVG lặp, đổi màu và độ mờ ngay trên trang.
- [Transparent Textures](https://transparenttextures.com) — texture nền dạng tile, có cả hạt nhiễu.
- [SVG Backgrounds](https://svgbackgrounds.com) — nền có tham số, một phần miễn phí.
- [Shape Divider](https://shapedivider.app) — đường chia mục dạng SVG.

**Biểu tượng**
- [Lucide](https://lucide.dev) — bộ icon dùng trong api·log. Nét mảnh, đồng đều, ISC.
- [Phosphor](https://phosphoricons.com) — sáu độ dày, MIT.
- [Heroicons](https://heroicons.com) — của nhóm Tailwind, MIT.
- Đừng dùng emoji làm icon. Mỗi hệ điều hành vẽ một kiểu, và trình đọc màn hình
  đọc thành câu vô nghĩa.

**Chữ**
- [Google Fonts](https://fonts.google.com) — cả ba font ở đây đều từ đây, miễn phí.
- [Fontshare](https://fontshare.com) — font chất lượng cao miễn phí thương mại
  (Satoshi, General Sans…), khác hẳn tệp font quen thuộc trên Google Fonts.

**Ảnh và minh hoạ**
- [unDraw](https://undraw.co) — minh hoạ đổi được màu chủ đạo, miễn phí không cần ghi nguồn.
- [Unsplash](https://unsplash.com) / [Pexels](https://pexels.com) — ảnh thật.
  Cẩn thận: ảnh stock trên portfolio dev thường làm loãng, không làm mạnh.

**Kiểm chất lượng**
- [Realtime Colors](https://realtimecolors.com) — thử bảng màu trên một trang thật.
- [APCA contrast](https://apcacontrast.com) — kiểm tương phản, chính xác hơn WCAG 2 với nền tối.
