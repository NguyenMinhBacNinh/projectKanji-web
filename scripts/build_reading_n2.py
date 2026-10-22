# -*- coding: utf-8 -*-
"""
Generator for N2 Reading Comprehension Articles (30 bài Dokkai chuẩn N2)
"""
import json

topics_n2 = [
  ("dokkai_n2_1", "「おもてなし」の神髄とホスピタリティ", "Chân giá trị tinh tế của nghệ thuật phục vụ Omotenashi", "👘",
   "「おもてなし」とは、見返りを求めず、相手の立場に立って期待以上の心地よさを先回りして提供する日本固有の心配りです。西洋の対価を伴うサービスとは異なり、主客対等な信頼関係の上に成立します。無駄を省きつつ相手の心に寄り添うこの精神は、現代のグローバルビジネスにおいても強力な無形資産となっています。",
   "Nghệ thuật Omotenashi là sự tinh tế đậm chất Nhật Bản: đón đầu và đáp ứng vượt mong đợi của khách hàng mà không màng đền đáp vụ lợi. Khác với dịch vụ mua bán phương Tây vốn đi kèm tiền thù lao, Omotenashi vận hành trên nền tảng niềm tin bình đẳng giữa chủ và khách. Tinh thần đồng cảm sâu sắc này đang trở thành tài sản vô hình quý báu trong kinh doanh toàn cầu.",
   "「おもてなし」と一般的なサービスの本質的な違いは何ですか？ (Điểm khác biệt bản chất giữa Omotenashi và dịch vụ thông thường là gì?)",
   ["高いお金を請求すること (Đòi hỏi chi phí thật đắt)", "見返りを求めず相手の立場に立った先回りの心遣い (Sự quan tâm chu đáo đón đầu tâm lý khách mà không vụ lợi đền đáp)", "規則通りにしか動かないこと (Chỉ máy móc làm theo quy định)", "客を従属させること (Bắt khách hàng phải phục tùng)"], 1,
   "Đoạn văn nêu rõ: 「見返りを求めず、相手の立場に立って期待以上の心地よさを先回りして提供する日本固有の心配りです」."),

  ("dokkai_n2_2", "金継ぎ（きんつぎ）：傷跡に宿る美", "Kintsugi: Hồi sinh vẻ đẹp từ những vết rạn vỡ", "🏺",
   "割れたり欠けたりした陶磁器を漆で接着し、金粉を蒔いて修復する「金継ぎ」は、破損を隠すのではなく新たな景色として肯定する伝統技法です。不完全さや歳月の痕跡を尊ぶ「わび・さび」の哲学が凝縮されており、挫折や傷を克服して成熟へと至る人間の生き方にも通じる深い示唆を与えてくれます。",
   "Kintsugi là kỹ thuật truyền thống dùng sơn mài gắn liền các mảnh gốm vỡ rồi rắc bột vàng lên vết nứt. Thay vì che giấu thương tổn, Kintsugi tôn vinh vết rạn như một nét duyên dáng mới của tạo vật, phản chiếu triết lý Wabi-Sabi trân quý sự bất toàn. Đây cũng là ẩn dụ sâu sắc cho ý chí con người vượt qua nghịch cảnh để trưởng thành kiên cường.",
   "「金継ぎ」という技法の根底にある思想は何ですか？ (Tư tưởng căn bản ẩn sau kỹ thuật nghệ thuật Kintsugi là gì?)",
   ["壊れた物を新品同様に隠すこと (Che giấu đồ vỡ cho giống như mới)", "傷跡を新たな美として肯定し不完全さを慈しむこと (Tôn vinh vết nứt như một vẻ đẹp mới và trân trọng sự bất toàn)", "安価に修繕すること (Sửa chữa với chi phí rẻ nhất)", "壊れた陶器を捨てること (Vứt bỏ đồ gốm đã vỡ)"], 1,
   "Bài viết khẳng định: 「破損を隠すのではなく新たな景色として肯定する伝統技法です」."),

  ("dokkai_n2_3", "生涯学習社会におけるリカレント教育", "Giáo dục hoàn lưu và tương lai thích ứng nghề nghiệp", "🎓",
   "技術革新が加速する現代において、一度社会に出た大人が大学や専門機関に戻って学び直す「リカレント教育」の重要性が叫ばれています。終身雇用制度が変容し、人生百年時代を迎える中で、既存の知識をアップデートし自らの市場価値を再構築し続ける主体的姿勢が不可欠となっています。",
   "Trước sự biến đổi vũ bão của công nghệ, giáo dục hoàn lưu Recurrent - nơi những người trưởng thành đi làm quay trở lại trường lớp cập nhật tri thức - đang trở thành chiến lược sống còn. Khi chế độ làm việc suốt đời dần thoái trào trong kỷ nguyên tuổi thọ trăm năm, năng lực tự đổi mới tri thức là chìa khóa duy trì giá trị bản thân.",
   "社会人が「リカレント教育」を受ける主な目的は何ですか？ (Mục đích cốt lõi của việc người đi làm học giáo dục hoàn lưu là gì?)",
   ["学位を自慢するため (Để khoe khoang bằng cấp)", "知識をアップデートし自身の市場価値を再構築するため (Cập nhật tri thức mới và tái cấu trúc giá trị bản thân trên thị trường)", "仕事を休む口実にするため (Để có cớ nghỉ việc ở công ty)", "学割を使うため (Để được giảm giá vé sinh viên)"], 1,
   "Trong bài có câu: 「既存の知識をアップデートし自らの市場価値を再構築し続ける主体的姿勢が不可欠となっています」."),

  ("dokkai_n2_4", "日本の「ものづくり」とカイゼン精神", "Triết lý chế tác Monozukuri và tinh thần cải tiến liên tục", "⚙️",
   "世界から高い信頼を得てきた日本の製造業の根底には、「ものづくり」に対する崇高な敬意と「カイゼン（改善）」の哲学があります。現場の作業員一人ひとりが日々の微細な無駄を洗い出し、絶え間なく工程を洗練させていくボトムアップのアプローチこそが、圧倒的な品質と安全性を支えてきました。",
   "Nền móng cho uy tín vững chắc của ngành sản xuất Nhật Bản là sự tôn kính tuyệt đối đối với 'Monozukuri' (Nghệ thuật chế tác) cùng triết lý 'Kaizen' (Cải tiến không ngừng). Chính cách tiếp cận từ dưới lên, nơi từng công nhân hiện trường chủ động tìm kiếm và loại bỏ từng chi tiết lãng phí nhỏ nhất, đã tạo nên chất lượng vượt trội.",
   "「カイゼン」の特徴として適切な記述はどれですか？ (Mô tả nào đúng nhất về bản chất của phương pháp Kaizen?)",
   ["上層部からのトップダウン命令だけに従う (Chỉ tuân thủ mệnh lệnh áp đặt từ cấp trên)", "現場の一人ひとりが微細な改善を絶え間なく積み重ねること (Từng cá nhân hiện trường kiên trì tích lũy từng cải tiến nhỏ nhất mỗi ngày)", "失敗を隠蔽すること (Che giấu các lỗi kỹ thuật)", "大規模な設備投資だけに頼ること (Chỉ dựa vào đầu tư trang thiết bị đắt tiền)"], 1,
   "Đoạn văn nêu rõ: 「現場の作業員一人ひとりが日々の微細な無駄を洗い出し、絶え間なく工程を洗練させていくボトムアップのアプローチ...」."),

  ("dokkai_n2_5", "デジタルデトックスと現代人のメンタル", "Cai nghiện kỹ thuật số tìm lại sự bình yên nội tâm", "📵",
   "常に情報過多のネットワークに接続され続ける現代人は、脳の疲労や集中力の低下に悩まされています。一定期間スマートフォンやSNSから意図的に距離を置く「デジタルデトックス」を実践することで、自然の静けさを取り戻し、自らの内面と深く向き合う健全な精神状態を取り戻すことができます。",
   "Con người hiện đại bị bủa vây liên tục bởi dòng chảy thông tin trực tuyến dày đặc, dẫn đến sự suy kiệt não bộ và giảm sút độ tập trung. Thực hành 'Cai nghiện kỹ thuật số' bằng cách chủ động tạm rời xa điện thoại và mạng xã hội trong một khoảng thời gian giúp tâm trí tìm lại sự thanh tĩnh, lắng đọng đối thoại với chính mình.",
   "「デジタルデトックス」の実践によって得られる効果は何ですか？ (Hiệu quả thu được khi thực hành cai nghiện kỹ thuật số là gì?)",
   ["フォロワーが増えること (Tăng số lượng người theo dõi trên mạng)", "脳の疲労を癒やし内面と深く向き合う精神状態の回復 (Xoa dịu mệt mỏi não bộ và phục hồi tâm thế tĩnh tại)", "スマートフォンの充電が長持ちすること (Pin điện thoại dùng lâu hết hơn)", "友人との連絡を完全に断絶すること (Cắt đứt hoàn toàn quan hệ bạn bè)"], 1,
   "Trong bài có câu: 「自然の静けさを取り戻し、自らの内面と深く向き合う健全な精神状態を取り戻すことができます」.")
]

# Generate items 6 to 30 for N2
more_n2 = [
  ("dokkai_n2_6", "都市部における空き家問題と再生事業", "Hồi sinh những căn nhà bỏ hoang Akiya thành không gian sáng tạo", "🏘️",
   "人口減少と過疎化の進展に伴い、日本全国で誰も住まなくなった「空き家」が急増しています。防災や治安の面で放置が危惧される中、古民家をモダンな宿泊施設やコワーキングスペースへとリノベーションする再生事業が、地域コミュニティを活性化させる新たな起爆剤として注目されています。",
   "Cùng đà giảm dân số, hiện tượng nhà bỏ hoang Akiya tăng nhanh đang trở thành mối lo ngại về phòng cháy và an ninh đô thị. Trước bối cảnh đó, các dự án cải tạo nhà gỗ cổ thành homestay du lịch và không gian làm việc chung Coworking sáng tạo đang thổi làn gió mới, khơi dậy sức sống cho các vùng quê.",
   "空き家再生事業の狙いは何ですか？ (Mục tiêu của các dự án hồi sinh nhà hoang Akiya là gì?)",
   ["空き家を全て取り壊すこと (Phá hủy hết tất cả nhà hoang)", "古民家を改修して宿泊施設等に活用し地域を活性化すること (Cải tạo thành khu lưu trú tiện ích nhằm hồi sinh cộng đồng địa phương)", "人口を減らすこと (Làm giảm dân số)", "地価を下げること (Hạ giá đất xuống)"], 1,
   "Đoạn văn khẳng định: 「古民家をモダンな宿泊施設やコワーキングスペースへとリノベーションする再生事業が...」."),

  ("dokkai_n2_7", "生物多様性の保全と「里山」思想", "Triết lý Satoyama: Sự cộng sinh giữa con người và muôn loài", "🌾",
   "「里山（さとやま）」とは、原生林と集落の中間に位置し、人々の農林業活動を通じて維持されてきた自然環境のことです。完全な手つかずの自然よりも、人間が適切に手入れを続けることで豊かな生物多様性が育まれるという里山モデルは、持続可能な生態系共生の知恵として国際的に高く評価されています。",
   "Khái niệm Satoyama chỉ vùng đệm tự nhiên nằm giữa rừng nguyên sinh và làng mạc, được duy trì bền vững nhờ các hoạt động canh tác nông lâm có chừng mực của con người. Mô hình này chứng minh rằng sự tương tác hài hòa, chăm sóc vừa độ của con người giúp muôn loài sinh sôi trù phú hơn cả thiên nhiên hoang dã.",
   "「里山」モデルが世界的に評価されている理由は何ですか？ (Vì sao mô hình sinh thái Satoyama được quốc tế ca ngợi?)",
   ["自然を完全に破壊するから (Vì phá hủy tự nhiên)", "人間が適切に関わることで豊かな生態系が維持される知恵だから (Vì trí tuệ con người can thiệp chừng mực giúp bảo tồn hệ sinh thái đa dạng)", "農薬を大量に撒くから (Vì dùng nhiều thuốc trừ sâu)", "観光客だけを集めるから (Vì chỉ chú trọng đón khách du lịch)"], 1,
   "Trong bài có câu: 「人間が適切に手入れを続けることで豊かな生物多様性が育まれるという里山モデル...」."),

  ("dokkai_n2_8", "テレワーク普及による働き方の多様化", "Cải cách phương thức làm việc và dịch chuyển đô thị", "💻",
   "情報通信技術の進歩により、場所を選ばないテレワークが定着しました。毎日の満員電車から解放され、地方へ移住して自然豊かな環境で子育てをしながら働くライフスタイルを選択する人が増えています。企業にとってもオフィス維持費の削減や優秀な人材の確保につながる変革です。",
   "Sự thăng hoa của hạ tầng mạng giúp phương thức làm việc từ xa Telework cắm rễ sâu vào xã hội. Thoát khỏi cảnh chen chúc tàu điện giờ cao điểm, nhiều người chuyển về các vùng nông thôn trong lành vừa nuôi dạy con cái vừa cống hiến cho công việc, giúp doanh nghiệp tinh gọn chi phí mặt bằng văn phòng đắt đỏ.",
   "テレワークの定着によって可能になった生き方は何ですか？ (Phong cách sống mới nào được mở ra nhờ làm việc từ xa?)",
   ["毎日の通勤時間を増やすこと (Tăng thêm thời gian chen chúc đi làm)", "地方移住など場所にとらわれない柔軟な働き方 (Chuyển về ngoại ô làm việc linh hoạt không bị trói buộc địa lý)", "仕事を辞めること (Bỏ việc nghỉ hẳn)", "オフィスに住み込むこと (Sống luôn tại văn phòng)"], 1,
   "Bài viết nêu rõ: 「地方へ移住して自然豊かな環境で子育てをしながら働くライフスタイルを選択する人が増えています」."),

  ("dokkai_n2_9", "日本の伝統色に見る自然観", "Thế giới quan thiên nhiên qua bảng màu Dentōshoku", "🎨",
   "日本の伝統色には、「桜色」「萌黄（もえぎ）」「藍色」「東雲（しののめ）色」など、四季の動植物や空の微妙な移ろいを捉えた豊かな名称がつけられています。原色を避け、中間色や濁色の繊細なニュアンスを愛でる感性は、自然と自己を一体のものとして捉える日本人の美意識の結晶です。",
   "Bảng màu truyền thống Nhật Bản Dentōshoku sở hữu những danh xưng thơ mộng như màu hồng cánh đào Sakurairo, xanh chồi non Moegi, chàm thẫm Aiiro hay màu mây ửng rạng đông Shinonome. Sở thích tôn vinh các gam màu trung tính nhã nhặn biểu thị sự gắn bó máu thịt, hòa làm một với mẹ thiên nhiên.",
   "日本の伝統色の命名の特徴は何ですか？ (Đặc trưng trong cách đặt tên màu sắc truyền thống Nhật là gì?)",
   ["外国語をそのまま使うこと (Dùng nguyên từ vựng tiếng nước ngoài)", "四季の動植物や空の移ろいなど自然の情景に基づいていること (Dựa trên hình bóng cỏ cây bốn mùa và sự biến chuyển của trời đất)", "数字で表すこと (Đặt tên bằng các con số)", "派手な原色だけを選ぶこと (Chỉ chuộng những màu nguyên sắc sặc sỡ)"], 1,
   "Đoạn văn nêu rõ: 「四季の動植物や空の微妙な移ろいを捉えた豊かな名称がつけられています」."),

  ("dokkai_n2_10", "シェアリングエコノミーの台頭と法整備", "Kinh tế chia sẻ: Tối ưu hóa nguồn lực và bài toán pháp lý", "🚗",
   "モノやスキル、空間を個人間で共有するシェアリングエコノミーは、遊休資産の有効活用と環境負荷の低減を両立させる新たな経済モデルです。一方で、民泊やライドシェアにおける安全性の担保や既存産業との摩擦など、時代の変化に即した法整備のあり方が鋭く問われています。",
   "Mô hình kinh tế chia sẻ (Sharing Economy), nơi các cá nhân cùng dùng chung tài sản, kỹ năng hay mặt bằng nhàn rỗi, mở ra phương thức tiêu dùng tuần hoàn giảm thiểu lãng phí tài nguyên. Dẫu vậy, bài toán đảm bảo an toàn cho dịch vụ lưu trú tư nhân và giải quyết tranh chấp với ngành kinh doanh truyền thống vẫn rất nan giải.",
   "シェアリングエコノミーが抱える課題は何ですか？ (Thách thức mà nền kinh tế chia sẻ đang đối mặt là gì?)",
   ["利用者が少なすぎること (Quá ít người sử dụng)", "安全性の担保や既存産業との摩擦に対する法整備 (Đảm bảo an toàn cho khách hàng và xây dựng khung pháp lý xử lý cạnh tranh)", "お金が一切動かないこと (Không tạo ra dòng tiền)", "インターネットが使えないこと (Không dùng được internet)"], 1,
   "Bài viết khẳng định: 「民泊やライドシェアにおける安全性の担保や既存産業との摩擦など、時代の変化に即した法整備のあり方が...」."),

  ("dokkai_n2_11", "「一期一会」の茶道精神と対人関係", "Tinh thần Ichigo Ichie: Trân quý khoảnh khắc duy nhất trong đời", "🍵",
   "茶道に由来する「一期一会（いちごいちえ）」とは、生涯に一度きりの出会いとして目の前の客をもてなす心構えを説いた言葉です。過去に戻ることも未来を保証することもできない現前の一瞬を尊び、全身全霊で相手と向き合う態度は、忙しない現代人の対人関係においても深い響きを持ちます。",
   "Bắt nguồn từ Trà đạo, triết lý 'Ichigo Ichie' nhắc nhở rằng mỗi cuộc hội ngộ giữa người với người trên cõi đời này đều là duy nhất và không bao giờ lặp lại y nguyên lần thứ hai. Thái độ dốc trọn tâm can nâng niu từng khoảnh khắc hiện tại chính là liều thuốc quý giá gắn kết các mối quan hệ thời hiện đại.",
   "「一期一会」が教えてくれる人生の教訓は何ですか？ (Bài học nhân sinh sâu sắc mà Ichigo Ichie răn dạy là gì?)",
   ["何度もやり直せばよいということ (Cứ làm lại nhiều lần cũng được)", "二度とない現在の出会いや瞬間を心から大切にすること (Trân trọng tột cùng từng cuộc gặp gỡ và khoảnh khắc hiện tại vì nó không lặp lại)", "友達をたくさん作ること (Kết bạn thật nhiều)", "過去ばかりを振り返ること (Chỉ hoài niệm về quá khứ)"], 1,
   "Trong bài có câu: 「生涯に一度きりの出会いとして目の前の客をもてなす心構えを説いた言葉です」."),

  ("dokkai_n2_12", "企業の社会的責任（CSR）とSDGs", "Trách nhiệm xã hội doanh nghiệp và cam kết phát triển bền vững", "🌱",
   "かつて企業の価値は財務諸表の利益のみで測定されていましたが、現代では環境保全や人権尊重、地域貢献といった「持続可能な開発目標（SDGs）」への取り組みが投資判断の重要基準となっています。社会的課題の解決と事業の収益性を両立させることが、企業の永続的な生存戦略です。",
   "Nếu như trước đây giá trị của một doanh nghiệp chỉ được đong đếm đơn thuần qua chỉ số lợi nhuận tài chính, thì ngày nay cam kết thực thi các mục tiêu phát triển bền vững SDGs (bảo vệ môi trường, nhân quyền, đóng góp cộng đồng) đã trở thành thước đo sống còn để thu hút nguồn vốn đầu tư có trách nhiệm.",
   "現代の企業評価において重要視されている要素は何ですか？ (Yếu tố nào được coi trọng hàng đầu trong đánh giá doanh nghiệp hiện đại?)",
   ["目先の短期的な利益だけ (Chỉ lợi nhuận ngắn hạn trước mắt)", "環境や社会問題の解決と収益性の両立（SDGs） (Sự kết hợp giữa giải quyết các vấn đề xã hội môi trường và hiệu quả kinh doanh)", "社員を休ませないこと (Không cho nhân viên nghỉ ngơi)", "税金を払わないこと (Trốn thuế)"], 1,
   "Đoạn văn nêu rõ: 「社会的課題の解決と事業の収益性を両立させることが、企業の永続的な生存戦略です」."),

  ("dokkai_n2_13", "紙の本と電子書籍の共存", "Sự cộng sinh văn hóa giữa trang sách in và sách điện tử", "📖",
   "何千冊もの本を端末一台で持ち歩ける電子書籍の普及は読書の利便性を飛躍的に高めました。一方で、紙の手触りや装丁の美しさ、ページをめくる行為そのものがもたらす情緒的体験は代替不可能であり、用途や気分に応じた読書形態の使い分けという豊かな共存関係が築かれています。",
   "Việc ra đời của sách điện tử E-book với khả năng chứa hàng ngàn đầu sách trong một thiết bị nhỏ gọn đã nâng tầm sự tiện ích đọc sách. Dẫu vậy, cảm giác sột soạt chạm vào từng trang giấy in, mùi thơm của mực và vẻ đẹp bìa sách vẫn mang lại giá trị cảm xúc bất khả thay thế, tạo nên thế giới cộng sinh phong phú.",
   "紙の本が持つ電子書籍にない価値は何ですか？ (Giá trị độc bản mà sách in sở hữu so với sách điện tử là gì?)",
   ["重くて持ち歩きにくいこと (Nặng nề khó mang theo)", "紙の手触りや装丁の美しさなど五感を通じた情緒的体験 (Trải nghiệm xúc giác và thẩm mỹ chân thực qua từng trang giấy)", "文字が拡大できないこと (Không phóng to được chữ)", "値段が常に高いこと (Giá thành luôn đắt hơn)"], 1,
   "Trong bài có câu: 「紙の手触りや装丁の美しさ、ページをめくる行為そのものがもたらす情緒的体験は代替不可能であり...」."),

  ("dokkai_n2_14", "観光公害（オーバーツーリズム）の克服", "Giải bài toán quá tải du lịch và bảo tồn đời sống cư dân", "🧳",
   "訪日観光客の急増は経済効果をもたらす反面、特定の観光地における交通機関の混雑や騒音、ゴミ投棄といった「観光公害」を引き起こしています。観光客の分散誘致やマナー周知の徹底、地元住民の静穏な生活環境を守る持続可能な観光モデルの構築が急務となっています。",
   "Sự bùng nổ du khách quốc tế mang lại nguồn thu ngoại tệ dồi dào nhưng đồng thời gây nên vấn nạn quá tải du lịch Overtourism: kẹt xe, ô nhiễm tiếng ồn và rác thải tại các điểm danh thắng. Phân tán dòng khách về các vùng ngoại vi và giữ gìn môi trường sống yên bình cho cư dân bản địa là mục tiêu khẩn cấp.",
   "観光公害（オーバーツーリズム）の解決策として挙げられているものはどれですか？ (Giải pháp khắc phục quá tải du lịch được đề cập là gì?)",
   ["観光客の受け入れを完全拒否すること (Từ chối đón toàn bộ khách du lịch)", "観光客の分散誘致や持続可能な観光モデルの構築 (Điều phối phân bổ dòng khách và xây dựng mô hình du lịch bền vững)", "観光地の入場料を十倍にすること (Tăng giá vé lên gấp 10 lần)", "道路を全て通行止めにすること (Cấm toàn bộ đường giao thông)"], 1,
   "Đoạn văn nêu rõ: 「観光客の分散誘致やマナー周知の徹底、地元住民の静穏な生活環境を守る持続可能な観光モデルの構築が急務...」."),

  ("dokkai_n2_15", "クリエイティブ思考と失敗の許容", "Tư duy đổi mới sáng tạo và lòng bao dung trước thất bại", "💡",
   "前例踏襲を美徳とする同調圧力の高い環境では、真のイノベーションは生まれません。創造的なアイデアを生み出す組織には、試行錯誤の過程で生じる失敗を学習の機会として肯定的に捉える「心理的安全性」の確保が不可欠です。失敗を恐れぬ挑戦こそがブレイクスルーの母胎となります。",
   "Trong một môi trường nặng tính rập khuôn và áp lực phải giống số đông, những đột phá đích thực không bao giờ có thể nảy mầm. Để ấp ủ những ý tưởng đổi mới sáng tạo, tổ chức cần đảm bảo 'an toàn tâm lý', nơi thất bại được nhìn nhận tích cực như những bài học kinh nghiệm để tiến bước xa hơn.",
   "イノベーションを生み出す組織に必要な条件は何ですか？ (Điều kiện thiết yếu để một tổ chức sản sinh đổi mới sáng tạo là gì?)",
   ["前例を絶対に守ること (Bảo thủ giữ nguyên tiền lệ cũ)", "失敗を学習の機会として肯定する心理的安全性の確保 (Tạo dựng môi trường an toàn tâm lý coi thất bại là cơ hội học hỏi)", "失敗した人を厳しく罰すること (Trừng phạt nghiêm khắc người làm sai)", "新しい試みを禁止すること (Cấm mọi thử nghiệm mới)"], 1,
   "Bài viết nêu rõ: 「試行錯誤の過程で生じる失敗を学習の機会として肯定的に捉える『心理的安全性』の確保が不可欠です」."),

  ("dokkai_n2_16", "日本刀に込められた美意識と鉄の技術", "Kiếm Nhật Nihonto: Đỉnh cao nghệ thuật luyện kim và tinh thần", "🗡️",
   "日本刀は武器としての実用性と美術品としての美しさを奇跡的に兼ね備えています。「たたら製鉄」によって生み出された玉鋼（たまはがね）を幾重にも折り返して鍛錬することで、硬さと柔軟性という相反する性質を両立させました。刀身に浮かぶ波紋のような「刃文」は唯一無二の芸術です。",
   "Thanh kiếm Nhật Nihonto là sự kết hợp kỳ diệu giữa công năng chiến đấu và vẻ đẹp mỹ thuật điêu khắc siêu phàm. Kỹ nghệ trui rèn gấp thép Tamahagane hàng vạn lần giúp lưỡi kiếm đạt đến cảnh giới vừa cứng rắn sắc bén vừa dẻo dai không gãy. Đường vân gợn sóng Hamon trên thân kiếm là tác phẩm nghệ thuật độc bản.",
   "日本刀が硬さと柔軟性を両立させている秘密は何ですか？ (Bí quyết giúp kiếm Nhật vừa cứng vừa dẻo dai là gì?)",
   ["玉鋼を幾重にも折り返して鍛錬する技術 (Kỹ thuật gấp nung thép Tamahagane nhiều lớp công phu)", "プラスチックを混ぜているから (Pha trộn nhựa dẻo)", "機械で一瞬で作るから (Đúc dập hàng loạt bằng máy)", "木材を芯に入れているから (Bọc lõi gỗ bên trong)"], 0,
   "Đoạn văn nêu rõ: 「玉鋼を幾重にも折り返して鍛錬することで、硬さと柔軟性という相反する性質を両立させました」."),

  ("dokkai_n2_17", "フードテックと代替肉の将来性", "Công nghệ thực phẩm Food-tech và tương lai đạm thực vật", "🌱",
   "地球温暖化や人口増加に伴うタンパク質危機への打開策として、植物由来の大豆ミートや培養肉といった「フードテック」が脚光を浴びています。従来の畜産に比べて温室効果ガスの排出や水資源の消費を劇的に抑えられるため、倫理的かつ持続可能な食の選択肢として定着しつつあります。",
   "Trước nguy cơ thiếu hụt nguồn đạm do biến đổi khí hậu và bùng nổ dân số, công nghệ thực phẩm Food-tech với các sản phẩm thịt thực vật từ đậu nành và thịt nuôi cấy tế bào đang trở thành xu hướng toàn cầu, giúp cắt giảm lượng khí thải nhà kính và tiết kiệm nước ngọt so với chăn nuôi gia súc truyền thống.",
   "代替肉が環境保護につながる理由は何ですか？ (Vì sao thịt thực vật lại góp phần bảo vệ môi trường?)",
   ["畜産に比べて温室効果ガス排出や水消費を抑えられるから (Vì giảm phát thải khí nhà kính và tiết kiệm tài nguyên nước so với chăn nuôi)", "森林を伐採して作るから (Vì phá rừng làm đất)", "肉を食べなくさせるから (Vì cấm ăn thịt)", "プラスチックで作るから (Vì làm bằng nhựa)"], 0,
   "Bài viết nêu rõ: 「従来の畜産に比べて温室効果ガスの排出や水資源の消費を劇的に抑えられるため...」."),

  ("dokkai_n2_18", "「間（ま）」の美学：建築と絵画", "Mỹ học khoảng trống Ma: Khoảng lặng làm nên chiều sâu nghệ thuật", "🖼️",
   "日本美術や建築における「間（ま）」とは、何もない余白や沈黙そのものに豊かな意味を見出す概念です。水墨画の広大な余白は見る者の想像力を刺激し、和室の障子越しの光の陰影は静寂を際立たせます。満たすことではなく引くことによって本質を際立たせる至高の感性です。",
   "Khái niệm 'Ma' trong hội họa và kiến trúc Nhật Bản chỉ khoảng trống, sự tĩnh lặng vô ngôn hàm chứa tầng tầng ý nghĩa sâu xa. Khoảng giấy trắng mênh mông trong tranh thủy mặc khơi dậy trí tưởng tượng của người thưởng lãm, tôn vinh nghệ thuật buông bỏ để làm bừng sáng bản chất cốt lõi của sự vật.",
   "「間」の美学の根底にある考え方はどれですか？ (Tư tưởng nền tảng của mỹ học khoảng trống 'Ma' là gì?)",
   ["画面全体を隙間なく絵の具で埋め尽くすこと (Tô vẽ kín mít không chừa một khe hở)", "何もない余白や沈黙に豊かな意味を見出すこと (Tìm kiếm ý nghĩa sâu thẳm trong khoảng trống và sự tĩnh lặng)", "騒がしい音楽を鳴らすこと (Bật nhạc ồn ào)", "建物をできるだけ高く建てること (Xây nhà càng cao càng tốt)"], 1,
   "Đoạn văn định nghĩa: 「何もない余白や沈黙そのものに豊かな意味を見出す概念です」."),

  ("dokkai_n2_19", "少子化対策と次世代支援の課題", "Ứng phó khủng hoảng sinh đẻ và hỗ trợ thế hệ tương lai", "👶",
   "日本の少子化は経済成長の鈍化や社会保障費の逼迫をもたらす国家的危機です。単なる一時的な給付金支給にとどまらず、保育サービスの拡充や男性の育児休業取得の義務化、若年層の雇用安定など、子育てと仕事を不安なく両立できる構造的な社会変革が求められています。",
   "Tỷ lệ sinh suy giảm tại Nhật Bản đang dẫn tới sự thu hẹp quy mô kinh tế và đè nặng lên quỹ phúc lợi an sinh xã hội. Vấn đề không chỉ đơn giản là chi trả trợ cấp bằng tiền, mà đòi hỏi sự đổi mới cơ cấu đồng bộ: mở rộng nhà trẻ, tạo điều kiện cho nam giới nghỉ chăm con và ổn định việc làm cho người trẻ.",
   "真の少子化対策として必要とされていることは何ですか？ (Yêu cầu thiết thực của chính sách đối phó giảm tỷ lệ sinh là gì?)",
   ["一時的な給付金だけ配ること (Chỉ phát tiền trợ cấp một lần)", "仕事と子育てを両立できる構造的な社会変革 (Cải cách cơ cấu xã hội giúp cân bằng nuôi dạy con và công việc)", "女性に仕事を辞めさせること (Bắt phụ nữ thôi việc)", "教育費を値上げすること (Tăng học phí trường học)"], 1,
   "Trong bài viết có câu: 「子育てと仕事を不安なく両立できる構造的な社会変革が求められています」."),

  ("dokkai_n2_20", "伝統芸能の継承と現代的イノベーション", "Kế thừa tinh hoa di sản và khát vọng đổi mới đương đại", "🪕",
   "歌舞伎や能といった古典芸能が数百年にわたり命脈を保ってきたのは、単に古い型を守り続けたからではありません。現代のテクノロジー（プロジェクションマッピングなど）や人気アニメとのコラボレーションなど、時代精神を取り込みながら変容を遂げてきた柔軟性にこそ真因があります。",
   "Nghệ thuật cổ điển Kabuki hay Noh lưu truyền được sức sống bền bỉ qua hàng trăm năm không chỉ vì sự bảo thủ giữ khuôn vàng thước ngọc. Bí quyết nằm ở sự cởi mở hòa quyện công nghệ trình chiếu ánh sáng 3D hiện đại và phối hợp cùng cốt truyện Anime đương đại, thổi sinh khí mới vào cốt cách dân tộc.",
   "古典芸能が長く存続してきた本当の理由は何ですか？ (Nguyên nhân đích thực giúp nghệ thuật cổ điển trường tồn là gì?)",
   ["一切の変化を拒絶してきたから (Vì cự tuyệt mọi thay đổi)", "時代精神や先端技術を取り入れながら柔軟に変容してきたから (Vì uyển chuyển tiếp thu công nghệ và tinh thần thời đại)", "政府が全てを運営しているから (Vì chính phủ bao cấp toàn bộ)", "観客を入れないから (Vì không cho khán giả vào xem)"], 1,
   "Đoạn văn nêu rõ: 「時代精神を取り込みながら変容を遂げてきた柔軟性にこそ真因があります」."),

  ("dokkai_n2_21", "循環型社会の構築とゼロ・ウェイスト", "Xã hội tuần hoàn và mô hình không rác thải Zero-Waste", "🔄",
   "資源を採掘し、消費して廃棄する一方通行のリニア経済から、製品の回収・修理・再利用を前提とした「サーキュラーエコノミー（循環経済）」への転換が急務です。徳島県上勝町のように町全体でゴミのゼロ化（ゼロ・ウェイスト）を宣言し、四十五種類の徹底分別を行う先進例は国際的な模範となっています。",
   "Sự chuyển dịch từ nền kinh tế tuyến tính vứt bỏ sang mô hình kinh tế tuần hoàn (Circular Economy) đang diễn ra mạnh mẽ. Thị trấn Kamikatsu thuộc tỉnh Tokushima đã trở thành tấm gương sáng toàn cầu khi tiên phong tuyên bố chính sách Zero-Waste, phân loại rác thải thành 45 hạng mục chi tiết để tái chế triệt để.",
   "循環型社会（サーキュラーエコノミー）の本質は何ですか？ (Bản chất của nền kinh tế tuần hoàn là gì?)",
   ["大量に作って使い捨てること (Sản xuất ồ ạt dùng một lần rồi vứt)", "資源の回収や再利用により廃棄物を極限までゼロに近づけること (Thu hồi và tái sinh tài nguyên hướng tới không rác thải)", "外国にゴミを輸出すること (Xuất khẩu rác sang nước khác)", "工場を全て閉鎖すること (Đóng cửa toàn bộ nhà máy)"], 1,
   "Bài viết nêu rõ: 「製品の回収・修理・再利用を前提とした『サーキュラーエコノミー（循環経済）』への転換が急務です」."),

  ("dokkai_n2_22", "日本企業の「終身雇用」変容とキャリア自律", "Thoái trào của chế độ làm việc suốt đời và tự chủ sự nghiệp", "🏢",
   "かつて日本型雇用の象徴であった「終身雇用」や「年功序列」は、グローバル競争の激化により見直しを迫られています。定年まで一社に忠誠を尽くす時代は終わり、自らのスキルを磨いて主体的にキャリアを切り開く「キャリア自律」が、ビジネスパーソンに強く求められています。",
   "Chế độ làm việc suốt đời Shushin Koyo và thâm niên lên lương Nenkojoretsu vốn là trụ cột của văn hóa doanh nghiệp Nhật Bản đang dần bị thay thế trước sức ép cạnh tranh toàn cầu. Thời kỳ cống hiến trọn đời cho một công ty đã qua, nhường chỗ cho tinh thần tự chủ phát triển năng lực cá nhân để đón đầu cơ hội mới.",
   "現代のビジネスパーソンに求められている姿勢は何ですか？ (Phẩm chất đòi hỏi ở người đi làm thời đại mới là gì?)",
   ["定年まで一社に頼り続けること (Ỷ lại vào một công ty đến lúc về hưu)", "主体的にスキルを磨きキャリアを形成する自律の姿勢 (Chủ động rèn giũa kỹ năng và định hướng sự nghiệp tự chủ)", "同僚の邪魔をすること (Gây cản trở đồng nghiệp)", "指示されるまで何もしないこと (Không làm gì cho đến khi bị nhắc nhở)"], 1,
   "Trong bài có câu: 「自らのスキルを磨いて主体的にキャリアを切り開く『キャリア自律』が、ビジネスパーソンに強く求められています」."),

  ("dokkai_n2_23", "禅（Zen）思想とマインドフルネスの潮流", "Thiền định Zen và trào lưu Chánh niệm trong nhịp sống số", "🧘",
   "仏教の禅宗が育んできた「今、この瞬間に集中する」という思想は、シリコンバレーのIT企業などを通じて「マインドフルネス瞑想」として世界的に再評価されました。雑念を手放し、呼吸を整えて自己を見つめ直す時間は、過剰な情報ストレスにさらされた現代人のオアシスとなっています。",
   "Tư tưởng cốt lõi của thiền Zen 'Tập trung trọn vẹn vào khoảnh khắc thực tại' đã được thung lũng Silicon đón nhận và lan tỏa thành trào lưu Chánh niệm (Mindfulness) toàn cầu. Dành vài phút tĩnh tâm theo dõi hơi thở buông bỏ tạp niệm là ốc đảo bình yên giúp chữa lành những áp lực thông tin thời đại số.",
   "マインドフルネス瞑想の核心にある考え方は何ですか？ (Ý niệm cốt lõi của thiền chánh niệm là gì?)",
   ["過去を悔やみ続けること (Day dứt dằn vặt về quá khứ)", "今、この瞬間の呼吸や自己の状態に意識を集中すること (Tập trung toàn vẹn tâm trí vào hơi thở và thực tại đang diễn ra)", "未来を心配すること (Lo âu thái quá về tương lai)", "眠り続けること (Ngủ gục)"], 1,
   "Đoạn văn nêu rõ: 「『今、この瞬間に集中する』という思想は...マインドフルネス瞑想として世界的に再評価されました」."),

  ("dokkai_n2_24", "音声認識技術の進化とバリアフリー社会", "Tiến bộ nhận diện giọng nói và xã hội không rào cản", "🎙️",
   "深層学習（ディープラーニング）によるAI音声認識技術の飛躍的進化は、聴覚障害者向けのリアルタイム字幕表示や高齢者の声による家電操作など、社会のバリアフリー化を力強く牽引しています。身体的制約を超えて誰もが等しく情報にアクセスできる包摂的な社会の実現が近づいています。",
   "Bước nhảy vọt của trí tuệ nhân tạo học sâu trong nhận diện giọng nói đang tạo nên những kỳ tích nhân văn: hiển thị phụ đề thời gian thực cho người khiếm thính và điều khiển thiết bị gia dụng bằng giọng nói cho người già, đưa xã hội tiến gần tới một tương lai không rào cản nơi mọi người bình đẳng tiếp cận thông tin.",
   "音声認識技術の進化がもたらす社会的メリットは何ですか？ (Lợi ích xã hội của công nghệ nhận diện giọng nói là gì?)",
   ["機械の操作を難しくすること (Làm máy móc khó dùng hơn)", "情報アクセスのバリアフリー化と包摂的な社会の実現 (Xóa bỏ rào cản tiếp cận thông tin và xây dựng xã hội hòa nhập)", "文字を読めなくさせること (Làm người ta quên mặt chữ)", "騒音を増やすこと (Gây thêm tiếng ồn)"], 1,
   "Bài viết nêu rõ: 「身体的制約を超えて誰もが等しく情報にアクセスできる包摂的な社会の実現が近づいています」."),

  ("dokkai_n2_25", "伝統織物：西陣織の精密技術と存続", "Nghệ thuật dệt lụa gấm Nishijin-ori lộng lẫy", "🧵",
   "京都が誇る「西陣織（にしじんおり）」は、多彩な色糸を用いて精緻な文様を織り上げる日本最高峰の紋織物です。二十以上の専門工程をそれぞれの職人が分業で受け持ち、極上の着物や帯に仕立てられます。後継者不足という課題に直面しつつも、インテリアや海外ブランドとの協業で新たな活路を開いています。",
   "Nishijin-ori là đỉnh cao nghệ thuật dệt lụa gấm tại Kyoto, nơi các sợi tơ màu được đan cài công phu tạo nên những họa tiết sống động tựa tranh vẽ. Trải qua hơn 20 công đoạn chuyên biệt do các nghệ nhân đảm nhiệm, Nishijin-ori ngày nay đang hợp tác với các thương hiệu thời trang quốc tế để duy trì sức sống di sản.",
   "西陣織が現代で挑戦している新たな取り組みは何ですか？ (Hướng đi đổi mới của làng nghề dệt Nishijin-ori hiện nay là gì?)",
   ["着物作りを完全にやめること (Từ bỏ hẳn việc dệt kimono)", "インテリア分野や海外ブランドとの協業による活路開拓 (Hợp tác thiết kế nội thất và bắt tay với các thương hiệu thời trang quốc tế)", "手作業を全て機械化すること (Tự động hóa hoàn toàn)", "色糸を使わないこと (Không dùng chỉ màu nữa)"], 1,
   "Đoạn văn nêu rõ: 「インテリアや海外ブランドとの協業で新たな活路を開いています」."),

  ("dokkai_n2_26", "ソーシャルメディアにおける情報リテラシー", "Năng lực thẩm định thông tin trong kỷ nguyên mạng xã hội", "📱",
   "誰もが瞬時に情報の発信者となれるSNS社会は、民主的な言論空間を広げた一方で、フェイクニュースの拡散や誹謗中傷の深刻化をもたらしました。一次情報の出所を確認し、感情的な言説に流されず批判的思考（クリティカルシンキング）を保つ「情報リテラシー」が現代人の必修教養です。",
   "Thời đại mạng xã hội trao quyền cho bất kỳ ai cũng có thể trở thành người phát tin tức, mở rộng không gian tự do ngôn luận nhưng cũng dung dưỡng tin giả và bạo lực mạng. Năng lực kiểm chứng nguồn tin gốc và giữ vững tư duy phản biện sáng suốt là phẩm chất văn hóa cốt lõi của công dân số.",
   "情報リテラシーにおいて最も重要とされる態度は何ですか？ (Thái độ quan trọng nhất của năng lực thẩm định thông tin là gì?)",
   ["流れてきた情報をすぐに拡散すること (Lập tức chia sẻ ngay thông tin vừa đọc)", "一次情報の出所を確認し批判的思考で吟味すること (Kiểm chứng nguồn tin gốc và thẩm định bằng tư duy phản biện)", "全てのニュースを信じること (Tin sái cổ mọi tin tức)", "インターネットを絶対に見ないこと (Tuyệt đối không lên mạng)"], 1,
   "Trong bài có câu: 「一次情報の出所を確認し、感情的な言説に流されず批判的思考を保つ『情報リテラシー』が現代人の必修教養です」."),

  ("dokkai_n2_27", "浮世絵が西洋印象派に与えた衝撃", "Sức ảnh hưởng kỳ diệu của tranh khắc gỗ Ukiyo-e tới hội họa phương Tây", "🎨",
   "十九世紀後半、ヨーロッパに巻き起こった「ジャポニスム（日本趣味）」の火付け役となったのが浮世絵版画です。遠近法に縛られない大胆な構図や鮮やかな色彩、輪郭線の強調は、モネやゴッホといった印象派の巨匠たちに革命的なインスピレーションを与え、近代美術の扉を開きました。",
   "Vào nửa cuối thế kỷ 19, làn sóng hâm mộ văn hóa Nhật Bản 'Japonisme' bùng nổ tại châu Âu với tâm điểm là tranh khắc gỗ Ukiyo-e. Bố cục phá cách không lệ thuộc luật phối cảnh, đường viền dứt khoát và mảng màu phẳng tươi sáng đã truyền cảm hứng làm thay đổi tư duy nghệ thuật của danh họa Monet và Van Gogh.",
   "浮世絵が西洋の画家たちに与えた影響は何ですか？ (Ảnh hưởng của tranh Ukiyo-e đối với các họa sĩ phương Tây là gì?)",
   ["油絵を描くのをやめさせたこと (Khiến họ bỏ vẽ sơn dầu)", "大胆な構図や輪郭線の強調など表現の革新を促したこと (Thúc đẩy cách tân bố cục táo bạo và nghệ thuật biểu đạt đường nét)", "西洋画を模倣させたこと (Bắt họ sao chép hội họa phương Tây)", "写真だけを撮るようにさせたこと (Bắt họ chỉ chụp ảnh)"], 1,
   "Bài viết khẳng định: 「遠近法に縛られない大胆な構図や鮮やかな色彩、輪郭線の強調は...革命的なインスピレーションを与え...」."),

  ("dokkai_n2_28", "マイクロプラスチック汚染と海洋保護", "Hiểm họa vi nhựa đại dương và trách nhiệm của loài người", "🌊",
   "海に流出したプラスチックゴミが紫外線や波によって細かく砕けた「マイクロプラスチック（五ミリ以下）」は、有害物質を吸着しやすい性質を持ちます。これを海洋生物が誤飲し、食物連鎖を通じて人間の体内にも取り込まれる危険性が指摘されており、国際的な規制の強化が進んでいます。",
   "Các mảnh rác thải nhựa trôi ra biển bị sóng gió và tia cực tím bào mòn thành các hạt vi nhựa Microplastic (dưới 5mm) có đặc tính hút các chất độc hại. Sinh vật biển ăn phải các hạt này và qua chuỗi thức ăn sẽ tích tụ vào cơ thể con người, gióng lên hồi chuông báo động về một cuộc khủng hoảng sinh thái toàn cầu.",
   "マイクロプラスチックの深刻な問題点は何ですか？ (Vấn đề nguy hiểm của hạt vi nhựa đại dương là gì?)",
   ["大きすぎて船の邪魔になること (Quá to làm cản trở tàu bè)", "有害物質を吸着し食物連鎖を通じて生態系や人体に影響を与えること (Hút chất độc hại và qua chuỗi thức ăn xâm nhập sinh vật và con người)", "海の水を温かくすること (Làm nước biển ấm lên)", "魚を巨大化させること (Làm cá khổng lồ hóa)"], 1,
   "Đoạn văn nêu rõ: 「有害物質を吸着しやすい性質を持ち...食物連鎖を通じて人間の体内にも取り込まれる危険性...」."),

  ("dokkai_n2_29", "「わび・さび」に見る不完全の美学", "Mỹ học Wabi-Sabi: Trân trọng sự phai tàn và không toàn vẹn", "🍂",
   "「わび（侘）」は質素で控えめな静けさの中に充足を見出す心であり、「さび（寂）」は歳月を経て風化した姿に宿る古びた味わいを指します。完全無欠の均整ではなく、苔むした石や歪んだ茶碗に見られる自然の無常や欠如を愛でるこの感性は、現代のミニマリズムの源流でもあります。",
   "Wabi là cảm xúc bình an tĩnh tại tìm thấy trong sự mộc mạc thanh bần; Sabi là vẻ đẹp đượm màu thời gian phong trần phủ rêu phong. Không tôn sùng sự hoàn mỹ nhân tạo cứng nhắc, Wabi-Sabi trân quý nét mộc tự nhiên của chén trà méo mó hay tảng đá rêu phong, phản chiếu dòng chảy vô thường của đời sống.",
   "「わび・さび」の美意識が重んじるものは何ですか？ (Mỹ học Wabi-Sabi tôn vinh điều gì?)",
   ["人工的で完璧な左右対称の美 (Vẻ đẹp đối xứng nhân tạo hoàn hảo)", "質素さや歳月の風化、不完全さの中に宿る自然の美 (Vẻ đẹp tự nhiên trong sự thanh bần, phong hóa của thời gian và bất toàn)", "金ピカで豪華な装飾 (Trang trí dát vàng lộng lẫy)", "永遠に変わらない機械の美 (Vẻ đẹp máy móc bất biến)"], 1,
   "Trong bài có câu: 「完全無欠の均整ではなく、苔むした石や歪んだ茶碗に見られる自然の無常や欠如を愛でるこの感性...」."),

  ("dokkai_n2_30", "人間拡張技術（サイボーグ）と倫理的課題", "Công nghệ nâng cấp thể xác con người và những lằn ranh đạo đức", "🦾",
   "義肢のロボット化や脳と機械を直接つなぐBMI（ブレイン・マシン・インターフェース）など、身体機能を飛躍的に拡張する技術の実用化が進んでいます。障害の克服に希望をもたらす一方、能力格差による新たな不平等の誕生や「人間とは何か」という根源的な倫理的問いを突きつけています。",
   "Sự thăng hoa của chi giả robot thông minh và giao diện não - máy tính BMI giúp khuếch đại vượt bậc thể lực và trí lực của con người. Mặc dù mở ra hy vọng to lớn cho người khuyết tật, công nghệ này cũng dấy lên những trăn trở đạo đức về khoảng cách giàu nghèo năng lực và ranh giới đích thực của con người.",
   "人間拡張技術（サイボーグ技術）がもたらす倫理的課題は何ですか？ (Thách thức đạo đức do công nghệ nâng cấp con người đặt ra là gì?)",
   ["機械が安すぎること (Máy móc quá rẻ)", "能力格差による新たな不平等や「人間とは何か」という問い (Sự bất bình đẳng về năng lực thể chất và câu hỏi căn bản về bản chất con người)", "病院がなくなること (Bệnh viện biến mất)", "全員が全く同じ人間になること (Mọi người trở nên giống hệt nhau)"], 1,
   "Đoạn văn khẳng định: 「能力格差による新たな不平等の誕生や『人間とは何か』という根源的な倫理的問いを突きつけています」.")
]

all_n2 = []
for art in topics_n2 + more_n2:
    item = {
        "id": art[0],
        "level": "N2",
        "title": art[1],
        "subtitle": art[2],
        "coverIcon": art[3],
        "content": [
            {
                "segments": [
                    {"text": s + ("。" if not s.endswith("。") else "")} for s in art[4].split("。") if s.strip()
                ]
            }
        ],
        "translationVn": art[5],
        "quiz": {
            "question": art[6],
            "options": art[7],
            "correct": art[8],
            "explanation": art[9]
        }
    }
    all_n2.append(item)

print(f"Total N2 articles: {len(all_n2)}")
with open("/Users/huyhoang190607gmail.com/web kanji nhật/projectKanji-web/lib/readingDataN2.js", "w", encoding="utf-8") as f:
    f.write("// Dữ liệu Luyện Đọc hiểu Dokkai JLPT N2 (30 bài chuẩn)\n\n")
    f.write("export const READING_N2 = " + json.dumps(all_n2, ensure_ascii=False, indent=2) + ";\n")
