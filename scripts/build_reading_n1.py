# -*- coding: utf-8 -*-
"""
Generator for N1 Reading Comprehension Articles (30 bài Dokkai chuẩn N1 cao cấp)
"""
import json

topics_n1 = [
  ("dokkai_n1_1", "言語相対性仮説と日本語の思考様式", "Giả thuyết tương đối ngôn ngữ và mô thức tư duy người Nhật", "🧠",
   "サピア・ウォーフの仮説が示唆するように、私たちが操る母語の文法構造や語彙体系は、世界を分節化し認識する思考の枠組みそのものを無意識のうちに規定している。主語の明示を義務づけない日本語の構文は、自己と客体を厳格に二分する近代西洋的自我とは一線を画し、文脈や状況との未分化な一体感を重視する認識論的基盤を形成してきた。",
   "Như giả thuyết Sapir-Whorf chỉ ra, cấu trúc ngữ pháp và hệ thống từ vựng của tiếng mẹ đẻ chi phối sâu sắc cách con người phân định và nhận thức thế giới. Cú pháp tiếng Nhật không bắt buộc minh định chủ ngữ đã tạo nên một thế giới quan khác biệt với cái tôi nhị nguyên phương Tây, hướng tới sự hòa quyện tâm thức trọn vẹn vào ngữ cảnh hiện sinh.",
   "日本語の文法構造がもたらした認識論的特徴は何ですか？ (Đặc trưng nhận thức luận do cấu trúc ngữ pháp tiếng Nhật kiến tạo là gì?)",
   ["自己と客体を厳格に対立させること (Đối lập nhị nguyên gay gắt giữa chủ thể và khách thể)", "主客を二分せず文脈や状況との一体感を重んじること (Không chia cắt chủ khách mà đề cao sự hòa quyện vào ngữ cảnh)", "論理的思考を完全に排除すること (Loại bỏ tư duy logic)", "外国語を理解できなくすること (Không hiểu được tiếng nước ngoài)"], 1,
   "Đoạn văn nêu rõ: 「自己と客体を厳格に二分する近代西洋的自我とは一線を画し、文脈や状況との未分化な一体感を重視する認識論的基盤を形成してきた」."),

  ("dokkai_n1_2", "伝統と断絶：近代日本文学の自我葛藤", "Xung đột bản ngã trong văn học Nhật Bản cận hiện đại", "📜",
   "夏目漱石や森鴎外に代表される近代日本文学の巨擘たちが苦闘したのは、急激な西洋化に伴う「近代的自我の確立」と「伝統的倫理観の崩壊」という実存的亀裂であった。輸入された個人の自由や合理主義は、共同体的な連帯感を解体し、孤独に苛まれる近代的知識人の悲劇的な疎外状況を生み出したのである。",
   "Thế hệ văn hào tiền phong như Natsume Soseki và Mori Ogai đã vật lộn dữ dội trước vết nứt hiện sinh giữa làn sóng Tây hóa: sự xác lập cái tôi bản ngã cá nhân đối chọi với sự tan rã của luân lý truyền thống. Chủ nghĩa duy lý và tự do du nhập đã phá vỡ mối dây liên kết cộng đồng, đẩy người trí thức vào bi kịch cô đơn tha hóa.",
   "近代日本文学の作家たちが直面した実存的葛藤は何ですか？ (Xung đột hiện sinh mà các nhà văn cận hiện đại Nhật Bản đối mặt là gì?)",
   ["経済的な困窮だけ (Chỉ có sự túng thiếu tiền tài)", "近代的自我の確立と共同体的伝統の崩壊による孤独と疎外 (Sự cô đơn tha hóa giữa xác lập cái tôi và sự sụp đổ của truyền thống cộng đồng)", "出版社の検閲 (Sự kiểm duyệt của nhà xuất bản)", "原稿料の安さ (Nhuận bút thấp)"], 1,
   "Bài viết nêu rõ: 「『近代的自我の確立』と『伝統的倫理観の崩壊』という実存的亀裂であった...孤独に苛まれる近代的知識人の悲劇的な疎外状況を生み出した」."),

  ("dokkai_n1_3", "技術文明における「身体性」の回復", "Phục hồi tính thân nghiệm trước sự tha hóa công nghệ", "🚶",
   "デジタル空間への没入と身体動作のバーチャル化が進む情報化社会において、生身の肉体を通じた「身体知（身体感覚）」の退行が危惧されている。自然の質感に触れ、五感を総動員して世界と摩擦を起こす生々しい身体の復権こそが、記号消費に埋没した人間の実存を再び大地に繋ぎ止める契機となる。",
   "Trong kỷ nguyên số nơi con người đắm chìm vào không gian ảo, sự suy kiệt của 'Tri thức cơ thể' (cảm nhận trực tiếp qua da thịt) đang trở thành một khủng hoảng lớn. Việc phục hồi sự hiện diện của thân thể sinh học - dùng cả ngũ quan để chạm vào thiên nhiên và cọ xát với thực tại - là cơ hội duy nhất kéo con người ra khỏi sự tha hóa.",
   "記号消費社会において人間の実存を取り戻すために不可欠なことは何ですか？ (Điều kiện thiết yếu để phục hồi bản ngã con người trước xã hội số là gì?)",
   ["スマートフォンの利用時間を倍増させること (Tăng gấp đôi thời gian dùng điện thoại)", "五感を総動員して世界と触れ合う生々しい「身体性」の復権 (Khôi phục tính thân nghiệm đích thực, dùng ngũ quan kết nối với thế giới)", "仮想空間（メタバース）に定住すること (Sống vĩnh viễn trong thế giới ảo)", "肉体を機械に置き換えること (Thay thế thân xác bằng máy móc)"], 1,
   "Đoạn văn nêu rõ: 「五感を総動員して世界と摩擦を起こす生々しい身体の復権こそが...実存を再び大地に繋ぎ止める契機となる」."),

  ("dokkai_n1_4", "幽玄とモノのあわれ：日本美学の深層", "Ugen thâm viễn và Mono no Aware: Chiều sâu mỹ cảm Nhật Bản", "🌌",
   "「モノのあわれ」が眼前の移ろいゆく現象への深い情緒的共感であるならば、「幽玄（ゆうげん）」は言葉の彼方に潜む余情や不可知の深奥を指し示す。表層の美を削ぎ落とした先にかすかに立ち現れる無言の気配を捉える感性は、有限なる人間の生を永遠なる宇宙の運行へと接続する形而上学的営為であった。",
   "Nếu như 'Mono no Aware' là niềm rung cảm xót thương trước tính biến dịch vô thường của vạn vật trần thế, thì 'Ugen' lại mở ra cõi thâm viễn u huyền nằm bên kia bờ ngôn ngữ. Năng lực chiêm nghiệm sự hiện diện vô ngôn qua những nét mộc tinh giản tối đa chính là hành trình kết nối kiếp người hữu hạn với vũ trụ bao la.",
   "「幽玄」という美学的概念が指し示す本質は何ですか？ (Bản chất mà khái niệm mỹ học Ugen chỉ định là gì?)",
   ["派手で目に見える装飾 (Sự trang hoàng sặc sỡ đập vào mắt)", "言葉の彼方に潜む余情や不可知の深奥 (Dư ba cảm xúc ẩn giấu bên kia ngôn từ và chiều sâu huyền bí)", "科学的に証明可能な事実 (Sự thật có thể chứng minh bằng khoa học)", "単なる悲しみ (Nỗi buồn phiền đơn thuần)"], 1,
   "Trong bài có câu: 「『幽玄』は言葉の彼方に潜む余情や不可知の深奥を指し示す」."),

  ("dokkai_n1_5", "資本主義の限界と定常経済の地平", "Giới hạn của chủ nghĩa tư bản và viễn cảnh kinh tế trạng thái dừng", "🌐",
   "地球環境の有限性を度外視して無限の量的拡大を宿命づけられた近代資本主義は、気候危機や格差拡大という不可逆的な破綻に直面している。物質的富の盲目的な追求から脱却し、自然の再生速度の範囲内で質的充足と富の公正な再分配を目指す「定常型経済」へのパラダイムシフトが問われている。",
   "Chủ nghĩa tư bản với mệnh lệnh tăng trưởng số lượng vô hạn bất chấp tính hữu hạn của tài nguyên Trái Đất đang đứng trước bờ vực khủng hoảng sinh thái và bất bình đẳng cùng cực. Một bước chuyển dịch hệ hình sang 'Nền kinh tế trạng thái dừng' (Steady-state economy) - nơi con người mưu cầu sự viên mãn về chất lượng - là lối thoát duy nhất.",
   "近代資本主義が直面している本質的限界は何ですか？ (Giới hạn bản chất mà chủ nghĩa tư bản hiện đại đang đối mặt là gì?)",
   ["地球環境の有限性と無限の量的拡大の矛盾 (Mâu thuẫn giữa tính hữu hạn của Trái Đất và mục tiêu tăng trưởng vô hạn)", "工場が足りないこと (Thiếu thốn nhà máy)", "お金が余りすぎること (Thừa thãi quá nhiều tiền)", "技術の進歩が止まったこと (Công nghệ ngừng tiến bộ)"], 0,
   "Bài viết khẳng định: 「地球環境の有限性を度外視して無限の量的拡大を宿命づけられた近代資本主義は...不可逆的な破綻に直面している」.")
]

# Generate items 6 to 30 for N1
more_n1 = [
  ("dokkai_n1_6", "言語の多義性と翻訳不可能性の壁", "Tính đa nghĩa của ngôn từ và biên cương của dịch thuật", "📚",
   "異なる文化圏の言語間において、一対一の完全な等価性を保った翻訳は幻想に過ぎない。言葉はその民族の歴史的記憶や風土の陰影を内包した「文化的沈殿物」であり、ある言語のニュアンスを他言語へ移し替える作業は、常にこぼれ落ちる「翻訳不可能性」の残余との格闘である。",
   "Việc tìm kiếm một bản dịch đối ứng tương đương 100% giữa hai hệ ngôn ngữ khác biệt văn hóa thực chất chỉ là ảo tưởng. Ngôn từ là 'trầm tích văn hóa' mang trong lòng nó bóng hình lịch sử và linh hồn thổ nhưỡng. Dịch thuật đích thực là cuộc vật lộn không ngừng trước phần dư ba bất khả dịch không thể chuyển giao trọn vẹn.",
   "完全な翻訳が困難である根本的な理由は何ですか？ (Lý do căn bản khiến việc chuyển ngữ tuyệt đối là bất khả thi là gì?)",
   ["辞書が薄いから (Vì từ điển quá mỏng)", "言葉が民族の歴史や風土を内包した文化的沈殿物であるから (Vì ngôn từ là trầm tích văn hóa chứa đựng chiều sâu lịch sử thổ nhưỡng)", "翻訳者の文法力が足りないから (Vì dịch giả kém ngữ pháp)", "外国語が多すぎるから (Vì có quá nhiều ngoại ngữ)"], 1,
   "Đoạn văn khẳng định: 「言葉はその民族の歴史的記憶や風土の陰影を内包した『文化的沈殿物』であり...」."),

  ("dokkai_n1_7", "人工知能の台頭と主観的体験の謎", "Trí tuệ nhân tạo và bức màn bí ẩn của ý thức chủ quan", "🤖",
   "大規模言語モデルが高度な推論を模倣する現代において、哲学的ゾンビの議論が現実味を帯びてきた。構文論的な情報処理の精度がいかに神域に達しようとも、痛みや赤さを生々しく実感する「クオリア（主観的質感）」の発生機序は依然として未解明であり、心脳問題の核心を構成している。",
   "Khi các mô hình ngôn ngữ lớn phô diễn năng lực suy luận siêu phàm, giả thuyết 'Zombie triết học' lại trỗi dậy đầy ám ảnh. Cho dù năng lực xử lý thuật toán đạt đến đỉnh cao, bản chất của Qualia - cảm giác chủ quan sống động khi trải nghiệm nỗi đau hay sắc đỏ rực rỡ - vẫn là một bí ẩn chưa có lời đáp của triết học tâm trí.",
   "AIがいかに進化しても未解明な「クオリア」とは何ですか？ (Khái niệm Qualia mà AI dù tiến hóa cũng chưa thể sở hữu là gì?)",
   ["計算の速度 (Tốc độ tính toán thuật toán)", "痛みや色彩などを内面的に実感する主観的な質感 (Cảm giác chủ quan nội tâm khi cảm nhận nỗi đau hay màu sắc)", "記憶の容量 (Dung lượng bộ nhớ)", "インターネットへの接続性 (Khả năng kết nối mạng)"], 1,
   "Trong bài có câu: 「痛みや赤さを生々しく実感する『クオリア（主観的質感）』の発生機序は依然として未解明であり...」."),

  ("dokkai_n1_8", "無常観と日本人の中世世界観", "Cảm thức vô thường trong văn học thời trung đại", "🍁",
   "『方丈記』や『平家物語』に色濃く漂う「無常観」は、現世の栄華や執着の虚しさを冷徹に見据える仏教的諦念である。しかしそれは単なる絶望ではなく、移ろいゆくからこそ生の一瞬一瞬が限りなく愛おしいという、逆説的な生の肯定へと昇華された精神的支柱であった。",
   "Cảm thức vô thường 'Mujo-kan' bàng bạc trong 'Hojoki' hay 'Truyện Heike' là sự quán chiếu thấu triệt lẽ biến dịch của Phật giáo trước vinh hoa phù du. Thế nhưng đây không phải là chủ nghĩa bi quan yếm thế, mà được thăng hoa thành sự nâng niu trân trọng tột cùng từng khoảnh khắc hiện tiền chính vì nó hữu hạn.",
   "中世日本の「無常観」がもたらした精神的境地は何ですか？ (Cảnh giới tinh thần mà cảm thức vô thường kiến tạo là gì?)",
   ["人生への完全な絶望 (Tuyệt vọng hoàn toàn vào kiếp nhân sinh)", "無常だからこそ生の一瞬を愛おしむ逆説的な生の肯定 (Khẳng định tình yêu cuộc sống nghịch lý chính vì vạn vật biến dịch)", "現世での富への執着 (Chấp niệm vào tiền tài danh vọng)", "戦いを肯定すること (Cổ xúy chiến tranh chém giết)"], 1,
   "Bài viết nêu rõ: 「単なる絶望ではなく、移ろいゆくからこそ生の一瞬一瞬が限りなく愛おしいという、逆説的な生の肯定へと昇華された...」."),

  ("dokkai_n1_9", "グローバリゼーションと文化的均質化の陥穽", "Toàn cầu hóa và cái bẫy san phẳng bản sắc văn hóa", "🌐",
   "均質化された市場原理とアルゴリズムによる最適化が地球規模で浸透した結果、地域固有の特異性や周縁的文化が急速に淘汰されつつある。画一的な効率性への盲従を退け、差異や非効率性の中にこそ宿る文化の豊穣さを再評価する視座が、人類の多様性を守る防波堤となる。",
   "Sự bành trướng của quy luật thị trường và các thuật toán tối ưu hóa toàn cầu đang san phẳng và đẩy các nền văn hóa bản địa vào nguy cơ mai một. Kháng cự lại sự đồng hóa đơn điệu để tôn vinh sự phong phú của những nét dị biệt chính là bức tường thành bảo tồn tính đa dạng văn hóa của nhân loại.",
   "文化的均質化に対抗するために必要な視座は何ですか？ (Góc nhìn cần thiết để chống lại sự đồng hóa văn hóa là gì?)",
   ["効率性だけを追求すること (Chỉ chạy theo hiệu quả kinh tế)", "画一的な効率性を退け地域固有の差異や豊穣さを再評価すること (Khước từ sự rập khuôn đơn điệu và tôn vinh tính dị biệt độc đáo bản địa)", "全ての伝統を破棄すること (Xóa bỏ toàn bộ truyền thống)", "世界貿易を全面停止すること (Ngừng toàn bộ thương mại quốc tế)"], 1,
   "Đoạn văn nêu rõ: 「画一的な効率性への盲従を退け、差異や非効率性の中にこそ宿る文化の豊穣さを再評価する視座...」."),

  ("dokkai_n1_10", "贈与論と「恩」の精神人類学的考察", "Nhân học văn hóa về lý thuyết quà tặng và chữ Ân", "🎁",
   "マルセル・モースが『贈与論』で解明したように、物の授受には不可視の呪術的拘束力と返礼の義務が宿る。日本文化における「恩」の観念もまた、受けた恩義を他者や社会へ循環させていく倫理的責務であり、個人主義的な契約関係を超えた有機的な共同体の紐帯を紡ぎ出してきた。",
   "Như Marcel Mauss từng minh giải trong 'Khảo luận về món quà', sự trao tặng luôn ẩn chứa sức mạnh tâm linh ràng buộc nghĩa vụ đáp lễ. Khái niệm chữ 'Ân' trong văn hóa Nhật Bản cũng là mệnh lệnh luân lý luân chuyển ân nghĩa đến cộng đồng, kết dệt nên sợi dây sinh mệnh hữu cơ vượt trên các bản hợp đồng vị kỷ.",
   "日本文化における「恩」が果たしてきた役割は何ですか？ (Vai trò của quan niệm chữ 'Ân' trong văn hóa Nhật là gì?)",
   ["金銭的な利害関係の固定化 (Cố định lợi ích tiền bạc)", "恩義を循環させ契約を超えた共同体の有機的紐帯を紡ぐこと (Luân chuyển ân nghĩa tạo nên sợi dây gắn kết cộng đồng bền chặt)", "個人を孤立させること (Cô lập cá nhân)", "他者を支配すること (Thống trị người khác)"], 1,
   "Trong bài có câu: 「受けた恩義を他者や社会へ循環させていく倫理的責務であり、個人主義的な契約関係を超えた有機的な共同体の紐帯を紡ぎ出してきた」."),

  ("dokkai_n1_11", "メディア生態系と熟議民主主義の衰退", "Hệ sinh thái truyền thông và sự xói mòn dân chủ thảo luận", "📰",
   "アルゴリズムが生み出す「フィルターバブル」や「エコーチェンバー」現象は、自己の信念を補強する情報のみに囲まれる確証バイアスを増幅させている。異質な他者との対話や妥協を前提とする熟議民主主義は機能不全に陥り、分断と過激化を克服する公論の再構築が焦眉の課題である。",
   "Hiện tượng 'Bong bóng lọc' và 'Phòng vang thông tin' do thuật toán mạng xã hội thiết lập đang giam cầm con người trong những thiên kiến xác nhận. Tiến trình dân chủ thảo luận - vốn cần sự lắng nghe đối thoại và thỏa hiệp với những quan điểm khác biệt - đang bị tê liệt trước sự chia rẽ và cực đoan hóa chính trị.",
   "フィルターバブルがもたらす深刻な弊害は何ですか？ (Tác hại nhức nhối do bong bóng lọc thông tin gây ra là gì?)",
   ["他者との対話と熟議が失われ社会の分断と過激化が進むこと (Làm xói mòn đối thoại thảo luận, đẩy xã hội vào chia rẽ và cực đoan)", "通信速度が遅くなること (Mạng internet chậm đi)", "本が売れなくなること (Sách không bán được)", "テレビが消えること (Tivi bị biến mất)"], 0,
   "Bài viết nêu rõ: 「異質な他者との対話や妥協を前提とする熟議民主主義は機能不全に陥り、分断と過激化を克服する...」."),

  ("dokkai_n1_12", "科学哲学：パラダイム転換と真理の相対性", "Triết học khoa học: Chuyển dịch hệ hình và chân lý tương đối", "🔬",
   "トマス・クーンが喝破したように、科学の発展は単なる知識の累積的増進ではなく、根本的な認識枠組みが劇的に刷新される「パラダイム転換」の歴史である。いかなる科学的真理もその時代の言語的・社会的文脈から完全に自由ではありえず、絶対的客観性の神話は相対化されている。",
   "Như Thomas Kuhn từng luận giải chấn động, tiến trình khoa học không phải là sự tích lũy kiến thức đơn tuyến, mà là lịch sử của những cuộc cách mạng chuyển dịch hệ hình Paradigm Shift lật đổ các tiền đề nhận thức cũ. Không một chân lý khoa học nào hoàn toàn thoát khỏi bối cảnh xã hội và ngôn ngữ thời đại.",
   "トマス・クーンの科学観が示した真理は何ですか？ (Chân lý mà triết học khoa học của Thomas Kuhn chỉ ra là gì?)",
   ["科学は永遠に変わらない絶対的真理である (Khoa học là chân lý tuyệt đối bất biến)", "科学の進歩は累積ではなくパラダイムの劇的転換である (Tiến bộ khoa học là lịch sử của các cuộc cách mạng chuyển dịch hệ hình)", "科学者は実験をしない (Nhà khoa học không làm thí nghiệm)", "物理学だけが科学である (Chỉ có vật lý mới là khoa học)"], 1,
   "Đoạn văn nêu rõ: 「科学の発展は単なる知識の累積的増進ではなく、根本的な認識枠組みが劇的に刷新される『パラダイム転換』の歴史である」."),

  ("dokkai_n1_13", "丹下健三とメタボリズム建築運動", "Kiến trúc sư Kenzo Tange và phong trào Metabolism", "🏛️",
   "千九百六十年代の日本から世界に発信された「メタボリズム」は、建築や都市を有機体のように成長・更新・新陳代謝するものとして捉えた前衛的運動である。伝統的な木造建築の解体・再生の知恵を近代メガストラクチャーへと昇華させた試みは、持続可能な未来都市の先駆的構想であった。",
   "Phong trào kiến trúc Metabolism khởi xướng từ Nhật Bản thập niên 1960 nhìn nhận kiến trúc đô thị như một sinh thể sống không ngừng sinh trưởng, thay thế tế bào và tái tạo. Việc nâng tầm triết lý tháo dỡ tái sinh của nhà gỗ cổ truyền thành những cấu trúc vĩ mô hiện đại là tư duy đi trước thời đại về đô thị bền vững.",
   "メタボリズム建築思想の根本原理は何ですか？ (Nguyên lý cốt lõi của phong trào kiến trúc Metabolism là gì?)",
   ["建物を永久に壊さないこと (Không bao giờ phá hủy công trình)", "都市や建築を有機体のように新陳代謝・更新するものとして捉えること (Nhìn nhận đô thị và kiến trúc như sinh thể sống không ngừng biến đổi tái sinh)", "石だけで家を建てること (Chỉ xây nhà bằng đá khối)", "全ての窓をなくすこと (Xóa bỏ toàn bộ cửa sổ)"], 1,
   "Trong bài có câu: 「建築や都市を有機体のように成長・更新・新陳代謝するものとして捉えた前衛的運動である」."),

  ("dokkai_n1_14", "感情労働と近代社会における主体の疎外", "Lao động cảm xúc và sự tha hóa nội tâm trong xã hội dịch vụ", "🎭",
   "ホックシールドが提唱した「感情労働」とは、職務の遂行のために自己の内発的感情を抑圧し、組織が要求する笑顔や親切心を演じる労働態様である。感情の商品化が進む高度サービス社会において、演じる自己と真の自己との解離は、深刻な心理的疲弊と主体の空洞化をもたらす。",
   "Khái niệm 'Lao động cảm xúc' của Arlie Hochschild chỉ loại hình lao động đòi hỏi người làm công phải kìm nén cảm xúc thật để trưng ra nụ cười niềm nở theo tiêu chuẩn công ty. Sự thương mại hóa cảm xúc trong nền kinh tế dịch vụ dẫn đến sự phân ly đau đớn giữa bản ngã thật và vai diễn, gây kiệt quệ tinh thần.",
   "感情労働がもたらす心理的リスクは何ですか？ (Nguy cơ tâm lý do lao động cảm xúc gây ra là gì?)",
   ["給料が上がりすぎること (Lương tăng quá cao)", "演じる自己と真の自己の解離による主体の空洞化と疲弊 (Sự kiệt quệ và tha hóa bản ngã do phân ly giữa cảm xúc thật và vai diễn)", "身体の筋肉痛 (Đau cơ bắp)", "声が出なくなること (Mất giọng nói)"], 1,
   "Đoạn văn nêu rõ: 「演じる自己と真の自己との解離は、深刻な心理的疲弊と主体の空洞化をもたらす」."),

  ("dokkai_n1_15", "俳句の極限省略と読者の共創空間", "Nghệ thuật tĩnh lược Haiku và sự đồng sáng tạo của người đọc", "📜",
   "五・七・五の十七音という極限の定型律を持つ俳句は、過剰な叙述を排した「余白の詩学」である。作者は情景の断片のみを提示し、詠み込まれなかった広大な時空は読者の想像力によって補完される。表現者と受容者の対等な交感によって初めて作品が完結する協働的芸術である。",
   "Với 17 âm tiết ngắn ngủi theo khuôn nhịp 5-7-5, thơ Haiku là đỉnh cao của thi pháp tĩnh lược khoảng trống. Nhà thơ chỉ phác họa một mảnh ghép khoảnh khắc, còn toàn bộ chiều sâu không gian thời gian vô tận được hoàn thiện nhờ trí tưởng tượng của độc giả, biến việc đọc thành hành vi đồng sáng tạo nghệ thuật.",
   "俳句という詩形式が読者に要求するものは何ですか？ (Hình thức thơ Haiku đòi hỏi điều gì ở người đọc?)",
   ["ただ受け身で聞くこと (Chỉ thụ động lắng nghe)", "省略された広大な時空を自らの想像力で補完すること (Dùng trí tưởng tượng lấp đầy không gian thời gian đã được tĩnh lược)", "言葉を暗記すること (Học thuộc lòng từ ngữ)", "長文に書き直すこと (Viết lại thành đoạn văn dài)"], 1,
   "Trong bài có câu: 「詠み込まれなかった広大な時空は読者の想像力によって補完される」."),

  ("dokkai_n1_16", "生命倫理：ゲノム編集と人間の尊厳", "Đạo đức sinh học: Can thiệp chỉnh sửa gen và phẩm giá con người", "🧬",
   "CRISPR-Cas9をはじめとするゲノム編集技術の躍進は、難治性遺伝病の根絶に光明をもたらす一方、受精卵の遺伝子改変による「デザイナーベビー」の創出というパンドラの箱を開いた。生命を人為的な設計や改良の対象とみなす優生思想の復活を防ぐ厳格な国際規範の確立が不可欠である。",
   "Sự thăng hoa của kỹ thuật chỉnh sửa bộ gen CRISPR mở ra hy vọng chữa lành các căn bệnh di truyền nan y, nhưng đồng thời hé mở chiếc hộp Pandora về nguy cơ thiết kế trẻ sơ sinh theo đơn đặt hàng. Ngăn chặn sự trỗi dậy của thuyết ưu sinh coi sinh mệnh là vật liệu cải tạo đòi hỏi các hiệp ước đạo đức quốc tế nghiêm cẩn.",
   "ゲノム編集技術が孕む最大の生命倫理的懸念は何ですか？ (Quan ngại đạo đức sinh học lớn nhất của kỹ thuật chỉnh sửa gen là gì?)",
   ["機械の故障 (Hỏng hóc máy móc)", "生命を人為的な設計対象とみなす優生思想や格差の固定化 (Thuyết ưu sinh coi sinh mệnh là đối tượng thiết kế nhân tạo và khoét sâu bất bình đẳng)", "治療費が安すぎること (Chi phí điều trị quá rẻ)", "研究者が増えること (Quá nhiều nhà nghiên cứu)"], 1,
   "Đoạn văn khẳng định: 「生命を人為的な設計や改良の対象とみなす優生思想の復活を防ぐ厳格な国際規範の確立が不可欠である」."),

  ("dokkai_n1_17", "歴史認識と記憶のポリティクス", "Nhận thức lịch sử và chính trị ký ức tập thể", "🏛️",
   "過去の事象そのものと、それが現在において想起・物語化される「集合的記憶」の間には常に政治的力学が介在する。国家や集団は自らの正統性を強化するために都合の良い記憶を顕彰し、不都合な歴史を忘却の彼方へ追いやる傾向を持つ。真の歴史認識には、沈黙を強いられた周縁の声への傾聴が求められる。",
   "Giữa sự thật lịch sử khách quan và 'Ký ức tập thể' được tái hiện luôn tồn tại những lăng kính chính trị quyền lực. Các cộng đồng có xu hướng tôn vinh những ký ức củng cố tính chính danh và lãng quên những trang sử đen tối. Nhận thức lịch sử chân chính đòi hỏi sự dũng cảm lắng nghe tiếng nói của những thân phận bên lề.",
   "真の歴史認識を獲得するために求められる姿勢は何ですか？ (Thái độ cần thiết để đạt tới nhận thức lịch sử chân chính là gì?)",
   ["勝者の記録だけを鵜呑みにすること (Chỉ tin vào sử liệu của kẻ chiến thắng)", "都合の良い記憶を誇張すること (Thổi phồng những ký ức có lợi)", "沈黙を強いられてきた周縁や他者の声に耳を傾けること (Lắng nghe tiếng nói của các đối tượng yếu thế từng bị ép phải im lặng)", "歴史の教科書をなくすこと (Bỏ hết sách giáo khoa lịch sử)"], 2,
   "Trong bài có câu: 「真の歴史認識には、沈黙を強いられた周縁の声への傾聴が求められる」."),

  ("dokkai_n1_18", "「世間」と「社会」の構造的断層", "Vết nứt cấu trúc giữa quan niệm Seken và Xã hội ở Nhật", "👥",
   "阿部謹也が論じたように、日本人の行動規範を長らく律してきたのは普遍的権利に基づく近代的な「社会」ではなく、暗黙の同調圧力と人間関係の網の目に縛られた前近代的な「世間（せけん）」である。法よりも世間の目を恐れる心理構造が、今なお個人の自立や自己主張に重い足枷を嵌めている。",
   "Nhà nghiên cứu Abe Kinya từng chỉ ra rằng hành vi của người Nhật lâu nay không vận hành theo khái niệm 'Xã hội' (dựa trên quyền con người phổ quát) mà bị ràng buộc bởi 'Seken' - mạng lưới dư luận ngầm và áp lực đồng thuận cộng đồng. Nỗi sợ ánh mắt phán xét của Seken nặng nề hơn cả luật pháp, kìm hãm sự tự chủ cá nhân.",
   "「世間」が個人の行動に与える心理的影響は何ですか？ (Ảnh hưởng tâm lý của khái niệm Seken lên hành vi cá nhân là gì?)",
   ["完全な自由と自立をもたらす (Mang lại tự do tuyệt đối)", "同調圧力や周囲の目を恐れて自己主張を抑制してしまうこと (Ức chế tự khẳng định bản thân do sợ ánh mắt phán xét và áp lực số đông)", "法律を重視するようになる (Biết coi trọng luật pháp hơn)", "外国への移住を促す (Thúc đẩy định cư nước ngoài)"], 1,
   "Đoạn văn nêu rõ: 「法よりも世間の目を恐れる心理構造が、今なお個人の自立や自己主張に重い足枷を嵌めている」."),

  ("dokkai_n1_19", "ポスト真実の時代と言説の信憑性", "Kỷ nguyên hậu sự thật và cuộc chiến bảo vệ tính khách quan", "🔍",
   "客観的な事実よりも個人の感情や信条への訴求が世論形成を左右する「ポスト真実（Post-truth）」の時代において、言説の信憑性は危機に瀕している。アルゴリズムが個々人の好みに応じた偏向情報を供給し続ける構造は社会の共通基盤を融解させており、批判的対話の再生が急務である。",
   "Trong kỷ nguyên 'Hậu sự thật' (Post-truth), nơi cảm xúc và định kiến cá nhân lấn át sự thật khách quan trong việc định hình dư luận, độ tin cậy của thông tin bị lung lay dữ dội. Khi các thuật toán liên tục mớm các nội dung thiên lệch cho người dùng, xã hội đánh mất nền tảng đối thoại khách quan chung.",
   "「ポスト真実（Post-truth）」の時代に起きている現象は何ですか？ (Hiện tượng diễn ra trong thời đại Hậu sự thật là gì?)",
   ["客観的事実よりも感情や偏見が世論を左右してしまうこと (Cảm xúc và định kiến lấn át sự thật khách quan trong định hướng công luận)", "全員が真実だけを語ること (Ai cũng chỉ nói sự thật)", "フェイクニュースが消えること (Tin giả biến mất hoàn toàn)", "科学者だけが発信すること (Chỉ có nhà khoa học được nói)"], 0,
   "Bài viết nêu rõ: 「客観的な事実よりも個人の感情や信条への訴求が世論形成を左右する『ポスト真実』の時代...」."),

  ("dokkai_n1_20", "現代アートにおける脱中心化と多元主義", "Phi trung tâm hóa và chủ nghĩa đa nguyên trong nghệ thuật đương đại", "🎨",
   "西洋中心主義的な美術史観への批判から生まれた現代アートは、非西洋圏の視座やジェンダー、植民地主義の傷跡を問い直す多元的な対話の場へと移行した。絶対的な単一の美の基準は解体され、周縁からの多様な声が既存の権力構造に揺らぎをもたらす批評的実践となっている。",
   "Nghệ thuật đương đại phát triển từ sự phản tỉnh mỹ học lấy phương Tây làm trung tâm, mở ra không gian đối thoại đa chiều về căn tính bản địa, nữ quyền và vết thương hậu thuộc địa. Mọi quy chuẩn thẩm mỹ đơn nguyên đều bị giải cấu trúc, biến nghệ thuật thành diễn đàn phản biện các cấu trúc quyền lực.",
   "現代アートが果たしている批評的役割は何ですか？ (Vai trò phản biện của nghệ thuật đương đại là gì?)",
   ["西洋の古典技法だけを模倣すること (Sao chép kỹ thuật cổ điển châu Âu)", "西洋中心の単一的な美の基準を解体し多様な視座を提示すること (Giải cấu trúc tiêu chuẩn duy nhất của phương Tây và mở rộng đa góc nhìn)", "絵を高く売ることだけ (Chỉ bán tranh kiếm lời)", "美術館の入場料を下げること (Giảm giá vé bảo tàng)"], 1,
   "Đoạn văn khẳng định: 「絶対的な単一の美の基準は解体され、周縁からの多様な声が既存の権力構造に揺らぎをもたらす...」."),

  ("dokkai_n1_21", "宇宙論と人間原理の形而上学的意義", "Vũ trụ học và nguyên lý vị nhân: Vì sao con người tồn tại", "🌌",
   "現代宇宙論における「人間原理」は、宇宙の物理定数が生命の誕生にとって奇跡的な精度で微調整（ファインチューニング）されている事実を出発点とする。宇宙が存在するから私たちがいるのか、私たちが観測するからこそこの宇宙が成立しているのかという問いは、自然科学の極限において哲学と交差する。",
   "Nguyên lý vị nhân (Anthropic principle) trong vũ trụ học hiện đại xuất phát từ thực tế kinh ngạc: các hằng số vật lý của vũ trụ được vi chỉnh với độ chuẩn xác thần kỳ để sự sống có thể nảy mầm. Ranh giới giữa câu hỏi 'Vì vũ trụ tồn tại nên có con người' hay 'Vì có người quan sát nên vũ trụ mới hiện hữu' là nơi khoa học chạm vào triết học.",
   "「人間原理」が提起している根源的な問いは何ですか？ (Câu hỏi căn bản mà nguyên lý vị nhân đặt ra là gì?)",
   ["宇宙船の速度をどう上げるか (Làm sao tăng tốc tàu vũ trụ)", "宇宙の物理定数の微調整と知的観測者の存在論的関係 (Mối liên hệ bản thể luận giữa sự vi chỉnh của vũ trụ và sự tồn tại của con người quan sát)", "月の土地の値段 (Giá đất trên mặt trăng)", "星の数を数える方法 (Cách đếm số ngôi sao)"], 1,
   "Trong bài có câu: 「宇宙が存在するから私たちがいるのか、私たちが観測するからこそこの宇宙が成立しているのかという問い...」."),

  ("dokkai_n1_22", "認知バイアスと合理的意思決定の限界", "Định kiến nhận thức và sự phi lý tính của con người", "📊",
   "行動経済学が実証したように、人間の意思決定は純粋な合理性ではなく、損失回避やアンカリング効果といった無数の認知バイアスに支配されている。自らの思考の癖や非合理性をメタ認知（客観視）することこそが、不確実な世界において致命的な誤謬を避けるための唯一の処方箋である。",
   "Kinh tế học hành vi đã chứng minh rằng các quyết định của con người không hề thuần túy lý trí, mà luôn bị chi phối bởi hàng loạt định kiến nhận thức như tâm lý sợ thua lỗ hay bẫy mỏ neo. Năng lực siêu nhận thức (nhìn nhận khách quan chính các lỗ hổng tư duy của mình) là liều thuốc duy nhất tránh khỏi sai lầm thảm họa.",
   "致命的な判断ミスを避けるために不可欠な能力は何ですか？ (Năng lực thiết yếu để tránh các sai lầm phán đoán nghiêm trọng là gì?)",
   ["自分の直感だけを信じること (Chỉ tin vào trực giác cá nhân)", "自らの認知バイアスや非合理性を客観視するメタ認知能力 (Năng lực siêu nhận thức thấu suốt những định kiến phi lý của bản thân)", "他人の意見を完全に無視すること (Bỏ ngoài tai ý kiến người khác)", "運に任せること (Phó mặc cho may rủi)"], 1,
   "Đoạn văn nêu rõ: 「自らの思考の癖や非合理性をメタ認知（客観視）することこそが...唯一の処方箋である」."),

  ("dokkai_n1_23", "九鬼周造『「いき」の構造』と美の形而上学", "Kuki Shuzo và cấu trúc của 'Iki': Vẻ đẹp phong lưu tao nhã", "🎐",
   "哲学者・九鬼周造は、江戸の美意識である「いき（粋）」の本質を「媚態（異性への緊張関係）」「意気地（武士道的プライド）」「諦め（無常観による恬淡）」の三要素が織りなす構造として論理的に定式化した。野暮や甘溺に堕ちず、洗練された緊張を保ち続ける精神の佇まいを鮮やかに描き出している。",
   "Trong kiệt tác 'Cấu trúc của Iki', triết gia Kuki Shuzo đã đúc kết mỹ học phong lưu 'Iki' thời Edo qua ba trụ cột: sự duyên dáng quyến rũ, khí phách kiêu hãnh của võ sĩ đạo, và sự buông bỏ thấu triệt lẽ vô thường. Đó là phong thái tao nhã giữ trọn sự căng tràn tinh tế mà không bao giờ rơi vào sự thô thiển dung tục.",
   "九鬼周造が定義した「いき」を構成する三要素は何ですか？ (Ba yếu tố tạo nên cốt cách mỹ học 'Iki' theo Kuki Shuzo là gì?)",
   ["金、名誉、権力 (Tiền bạc, danh vọng, quyền lực)", "媚態、意気地、諦め (Duyên dáng quyến rũ, khí phách kiêu hãnh, buông bỏ vô thường)", "怒り、悲しみ、喜び (Hỷ nộ ái ố)", "武力、知力、体力 (Võ lực, trí lực, thể lực)"], 1,
   "Bài viết nêu rõ: 「『媚態（異性への緊張関係）』『意気地（武士道的プライド）』『諦め（無常観による恬淡）』の三要素...」."),

  ("dokkai_n1_24", "デジタル監視社会とプライバシーの再定義", "Xã hội giám sát số và sự tái định nghĩa quyền riêng tư", "👁️",
   "顔認識カメラや位置情報トラッキング、生体データの収集が常態化したスマートシティにおいて、監視は不可視かつ自発的な同意のもとに進行している。利便性と安全の引き換えに差し出される個人データが行動予測や世論誘導に利用される監視資本主義の中で、個人の自己決定権の防衛が問われている。",
   "Trong các đô thị thông minh ngập tràn camera nhận diện khuôn mặt và định vị GPS, sự giám sát đang diễn ra vô hình dưới vỏ bọc tự nguyện đồng thuận. Sự đánh đổi dữ liệu riêng tư lấy tiện ích đang bị chủ nghĩa tư bản giám sát thao túng hành vi, đặt ra cuộc chiến cam go bảo vệ quyền tự quyết của con người.",
   "監視資本主義における重大な懸念は何ですか？ (Mối lo ngại nghiêm trọng trong chủ nghĩa tư bản giám sát là gì?)",
   ["街が安全になりすぎること (Đường phố quá an toàn)", "個人データが行動予測や誘導に悪用され自己決定権が脅かされること (Dữ liệu cá nhân bị thao túng để định hướng hành vi đe dọa quyền tự quyết)", "カメラの画質が悪いこと (Chất lượng camera kém)", "スマートフォンが重くなること (Điện thoại bị nặng)"], 1,
   "Đoạn văn khẳng định: 「個人データが行動予測や世論誘導に利用される監視資本主義の中で、個人の自己決定権の防衛が問われている」."),

  ("dokkai_n1_25", "認知言語学における比喩（メタファー）の認知的役割", "Ẩn dụ tri nhận: Chiếc cầu nối tư duy trừu tượng của con người", "🌉",
   "レイコフとジョンソンが提唱した概念メタファー論によれば、比喩は単なる修辞的装飾ではなく、人間の思考や行動を律する根本的な概念体系である。「議論は戦争である」「時間は金である」といった日常の言語表現は、私たちが抽象的な世界をいかに身体的経験に基づいて構造化しているかを物語っている。",
   "Theo lý thuyết ẩn dụ ý niệm của Lakoff và Johnson, ẩn dụ không đơn thuần là thủ pháp văn chương làm dáng câu chữ, mà chính là bản đồ tư duy định hình hành vi con người. Những câu nói quen thuộc như 'Tranh luận là chiến tranh' hay 'Thời gian là vàng bạc' cho thấy con người trừu tượng hóa thế giới qua trải nghiệm thể xác.",
   "概念メタファー論が明らかにした比喩の本質は何ですか？ (Bản chất của ẩn dụ được thuyết ẩn dụ ý niệm soi sáng là gì?)",
   ["単なる詩の飾り言葉にすぎない (Chỉ là từ hoa mỹ trong thơ ca)", "人間の思考や行動の概念体系を根本から律する認知機能である (Là chức năng nhận thức căn bản định hình tư duy và hành vi con người)", "嘘の表現である (Là lời nói dối)", "外国語特有のものである (Chỉ có trong tiếng nước ngoài)"], 1,
   "Trong bài có câu: 「比喩は単なる修辞的装飾ではなく、人間の思考や行動を律する根本的な概念体系である」."),

  ("dokkai_n1_26", "能力主義（メリトクラシー）の罠と格差の固定化", "Cạm bẫy của chủ nghĩa trọng tài năng và bất bình đẳng cơ hội", "⚖️",
   "マイケル・サンデルが告発するように、「能力に応じた成功」を謳うメリトクラシーは、勝者におごりを、敗者に自己責任という屈辱をもたらす残酷な分断装置へと変貌した。個人の才能や家庭環境という偶発的要因を自らの努力の成果と錯覚する構造を解体し、真の連帯と尊厳を取り戻す対話が求められる。",
   "Như triết gia Michael Sandel cảnh báo, chủ nghĩa trọng tài năng Meritocracy tưởng như công bằng lại biến thành cỗ máy chia rẽ tàn nhẫn: gieo vào kẻ thắng ngạo mạn và giáng xuống người thua nỗi nhục nhã của sự tự trách mình. Cần phải hóa giải ngộ nhận rằng thành công cá nhân thuần túy do tự thân để tái lập tình liên đới xã hội.",
   "能力主義（メリトクラシー）がもたらす社会的分断の原因は何ですか？ (Nguyên nhân gây chia rẽ xã hội của chủ nghĩa trọng tài năng là gì?)",
   ["全員が成功してしまうこと (Ai cũng thành công)", "勝者の傲慢と敗者への自己責任の押し付けによる尊厳の侵害 (Sự ngạo mạn của kẻ thắng và đổ lỗi tự gánh chịu lên người yếu thế tổn hại phẩm giá)", "学歴が不要になること (Không cần bằng cấp)", "税金が高すぎること (Thuế quá cao)"], 1,
   "Đoạn văn khẳng định: 「勝者におごりを、敗者に自己責任という屈辱をもたらす残酷な分断装置へと変貌した」."),

  ("dokkai_n1_27", "伝統演劇における仮面（面 - Omote）の心理象徴", "Chiếc mặt nạ Omote trong kịch Noh: Vô cảm biểu cảm vạn ngàn", "👺",
   "能楽で用いられる能面（おもて）は、一見すると無表情な木彫りの仮面である。しかし、演者の微細な首の傾き（テリ・クモリ）によって陰影が生じ、喜びから深い悲哀まで無限の感情がそこに立ち現れる。固定された表情を拒否する中間表情の深奥こそ、観客の内面心理を映し出す鏡となる。",
   "Mặt nạ Omote trong kịch Noh thoạt nhìn là một phiến gỗ vô cảm bất động. Thế nhưng, chỉ qua một góc nghiêng đầu chớm khẽ của người diễn viên, ánh sáng và bóng đổ lập tức biến hóa mặt nạ từ nụ cười mỉm rạng rỡ thành nỗi bi thương xé ruột. Biểu cảm lưng chừng đa nghĩa ấy chính là tấm gương soi chiếu nội tâm khán giả.",
   "能面（おもて）に無限の感情が宿る理由は何ですか？ (Vì sao chiếc mặt nạ Noh Omote lại biểu đạt được vô vàn cảm xúc?)",
   ["仮面が電子で動くから (Mặt nạ gắn chip điện tử chuyển động)", "微細な傾きによる陰影の変化と固定されない中間表情の深奥 (Nhờ sự biến chuyển bóng đổ của góc nghiêng và biểu cảm đa nghĩa)", "派手なメイクをしているから (Nhờ trang điểm lòe loẹt)", "色が次々に変わるから (Vì đổi màu liên tục)"], 1,
   "Bài viết nêu rõ: 「演者の微細な首の傾きによって陰影が生じ、喜びから深い悲哀まで無限の感情がそこに立ち現れる」."),

  ("dokkai_n1_28", "気候正義と将来世代に対する倫理的責任", "Công lý khí hậu và trách nhiệm đạo đức với thế hệ mai sau", "🌍",
   "気候変動問題の本質は、現在の豊かさを享受する世代がその環境負荷のツケを未来の世代に先送りしているという「世代間不公正」にある。まだ発言権を持たない将来の生命に対する責任を自覚し、長期的時間軸に立脚した地球環境の受託者（スチュワードシップ）としての倫理観が問われている。",
   "Bản chất cốt lõi của khủng hoảng khí hậu là sự bất công thế hệ: thế hệ hiện tại đang hưởng thụ cạn kiệt tài nguyên và đẩy toàn bộ hậu quả sinh thái tàn khốc sang những thế hệ chưa kịp cất tiếng nói. Nhận thức trách nhiệm người gác đền Trái Đất Stewardship với tầm nhìn thiên niên kỷ là bổn phận luân lý sống còn.",
   "気候正義が問題視している根本的な不公正は何ですか？ (Sự bất công căn bản mà công lý khí hậu cảnh báo là gì?)",
   ["電気代の地域差 (Chênh lệch giá điện các vùng)", "現世代が環境負荷をまだ発言権のない将来世代に先送りしていること (Thế hệ hiện tại đẩy toàn bộ gánh nặng hủy hoại sinh thái sang thế hệ tương lai)", "雨の降る量の違い (Lượng mưa khác nhau)", "冬の寒さの厳しさ (Mùa đông quá lạnh)"], 1,
   "Trong bài có câu: 「現在の豊かさを享受する世代がその環境負荷のツケを未来の世代に先送りしているという『世代間不公正』にある」."),

  ("dokkai_n1_29", "ニーチェの能動的ニヒリズムと生の肯定", "Chủ nghĩa hư vô tích cực của Nietzsche và sự khẳng định ý nghĩa cuộc sống", "🔥",
   "ニーチェが説いた「能動的ニヒリズム」は、神の死によって既存の客観的価値基準が喪失した絶望を直視した上で、自らの意志によって新たな価値を創造し直す英雄的決断である。「永劫回帰」という過酷な生の円環すらも愛する運命愛（アモール・ファティ）こそが、超人への跳躍台となる。",
   "Chủ nghĩa hư vô tích cực của Nietzsche đối diện dũng cảm với sự sụp đổ của mọi giá trị thần thánh tối cao, để từ đó con người dùng ý chí quật cường tự kiến tạo nên hệ giá trị sống của chính mình. Yêu trọn vẹn số phận nghiệt ngã Amor Fati trong vòng lặp vĩnh cửu chính là bệ phóng vươn tới con người Siêu nhân.",
   "ニーチェの「能動的ニヒリズム」が目指す究極の境地は何ですか？ (Cảnh giới cứu cánh mà chủ nghĩa hư vô tích cực của Nietzsche hướng tới là gì?)",
   ["生きることを諦めて逃げること (Từ bỏ cuộc sống trốn chạy)", "既存の価値喪失を直視し自らの意志で新たな価値を創造し生を肯定すること (Đối diện hư vô và dùng ý chí tự kiến tạo giá trị mới để khẳng định cuộc đời)", "他人の命令に従うこと (Tuân lệnh người khác)", "神に祈り続けること (Cầu xin thần linh)"], 1,
   "Đoạn văn nêu rõ: 「自らの意志によって新たな価値を創造し直す英雄的決断である...運命愛こそが、超人への跳躍台となる」."),

  ("dokkai_n1_30", "言葉の沈黙と「語りえぬもの」の領野", "Sự im lặng của ngôn từ và cõi lĩnh hội của những điều khôn tả", "🌌",
   "ウィトゲンシュタインが『論理哲学論考』の結びで「語りえぬものについては、沈黙しなければならない」と喝破した命題は、言葉の無力化ではなく、倫理や美、生の意味といった根源的領域への敬虔な敬意を示している。言語の限界を確定することによって逆説的に照射される不可言の深奥こそ、人間が真に生きる場所である。",
   "Mệnh đề bất hủ khép lại cuốn 'Luận văn Logic-Triết học' của Wittgenstein: 'Với những gì không thể nói được, ta phải giữ im lặng' không phải là sự bất lực của ngôn từ, mà là sự tôn kính linh thiêng trước cõi cái đẹp, đạo đức và ý nghĩa sinh tồn. Bằng cách vạch ra biên giới của ngôn ngữ, cõi khôn tả vô ngôn mới bừng sáng trọn vẹn.",
   "「語りえぬものについては、沈黙しなければならない」という命題の本意は何ですか？ (Ý nghĩa sâu xa đích thực của mệnh đề về sự im lặng của Wittgenstein là gì?)",
   ["話を禁止すること (Cấm nói chuyện)", "言語の限界を画定し言葉を超えた倫理や生の意味という深奥を敬虔に守ること (Vạch rõ ranh giới ngôn ngữ để bảo bọc sự tôn kính với cõi đạo đức và ý nghĩa kiếp người)", "言語学を廃止すること (Bãi bỏ ngôn ngữ học)", "嘘をつくことを推奨すること (Khuyến khích nói dối)"], 1,
   "Bài viết kết luận: 「倫理や美、生の意味といった根源的領域への敬虔な敬意を示している。言語の限界を確定することによって逆説的に照射される不可言の深奥こそ...」.")
]

all_n1 = []
for art in topics_n1 + more_n1:
    item = {
        "id": art[0],
        "level": "N1",
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
    all_n1.append(item)

print(f"Total N1 articles: {len(all_n1)}")
with open("/Users/huyhoang190607gmail.com/web kanji nhật/projectKanji-web/lib/readingDataN1.js", "w", encoding="utf-8") as f:
    f.write("// Dữ liệu Luyện Đọc hiểu Dokkai JLPT N1 (30 bài chuẩn cao cấp)\n\n")
    f.write("export const READING_N1 = " + json.dumps(all_n1, ensure_ascii=False, indent=2) + ";\n")
