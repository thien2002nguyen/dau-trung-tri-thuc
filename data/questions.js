// SỬA CÂU HỎI TẠI ĐÂY.
// type: 'abcd', 'image', 'truefalse'.
// correct: 0=A, 1=B, 2=C, 3=D với ABCD.
// true/false với câu đúng sai.

const questions = [
  {
    type: "abcd",
    question:
      "Hậu quả nghiêm trọng mà tệ tham nhũng gây ra đối với xã hội là gì?",
    options: [
      "Làm thất thoát tài sản công và suy giảm tăng trưởng kinh tế.",
      "Làm xói mòn lòng tin của nhân dân đối với Đảng, Nhà nước và pháp luật.",
      "Làm méo mó các giá trị đạo đức xã hội.",
      "Cả A, B và C đều đúng.",
    ],
    correct: 3,
  },
  {
    type: "image",
    question:
      "Câu nói dân gian nào phê phán việc dùng tiền bạc, hối lộ để làm sai lệch công lý và pháp luật?",
    image: "hinh-1.png",
    answer: "NÉN BẠC ĐÂM TOẠC TỜ GIẤY",
  },
  {
    type: "truefalse",
    question:
      "Tham nhũng là hành vi của người có chức vụ, quyền hạn đã lợi dụng chức vụ, quyền hạn đó vì vụ lợi.",
    correct: true,
  },
  {
    type: "abcd",
    question:
      "Hành vi nào dưới đây không thuộc các hành vi tham nhũng theo quy định của pháp luật?",
    options: [
      "Tham ô tài sản cơ quan, đơn vị.",
      "Nhận hối lộ khi thực hiện nhiệm vụ.",
      "Vượt đèn đỏ khi tham gia giao thông.",
      "Nhũng nhiễu vì vụ lợi khi giải quyết thủ tục.",
    ],
    correct: 2,
  },
  {
    type: "image",
    question:
      "Câu tục ngữ nào khuyên con người dù trong hoàn cảnh nghèo khó vẫn phải giữ gìn phẩm giá, sống trong sạch và không làm điều bất chính?",
    image: "hinh-2.png",
    answer: "ĐÓI CHO SẠCH RÁCH CHO THƠM",
  },
  {
    type: "abcd",
    question:
      "Hành động nào của học sinh thể hiện rõ đức tính liêm khiết, trung thực trong trường học?",
    options: [
      "Quay cóp bài kiểm tra để đạt điểm cao.",
      "Nhặt được điện thoại và nộp lại để trả người mất.",
      "Bao che khi bạn thân vi phạm nội quy.",
      "Nhờ người khác làm bài kiểm tra hộ.",
    ],
    correct: 1,
  },
  {
    type: "image",
    question:
      "Câu thành ngữ nào phê phán lòng tham quá mức, khiến con người cuối cùng phải chịu thiệt hại hoặc hậu quả do chính mình gây ra?",
    image: "hinh-3.png",
    answer: "THAM THÌ THÂM",
  },
  {
    type: "abcd",
    question:
      "Khẩu hiệu nào thể hiện rõ nhất thái độ của thanh niên học sinh đối với tham nhũng, tiêu cực?",
    options: [
      "Không nghe, không thấy, không biết.",
      "Liêm chính trong học đường, thượng tôn pháp luật trong đời sống.",
      "Thành tích là trên hết, phương pháp không quan trọng.",
      "Việc lớn của xã hội, học sinh không cần bận tâm.",
    ],
    correct: 1,
  },
  {
    type: "image",
    question:
      "Câu nói dân gian nào phê phán thói tham lam, muốn chiếm giữ tất cả, không bỏ qua bất cứ lợi ích nào dù lớn hay nhỏ?",
    image: "hinh-4.png",
    answer: "CON RÔ CŨNG TIẾC CON DIẾC CŨNG MUỐN",
  },
  {
    type: "image",
    question:
      "Câu nói dân gian nào phê phán người có lòng tham vô độ, ích kỷ, chỉ muốn giữ mọi thứ cho bản thân mà không biết chia sẻ?",
    image: "hinh-5.png",
    answer: "UỐNG NƯỚC KHÔNG CHỪA CẶN",
  },
];
