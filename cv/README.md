# Nguồn CV

`cv.html` là bản dựng ra `public/tri-tran-cv.pdf`. Sửa nội dung ở đây rồi
dựng lại — đừng sửa thẳng file PDF.

Số liệu và mô tả dự án lấy đúng từ `src/lib/data.ts`, để trang web và CV
không nói khác nhau. Sửa một bên thì sửa cả hai.

Dựng lại:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-sandbox --virtual-time-budget=8000 \
  --no-pdf-header-footer \
  --print-to-pdf="public/tri-tran-cv.pdf" \
  "file://$PWD/cv/cv.html"
```

Cần `--no-pdf-header-footer`, không thì Chrome in thêm ngày giờ, đường dẫn
file:// và số trang lên đầu và chân mỗi trang.

Font hiển thị nạp từ `../public/fonts/`, font thân bài nạp từ Google Fonts
nên lúc dựng phải có mạng.
