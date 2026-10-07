[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$curated = [ordered]@{
    "车" = @{ sentence = "駅の前にたくさんの车が止まっています。"; translation = "Có rất nhiều xe đang đỗ ở phía trước nhà ga." }
    "负" = @{ sentence = "自分の行动には自分で责任を负います。"; translation = "Tôi tự gánh vác trách nhiệm cho hành động của chính mình." }
    "财" = @{ sentence = "健康は人にとって最も大切な财産です。"; translation = "Sức khỏe là tài sản quý giá nhất của con người." }
    "责" = @{ sentence = "彼は自分の仕事に强い责任感を持っています。"; translation = "Anh ấy có tinh thần trách nhiệm rất cao với công việc của mình." }
    "贫" = @{ sentence = "困っている贫しい人々を支援する活动を行います。"; translation = "Tiến hành các hoạt động hỗ trợ những người nghèo khó đang gặp hoạn nạn." }
    "费" = @{ sentence = "毎月の生活费をしっか�    "压" = @{ sentence = "日々の仕事のプレッシャーや精神的な压力に负けない。"; translation = "Không chịu khuất phục trước sức ép và áp lực tinh thần trong công việc hàng ngày." }
    "汤" = @{ sentence = "寒い冬の日に温かいお汤を饮んで体を温めます。"; translation = "Uống nước ấm vào ngày đông giá rét để làm ấm cơ thể." }
    "诗" = @{ sentence = "夕暮れの美しい景色を見て心に浮かんだ诗を書きました。"; translation = "Ngắm cảnh hoàng hôn tuyệt đẹp, tôi đã viết nên bài thơ trào dâng trong lòng." }
    "谱" = @{ sentence = "新しいピアノの楽谱を見ながら熱心に練習します。"; translation = "Chăm chỉ luyện tập đàn piano trong khi nhìn vào bản phổ nhạc mới." }
    "丙" = @{ sentence = "今回の試験の成績は甲乙丙の三段階で評価されます。"; translation = "Kết quả bài kiểm tra lần này được đánh giá theo ba bậc Giáp, Ất và Bính." }
    "丞" = @{ sentence = "歴史小説の中で賢明な左丞相が国を治めています。"; translation = "Trong tiểu thuyết lịch sử, vị Tả Thừa tướng thông thái đang cai quản đất nước." }
    "亘" = @{ sentence = "国際会議は三日間に亘って熱心に行われました。"; translation = "Hội nghị quốc tế đã diễn ra sôi nổi kéo dài suốt ba ngày." }
    "亦" = @{ sentence = "人生において成功も失敗も亦良き経験となります。"; translation = "Trong cuộc đời, cả thành công hay thất bại cũng đều là những trải nghiệm quý báu." }
    "伶" = @{ sentence = "伝統芸能の舞台で宮廷の伶人が美しい調べを奏でます。"; translation = "Trên sân khấu nghệ thuật truyền thống, các nhạc công cung đình tấu lên khúc nhạc tuyệt mỹ." }
    "伽" = @{ sentence = "古都の静かな森の中に荘厳な伽藍が佇んでいます。"; translation = "Giữa khu rừng thanh tịnh chốn cố đô, một ngôi chùa cổ kính uy nghiêm đang tọa lạc." }
    "但" = @{ sentence = "誰でも参加できます。但し事前の申し込みが必要です。"; translation = "Ai cũng có thể tham gia. Tuy nhiên cần phải đăng ký trước." }
    "佑" = @{ sentence = "天佑に恵まれて困難な危機を乗り越えることができました。"; translation = "Nhờ được trời che chở giúp đỡ, chúng tôi đã vượt qua được cuộc khủng hoàng đầy gian nan." }
    "侑" = @{ sentence = "友人の門出を祝って酒宴を侑め杯を交わしました。"; translation = "Mời rượu chúc mừng bước ngoặt mới của người bạn và cùng nhau nâng ly." }
    "侯" = @{ sentence = "中世ヨーロッパの歴史で王侯貴族が栄華を誇っていました。"; translation = "Trong lịch sử châu Âu thời trung cổ, các vương hầu quý tộc từng vô cùng thịnh vượng." }
    "倖" = @{ sentence = "彼女は薄倖な運命にも決して負けずに生き抜きました。"; translation = "Cô ấy đã kiên cường vượt qua số phận mỏng manh bất hạnh mà không hề bỏ cuộc." }
    "倭" = @{ sentence = "古い歴史書には古代の日本が倭国と記されています。"; translation = "Trong các cuốn sử sách cổ, nước Nhật thời xưa được ghi chép là nước Oa." }
    "允" = @{ sentence = "新規事業の立ち上げについて取締役会から允許を得ました。"; translation = "Đã nhận được sự cho phép chuẩn thuận từ ban giám đốc về việc khởi động dự án mới." }
    "凜" = @{ sentence = "早朝の庭には凜とした冬の冷たい空気が満ちています。"; translation = "Khu vườn lúc sáng sớm tràn ngập bầu không khí lạnh giá mà thanh tịnh của mùa đông." }
    "劾" = @{ sentence = "不正を行った高官を弾劾するための特別裁判が開かれました。"; translation = "Một phiên tòa đặc biệt đã được mở ra để luận tội vị quan chức cấp cao có hành vi sai phạm." }
    "勁" = @{ sentence = "風雪に耐えて力強く生きる勁草の姿に心を打たれました。"; translation = "Tôi vô cùng cảm phục trước hình ảnh ngọn cỏ kiên cường dẻo dai chống chọi với mưa tuyết bão bùng." }
    "勅" = @{ sentence = "天皇から発せられた勅命に従って使者が派遣されました。"; translation = "Sứ giả đã được phái đi theo sắc lệnh do chính Thiên hoàng ban bố." }
    "勺" = @{ sentence = "料理の味付けのために醤油を一勺加えました。"; translation = "Thêm một muỗng nước tương vào để nêm nếm gia vị cho món ăn." }
    "匁" = @{ sentence = "日本の伝統的な質量の単位として百匁はおよそ375グラムです。"; translation = "Là một đơn vị khối lượng truyền thống của Nhật Bản, một trăm momme tương đương khoảng 375 gam." }
    "匡" = @{ sentence = "社会の乱れた風紀を匡正するために新しい指針を定めました。"; translation = "Đặt ra những quy định định hướng mới nhằm uốn nắn, chấn chỉnh lại trật tự kỷ cương xã hội." }
    "叡" = @{ sentence = "古代の王は豊かな叡智によって国を正しく導きました。"; translation = "Vị vua cổ đại đã dùng trí tuệ uyên thâm, sáng suốt để dẫn dắt đất nước đi đúng hướng." }
    "吏" = @{ sentence = "地方の役所で公吏として地域住民のために働いています。"; translation = "Tôi làm công chức tại một cơ quan địa phương để phục vụ người dân trong vùng." }
    "喬" = @{ sentence = "深い山林の中に天に向かってそびえる喬木が群生しています。"; translation = "Trong khu rừng sâu thẳm, những cây cổ thụ cao vút mọc thành từng cụm vươn thẳng lên trời cao." }
    "嗣" = @{ sentence = "代々続く伝統ある名家の嗣子として家業を継ぎました。"; translation = "Với tư cách là người kế tự của một danh gia vọng tộc lâu đời, anh ấy đã tiếp quản cơ nghiệp gia đình." }
    "嘉" = @{ sentence = "新年の嘉祥を祈って神社へ家族と一緒に初詣に行きました。"; translation = "Cả gia đình cùng đi lễ chùa đầu năm để cầu chúc những điều cát tường may mắn cho năm mới." }
    "坑" = @{ sentence = "作業員たちはヘルメットをかぶって炭鉱の坑道に入りました。"; translation = "Các công nhân đội mũ bảo hộ bước vào đường hầm của mỏ than." }
    "堀" = @{ sentence = "江戸城の周囲には深い堀が張り巡らされています。"; translation = "Xung quanh lâu đài Edo được bao bọc bởi những con hào sâu thẳm." }
    "奎" = @{ sentence = "二十八宿の一つである奎宿が夜空に静かに輝いています。"; translation = "Sao Khuê, một trong hai mươi tám chòm sao cổ phương Đông, lặng lẽ tỏa sáng trên bầu trời đêm." }
    "嫡" = @{ sentence = "名門武家の嫡男として誇り高く厳しく育てられました。"; translation = "Là con trai trưởng đích tôn của một gia tộc võ sĩ danh tiếng, anh ấy được nuôi dạy vô cùng nghiêm khắc và kiêu hãnh." }
    "尭" = @{ sentence = "古代中国の伝説に登場する尭帝は徳の高い名君でした。"; translation = "Vua Nghiêu xuất hiện trong truyền thuyết cổ đại Trung Hoa là một bậc minh quân đức độ." }
    "屯" = @{ sentence = "辺境の防衛のために要所に兵士たちが駐屯しています。"; translation = "Các binh sĩ đang đóng quân đồn trú tại những cứ điểm trọng yếu để bảo vệ vùng biên cương." }
    "崚" = @{ sentence = "険しく切り立った連崚の峰々が白雲の上に突き出ています。"; translation = "Những đỉnh núi non hiểm trở trập trùng nhô cao sừng sững vượt lên trên tầng mây trắng." }
    "巌" = @{ sentence = "荒波が打ち寄せる海岸に険しい巌がそびえ立っています。"; translation = "Bên bờ biển sóng vỗ dồn dập, những tảng đá khổng lồ hiểm trở sừng sững uy nghiêm." }
    "巴" = @{ sentence = "神社の紋章には三つ巴の文様が美しく描かれています。"; translation = "Trên biểu tượng hoa văn của ngôi đền có khắc họa họa tiết ba hình xoáy Tomoe tuyệt đẹp." }
    "巽" = @{ sentence = "東南の方角を古くは巽の向きと呼びました。"; translation = "Hướng Đông Nam trong cách gọi phương vị cổ xưa được gọi là hướng Tốn." }
    "帥" = @{ sentence = "全軍を指揮する総帥が戦場で作戦の指示を下しました。"; translation = "Vị thống soái chỉ huy toàn quân đã trực tiếp ban bố mệnh lệnh tác chiến trên chiến trường." }
    "庄" = @{ sentence = "江戸時代の名残をとどめる静かな庄屋の屋敷を見学しました。"; translation = "Tham quan khu dinh thự của vị trang chủ thời Edo còn lưu giữ lại nhiều dấu ấn lịch sử." }
    "弐" = @{ sentence = "証書には金額として壱万円および弐万円と記されています。"; translation = "Trên giấy biên nhận chứng thư, số tiền được ghi bằng thể chữ cổ là 1 vạn yên và 2 vạn yên." }
    "弔" = @{ sentence = "故人の冥福を祈り心からの弔意を表します。"; translation = "Cầu mong cho linh hồn người đã khuất được an nghỉ và xin gửi lời chia buồn sâu sắc nhất." }��ng cây cổ thụ cao vút mọc thành từng cụm vươn thẳng lên trời cao." }
    "嗣" = @{ sentence = "代々続く伝統ある名家の嗣子として家業を継ぎました。"; translation = "Với tư cách là người kế tự của một danh gia vọng tộc lâu đời, anh ấy đã tiếp quản cơ nghiệp gia đình." }
    "嘉" = @{ sentence = "新年の嘉祥を祈って神社へ家族と一緒に初詣に行きました。"; translation = "Cả gia đình cùng đi lễ chùa đầu năm để cầu chúc những điều cát tường may mắn cho năm mới." }
    "坑" = @{ sentence = "作業員たちはヘルメットをかぶって炭鉱の坑道に入りました。"; translation = "Các công nhân đội mũ bảo hộ bước vào đường hầm của mỏ than." }
    "堀" = @{ sentence = "江戸城の周囲には深い堀が張り巡らされています。"; translation = "Xung quanh lâu đài Edo được bao bọc bởi những con hào sâu thẳm." }
    "奎" = @{ sentence = "二十八宿の一つである奎宿が夜空に静かに輝いています。"; translation = "Sao Khuê, một trong hai mươi tám chòm sao cổ phương Đông, lặng lẽ tỏa sáng trên bầu trời đêm." }
    "嫡" = @{ sentence = "名門武家の嫡男として誇り高く厳しく育てられました。"; translation = "Là con trai trưởng đích tôn của một gia tộc võ sĩ danh tiếng, anh ấy được nuôi dạy vô cùng nghiêm khắc và kiêu hãnh." }
    "尭" = @{ sentence = "古代中国の伝説に登場する尭帝は徳の高い名君でした。"; translation = "Vua Nghiêu xuất hiện trong truyền thuyết cổ đại Trung Hoa là một bậc minh quân đức độ." }
    "屯" = @{ sentence = "辺境の防衛のために要所に兵士たちが駐屯しています。"; translation = "Các binh sĩ đang đóng quân đồn trú tại những cứ điểm trọng yếu để bảo vệ vùng biên cương." }
    "崚" = @{ sentence = "険しく切り立った連崚の峰々が白雲の上に突き出ています。"; translation = "Những đỉnh núi non hiểm trở trập trùng nhô cao sừng sững vượt lên trên tầng mây trắng." }
    "巌" = @{ sentence = "荒波が打ち寄せる海岸に険しい巌がそびえ立っています。"; translation = "Bên bờ biển sóng vỗ dồn dập, những tảng đá khổng lồ hiểm trở sừng sững uy nghiêm." }
    "巴" = @{ sentence = "神社の紋章には三つ巴の文様が美しく描かれています。"; translation = "Trên biểu tượng hoa văn của ngôi đền có khắc họa họa tiết ba hình xoáy Tomoe tuyệt đẹp." }
    "巽" = @{ sentence = "東南の方角を古くは巽の向きと呼びました。"; translation = "Hướng Đông Nam trong cách gọi phương vị cổ xưa được gọi là hướng Tốn." }
    "帥" = @{ sentence = "全軍を指揮する総帥が戦場で作戦の指示を下しました。"; translation = "Vị thống soái chỉ huy toàn quân đã trực tiếp ban bố mệnh lệnh tác chiến trên chiến trường." }
    "庄" = @{ sentence = "平安時代には貴族や寺社が多くの荘園を領有していました。"; translation = "Vào thời Heian, giới quý tộc và các đền chùa sở hữu rất nhiều trang ấp điền trang." }
    "弐" = @{ sentence = "証書には金額として壱万円および弐万円と記されています。"; translation = "Trên giấy biên nhận chứng thư, số tiền được ghi bằng thể chữ cổ là 1 vạn yên và 2 vạn yên." }
    "弔" = @{ sentence = "故人の冥福を祈り心からの弔意を表します。"; translation = "Cầu mong cho linh hồn người đã khuất được an nghỉ và xin gửi lời chia buồn sâu sắc nhất." }
    "彪" = @{ sentence = "彼は文学の世界で才能を発揮して彪炳たる名声を博しました。"; translation = "Anh ấy đã phát huy tài năng kiệt xuất trong giới văn học và gặt hái được danh tiếng lẫy lừng." }
    "彬" = @{ sentence = "文質彬彬たる教養ある紳士として周囲から尊敬されています。"; translation = "Ông được mọi người xung quanh hết mực kính trọng như một quý ông có học thức uyên bác và cốt cách tao nhã." }
    "悌" = @{ sentence = "儒教では親への孝行と兄弟仲良く助け合う悌を重んじます。"; translation = "Trong Nho giáo, người ta đặc biệt coi trọng chữ Hiếu với cha mẹ và chữ Đễ thuận hòa giúp đỡ lẫn nhau giữa anh em." }
    "惇" = @{ sentence = "彼は常に誠実で惇厚な人柄から多くの人に慕われています。"; translation = "Anh ấy luôn được rất nhiều người yêu mến nhờ tính cách đôn hậu, chân thành và đáng tin cậy." }
    "惟" = @{ sentence = "国の将来について深く惟み新しい政策を打ち出しました。"; translation = "Sau khi suy ngẫm sâu sắc về tương lai của đất nước, các chính sách đổi mới đã được ban hành." }
    "慧" = @{ sentence = "困難な状況でも慧眼をもって物事の本質を見抜きます。"; translation = "Dù trong hoàn cảnh khó khăn gian truân, người đó vẫn dùng con mắt tinh đời tuệ nhãn để thấu tỏ bản chất vấn đề." }
    "捷" = @{ sentence = "最新のシステムを導入して業務の敏捷な処理を実現しました。"; translation = "Áp dụng hệ thống công nghệ mới nhất để hiện thực hóa việc xử lý công việc một cách nhanh nhẹn, linh hoạt." }
    "捺" = @{ sentence = "契約書の内容を確認したあとで指定の位置に捺印します。"; translation = "Sau khi xác nhận kỹ các điều khoản hợp đồng, hãy đóng dấu vào đúng vị trí đã được chỉ định." }
    "敦" = @{ sentence = "長年にわたって両国の間で敦厚な友好関係が築かれています。"; translation = "Mối quan hệ hữu nghị thâm tình nồng hậu đã được vun đắp giữa hai quốc gia qua nhiều năm tháng." }
    "旭" = @{ sentence = "水平線から昇る鮮やかな旭日が海面を照らしています。"; translation = "Ánh mặt trời ban mai rực rỡ mọc lên từ đường chân trời soi sáng lấp lánh mặt biển." }
    "昂" = @{ sentence = "大舞台を前にして胸の高鳴りと気分の昂揚を感じました。"; translation = "Đứng trước sân khấu lớn hoành tráng, tôi cảm thấy con tim rộn ràng và tinh thần dâng trào phấn khích." }
    "昴" = @{ sentence = "澄み切った冬の夜空に昴の星団が青白く輝いています。"; translation = "Trên bầu trời đêm đông trong vắt, cụm sao Tua Rua lấp lánh ánh sáng trắng xanh tuyệt đẹp." }
    "晏" = @{ sentence = "戦乱が収まり天下は晏如として平和な時代を迎えました。"; translation = "Khói lửa chiến tranh lắng xuống, thiên hạ thái bình yên vui bước vào một kỷ nguyên hòa bình êm ấm." }
    "晟" = @{ sentence = "真昼の太陽のように晟亮たる光が大地を満たしています。"; translation = "Ánh sáng rực rỡ chan hòa tựa mặt trời giữa trưa tỏa sáng ngập tràn khắp mặt đất." }
    "晨" = @{ sentence = "小鳥のさえずりと共に清々しい早晨の光が差し込みます。"; translation = "Cùng tiếng chim hót líu lo, ánh ban mai tinh khôi buổi sớm rọi chiếu vào căn phòng." }
    "暉" = @{ sentence = "夕暮れ時に西の空を赤く染める残暉が息をのむ美しさです。"; translation = "Ánh tà dương buổi chiều muộn nhuộm đỏ rực góc trời tây mang một vẻ đẹp đến nghẹt thở." }
    "朔" = @{ sentence = "暦の上で朔日を迎えて新しい月の始まりを祝いました。"; translation = "Chào đón ngày mồng một đầu tháng theo lịch âm và cùng nhau đón mừng sự khởi đầu của một tháng mới." }
    "柊" = @{ sentence = "節分の夜には柊の枝とイワシの頭を玄関に飾ります。"; translation = "Vào đêm lễ Tiết Phân, người ta cắm cành cây ô rô cùng đầu cá mòi trước cửa nhà để xua đuổi tà khí." }
    "柾" = @{ sentence = "高級な家具には木目がまっすぐで美しい柾目が使われます。"; translation = "Đối với đồ nội thất cao cấp, người ta sử dụng các thớ gỗ sọc thẳng thớ tuyệt đẹp." }
    "栞" = @{ sentence = "読みかけの本にお気に入りの桜模様の栞を挟みました。"; translation = "Tôi kẹp chiếc thẻ đánh dấu trang hình hoa anh đào yêu thích vào cuốn sách đang đọc dở." }
    "梢" = @{ sentence = "高い木々の梢で小鳥たちが楽しそうに歌っています。"; translation = "Trên những ngọn cây cao vút, bầy chim nhỏ đang hót ca vui vẻ." }
    "梧" = @{ sentence = "中庭の立派な梧桐の木が夏の日差しに緑の影を落とします。"; translation = "Cây ngô đồng bề thế ở sân trong tỏa bóng râm xanh mát dưới ánh nắng hè chói chang." }
    "椋" = @{ sentence = "秋の夕方に大きな群れを作った椋鳥が一斉に飛び立ちました。"; translation = "Vào một buổi chiều thu, đàn chim sáo đá sáo sậu đông đúc cùng nhau đồng loạt cất cánh bay lên." }
    "椰" = @{ sentence = "南の島の砂浜には風に揺れる椰子の木が並んでいます。"; translation = "Dọc theo bãi cát trắng của hòn đảo phương nam là những hàng dừa đung đưa theo làn gió biển." }
    "楓" = @{ sentence = "秋が深まると山一面の楓が鮮やかな赤色に染まります。"; translation = "Khi mùa thu dần về sâu, những rặng cây phong trên khắp sườn núi nhuộm một sắc đỏ rực rỡ." }
    "楠" = @{ sentence = "古い神社の境内には樹齢数百年の巨大な楠が立っています。"; translation = "Trong khuôn viên ngôi đền cổ kính có một cây long não đại thụ hàng trăm năm tuổi đứng sừng sững." }
    "榛" = @{ sentence = "野山を散策しながら自生している榛の実を見つけました。"; translation = "Trong lúc tản bộ nơi đồi núi tự nhiên, tôi đã tìm thấy những quả phỉ cây phỉ mọc hoang dã." }
    "槙" = @{ sentence = "日本庭園の生垣には手入れの行き届いた羅漢槙が植えられています。"; translation = "Hàng rào của khu vườn truyền thống Nhật Bản được trồng những cây thông La Hán được cắt tỉa chăm chút kỹ lưỡng." }
    "槻" = @{ sentence = "村の広場の中央に堂々とした大槻の木が枝を広げています。"; translation = "Tại trung tâm quảng trường ngôi làng, một cây du khổng lồ bề thế đang xòe rộng cành lá sum suê." }
    "樺" = @{ sentence = "高原の涼しい風に揺れる白樺の並木道がとても爽やかです。"; translation = "Con đường rợp bóng hàng cây bạch dương đu đưa theo làn gió mát lành vùng cao nguyên thật sảng khoái." }
    "檀" = @{ sentence = "寺院の本堂には白檀の清らかな香りが漂っています。"; translation = "Trong gian chính điện của ngôi chùa thoang thoảng hương thơm thanh tịnh của gỗ bạch đàn hương." }
    "欣" = @{ sentence = "長年の努力が実を結び家族全員が欣喜雀躍しました。"; translation = "Những nỗ lực bao năm tháng đã đơm hoa kết trái khiến cả gia đình vui sướng khôn xiết mừng rỡ reo hò." }
    "欽" = @{ sentence = "世界的な偉業を成し遂げた学者に対して深い欽仰の念を抱きます。"; translation = "Tôi dành sự kính phục khâm ngưỡng sâu sắc đối với vị học giả đã đạt được thành tựu vĩ đại tầm cỡ thế giới." }
    "毬" = @{ sentence = "色とりどりの絹糸で編まれた手毬は伝統工芸品として有名です。"; translation = "Những quả bóng temari được thêu dệt từ các sợi tơ lụa ngũ sắc rực rỡ nổi tiếng là tác phẩm thủ công truyền thống." }
    "汐" = @{ sentence = "潮が引いたあとの砂浜で家族と一緒に潮干狩りを楽しみました。"; translation = "Cả gia đình vui vẻ cùng nhau đi bắt ngao sò trên bãi cát ven biển sau khi thủy triều rút xuống." }
    "洵" = @{ sentence = "彼の誠実な態度と思いやりは洵に賞賛に値します。"; translation = "Thái độ chân thành và lòng trắc ẩn của anh ấy thực sự vô cùng đáng được khen ngợi." }
    "洸" = @{ sentence = "朝日を浴びて水面が洸洋たる大海原のように美しく輝きます。"; translation = "Đón lấy ánh ban mai buổi sớm, mặt nước lấp lánh bao la như một đại dương vô tận tuyệt đẹp." }
    "渥" = @{ sentence = "遠方からの来客を心温まる渥情をもってもてなしました。"; translation = "Đón tiếp những vị khách từ phương xa đến bằng tất cả tấm lòng hiếu khách nồng hậu và ấm áp." }
    "滉" = @{ sentence = "夕日に照らされた湖が滉々たる金色の輝きを放っています。"; translation = "Mặt hồ phẳng lặng được ánh hoàng hôn chiếu rọi tỏa ra một sắc vàng lấp lánh mênh mông." }
    "澪" = @{ sentence = "波間を進む船が水面に白い澪標を残して遠ざかります。"; translation = "Con thuyền rẽ sóng lướt đi, để lại dấu luồng nước trắng xóa trên mặt biển rồi dần khuất xa." }
    "熙" = @{ sentence = "新しい時代の幕開けと共に国家が熙和であることを祈ります。"; translation = "Cùng với sự mở đầu của một thời đại mới, cầu chúc cho non sông đất nước luôn thái bình hòa thuận." }
    "燎" = @{ sentence = "真夏の夜の祭りで夜空を焦がす燎原の火のようにかがり火が燃え上がります。"; translation = "Trong lễ hội đêm hè, đống lửa trại bùng cháy rừng rực tựa ngọn lửa thiêu đốt cả góc trời đêm." }
    "燦" = @{ sentence = "南国の青い海の上に燦然たる太陽の光が降り注いでいます。"; translation = "Ánh mặt trời rực rỡ chói chang tỏa xuống làn nước biển trong xanh của hòn đảo nhiệt đới." }
    "燿" = @{ sentence = "夜空に打ち上げられた大輪の花火が華麗な閃光を燿かせています。"; translation = "Những chùm pháo hoa rực rỡ bắn lên trời đêm tỏa ra ánh sáng lấp lánh diệu kỳ." }
    "爾" = @{ sentence = "古典文学の対話篇には汝爾という親しい呼びかけが頻繁に登場します。"; translation = "Trong các tác phẩm văn học cổ điển, cách xưng hô thân mật 'nhĩ' thường xuyên xuất hiện." }
    "玖" = @{ sentence = "黒い艶のある美しい漆黒の玖玉が宝飾品として珍重されています。"; translation = "Viên ngọc đen bóng bẩy tuyệt đẹp quý hiếm được trân trọng như một món trang sức vô giá." }
    "琉" = @{ sentence = "エメラルドグリーンの海に囲まれた琉球の島々を旅しました。"; translation = "Tôi đã có chuyến du lịch trải nghiệm qua các hòn đảo Ryukyu được bao bọc bởi biển xanh màu ngọc bích." }
    "琳" = @{ sentence = "風鈴が揺れるたびに清らかな琳琅たる美しい音が響き渡ります。"; translation = "Mỗi khi chiếc chuông gió khẽ đung đưa, âm thanh trong trẻo thánh thót ngân vang khắp không gian." }
    "瑚" = @{ sentence = "沖縄の澄んだ海で色鮮やかな珊瑚礁の間を泳ぐ魚たちを見ました。"; translation = "Trong làn nước biển trong vắt ở Okinawa, tôi ngắm nhìn đàn cá bơi lội giữa những rạn san hô rực rỡ." }
    "瑛" = @{ sentence = "水晶のように澄み渡った瑛玉が光を浴びて七色にきらめきます。"; translation = "Viên ngọc trong vắt tựa pha lê lấp lánh phát ra bảy sắc cầu vồng khi đón ánh sáng chiếu rọi." }
    "瑳" = @{ sentence = "詩経にある巧笑倩たり美目瑳たりという美しい表現に魅了されました。"; translation = "Tôi bị mê hoặc bởi biểu cảm tuyệt mỹ 'nụ cười duyên dáng, đôi mắt sáng trong ngời' trong Kinh Thi." }
    "瑶" = @{ sentence = "伝説の仙人が住む瑶池のほとりには不老不死の桃が実ると言われます。"; translation = "Tương truyền bên bờ Dao Trì nơi các vị tiên sinh sống, có những trái đào trường sinh bất lão đơm hoa kết trái." }
    "甫" = @{ sentence = "春の気配が甫めて感じられる頃に野原の草木が芽吹き始めます。"; translation = "Vào thời điểm bắt đầu cảm nhận được hơi thở mùa xuân, cây cỏ ngoài đồng nội bắt đầu đâm chồi nảy lộc." }
    "畝" = @{ sentence = "春の畑に土を盛り上げて野菜の種を植えるための畝を作りました。"; translation = "Tôi vun đất tơi xốp trên luống cày để tạo thành các luống đất trồng hạt giống rau xuân." }
    "皓" = @{ sentence = "夜空に浮かぶ皓々たる満月の光が静かな湖面を照らしています。"; translation = "Ánh trăng rằm sáng vằng vặc trên bầu trời đêm soi bóng xuống mặt hồ tĩnh lặng." }
    "眸" = @{ sentence = "彼女の澄んだ瞳の明眸には純粋な優しさが満ちあふれています。"; translation = "Trong đôi mắt trong veo sáng ngời của cô ấy tràn ngập một lòng tốt thuần khiết, dịu dàng." }
    "碩" = @{ sentence = "大学院で長年の研究を重ねて碩学と呼ばれる教授に指導を受けました。"; translation = "Tại viện cao học, tôi may mắn được thọ giáo vị giáo sư uyên thâm thạc học sau nhiều năm nghiên cứu." }
    "祐" = @{ sentence = "神仏の神祐に感謝しながら日々穏やかに平穏無事を祈ります。"; translation = "Thành tâm cảm tạ sự phù hộ độ trì của thần phật và cầu chúc cho chuỗi ngày bình yên vô sự." }
    "租" = @{ sentence = "古代の律令制において農民は租庸調という税を納めていました。"; translation = "Dưới thể chế Luật Lệnh thời cổ đại, người nông dân phải nộp các loại thuế Tô, Dung, Điệu." }
    "秦" = @{ sentence = "紀元前に中国全土を初めて統一したのは秦の始皇帝でした。"; translation = "Người đầu tiên thống nhất toàn bộ đất nước Trung Hoa trước Công nguyên chính là Tần Thủy Hoàng." }
    "稜" = @{ sentence = "険しい連峰の稜線を歩きながら雄大な山のパノラマを堪能しました。"; translation = "Vừa đi dọc theo gờ sống núi của dãy núi hiểm trở, tôi vừa chiêm ngưỡng toàn cảnh núi non hùng vĩ." }
    "窑" = @{ sentence = "伝統の陶芸作家が丹精込めて登り窑で美しい陶器を焼き上げます。"; translation = "Nghệ nhân gốm truyền thống dồn hết tâm huyết nung những món đồ gốm tuyệt mỹ trong lò nung bậc thang." }
    "竣" = @{ sentence = "三年間にわたる大規模な橋の建設工事が無事に竣工しました。"; translation = "Công trình xây dựng cây cầu quy mô lớn kéo dài suốt ba năm đã được hoàn thành thi công tốt đẹp." }
    "笙" = @{ sentence = "雅楽の演奏会で天から降り注ぐ光のような笙の音が響き渡りました。"; translation = "Tại buổi hòa nhạc Nhã nhạc, âm thanh chiếc khèn Sho ngân vang như ánh sáng từ trời cao tuôn trào xuống." }
    "笹" = @{ sentence = "七夕祭りのために願い事を書いた短冊を笹の枝に結びつけました。"; translation = "Tôi đã buộc những mảnh giấy ghi lời ước nguyện lên cành tre sasa nhân dịp lễ Thất Tịch." }
    "紘" = @{ sentence = "天地を包み込む八紘の広大な世界に思いを馳せます。"; translation = "Phóng tầm mắt suy ngẫm về thế giới bao la bát ngát bao trùm cả trời đất." }
    "紬" = @{ sentence = "熟練の職人が真綿から糸を紡ぎ丁寧に紬の織物を仕立てます。"; translation = "Người nghệ nhân lành nghề kéo sợi từ kén tằm và dệt nên tấm vải lụa tơ tằm tsumugi tinh xảo." }
    "絃" = @{ sentence = "琴の三絃をつま弾くと日本の伝統的な情緒ある旋律が流れます。"; translation = "Khi gảy lên ba dây đàn koto, một giai điệu đậm đà phong vị truyền thống Nhật Bản liền ngân vang." }
    "絢" = @{ sentence = "格式高い歌舞伎の舞台には絢爛たる豪華な衣装が勢揃いします。"; translation = "Trên sân khấu kịch Kabuki trang trọng quy tụ những bộ trang phục lộng lẫy xa hoa rực rỡ." }
    "綜" = @{ sentence = "集められた多角的なデータを綜合して今後の市場戦略を立案します。"; translation = "Tổng hợp toàn diện các nguồn dữ liệu đa chiều đã thu thập để lập chiến lược thị trường sắp tới." }
    "綸" = @{ sentence = "朝廷の最高権力者から発布された重い綸旨を厳粛に受け取りました。"; translation = "Nghiêm cẩn tiếp nhận chỉ dụ sắc chỉ trọng thể được ban bố từ người nắm quyền lực cao nhất của triều đình." }
    "緋" = @{ sentence = "紅葉の季節には庭園の池が鮮やかな緋色のモミジで彩られます。"; translation = "Vào mùa lá đỏ, hồ nước trong hoa viên được tô điểm rực rỡ bởi sắc lá phong đỏ thắm kiêu sa." }
    "翁" = @{ sentence = "昔話に登場する竹取の翁は竹林の中で光り輝く竹を見つけました。"; translation = "Ông lão đốn tre trong câu chuyện cổ tích đã tìm thấy một đốt tre phát sáng kỳ diệu giữa rừng trúc." }
    "耀" = @{ sentence = "夜空を埋め尽くす満天の星がまばゆい光を耀かせています。"; translation = "Hàng ngàn vì sao lấp lánh phủ kín bầu trời đêm đang tỏa ra những luồng sáng rực rỡ huy hoàng." }
    "耶" = @{ sentence = "古代の神話や伝説の物語に有耶無耶な謎が多く残されています。"; translation = "Trong các câu chuyện thần thoại cổ xưa còn lưu lại rất nhiều điều bí ẩn mập mờ chưa có lời giải." }
    "肇" = @{ sentence = "新しく設立された団体の肇興を祝って記念式典が盛大に催されました。"; translation = "Buổi lễ kỷ niệm long trọng đã được tổ chức tưng bừng để chúc mừng sự khởi đầu thành lập của đoàn thể mới." }
    "胤" = @{ sentence = "名門の血筋を引く高貴な血胤として誇りを持って生きています。"; translation = "Sống tràn đầy tự hào với tư cách là dòng dõi quý tộc kế thừa huyết thống của một gia tộc danh giá." }
    "脩" = @{ sentence = "日々の学問を通じて徳性を脩め立派な社会人を目指します。"; translation = "Thông qua việc học tập rèn luyện mỗi ngày để trau dồi đức hạnh và hướng tới trở thành công dân gương mẫu." }
    "脹" = @{ sentence = "急激な経済成長に伴って国の財政規模が大きく膨脹しました。"; translation = "Đi đôi với sự tăng trưởng kinh tế nhanh chóng, quy mô tài chính của đất nước đã phình to đáng kể." }
    "舜" = @{ sentence = "古代の聖王として名高い舜帝は深い慈愛で民を統治しました。"; translation = "Vua Thuấn nổi tiếng là vị thánh vương thời cổ đại đã cai trị bách tính bằng lòng nhân từ bao la." }
    "芙" = @{ sentence = "夏の朝に庭の池で淡いピンク色の美しい芙蓉の花が開きました。"; translation = "Vào một buổi sáng mùa hè, những bông hoa phù dung màu hồng phấn tuyệt đẹp đã nở rộ trên hồ nước." }
    "芹" = @{ sentence = "正月七日に健康を願って七草粥を作り香りの良い芹を入れました。"; translation = "Vào ngày mùng 7 tháng Giêng, tôi nấu cháo thất thảo cầu chúc sức khỏe và bỏ thêm rau cần thơm nức." }
    "茉" = @{ sentence = "リラックスするために芳醇な香りの茉莉花茶を一杯淹れました。"; translation = "Tôi pha một tách trà hoa nhài thơm ngát đậm đà để thư giãn tinh thần." }
    "莞" = @{ sentence = "友人からの心温まる手紙を読んで思わず莞爾と微笑みました。"; translation = "Đọc bức thư ấm áp của người bạn phương xa, tôi bất giác mỉm cười rạng rỡ." }
    "蓉" = @{ sentence = "初秋の澄んだ空の下で芙蓉の花が優雅に咲き誇っています。"; translation = "Dưới bầu trời đầu thu trong xanh lộng gió, những đóa hoa phù dung đang kiêu hãnh khoe sắc tao nhã." }
    "蔦" = @{ sentence = "古い洋館のレンガ壁に沿って青々とした蔦が生い茂っています。"; translation = "Dọc theo bức tường gạch của tòa biệt thự cổ kiểu Tây, dây thường xuân xanh tươi mọc um tùm." }
    "蕗" = @{ sentence = "春の訪れとともに山道で蕗の薹を見つけて天ぷらにしました。"; translation = "Khi mùa xuân ghé thăm, tôi tìm thấy ngọn nụ hoa fuki non ven đường núi và làm món tempura giòn rụm." }
    "虞" = @{ sentence = "台風の接近に伴って川の氾濫の虞があるため警戒を強めています。"; translation = "Do bão đang tiến gần có nguy cơ mối lo ngại ngập lụt bờ sông nên công tác cảnh giác được tăng cường." }
    "衿" = @{ sentence = "着物を美しく着こなすために衿元を丁寧に整えました。"; translation = "Để mặc bộ kimono thật chỉnh tề và duyên dáng, cô ấy đã cẩn thận vuốt lại cổ áo." }
    "詔" = @{ sentence = "国家の重大な危機に際して陛下より厳粛な詔勅が下されました。"; translation = "Trước cuộc khủng hoảng trọng đại của quốc gia, một chiếu chỉ sắc lệnh tôn nghiêm đã được ban bố." }
    "詢" = @{ sentence = "学識経験者に意見を諮詢して新しい環境政策の原案を作成しました。"; translation = "Tham vấn ý kiến trưng cầu từ các chuyên gia học giả để soạn thảo dự thảo chính sách môi trường mới." }
    "諄" = @{ sentence = "恩師は若い学生たちに向けて諄々と道理を説いて聞かせました。"; translation = "Người thầy đáng kính đã ân cần khuyên nhủ, giảng giải tường tận từng đạo lý làm người cho sinh viên trẻ." }
    "諒" = @{ sentence = "諸般の事情をご賢察のうえ何卒ご諒承くださいますようお願いします。"; translation = "Kính mong quý khách thấu hiểu cho mọi lý do hoàn cảnh mà rộng lòng lượng thứ thông cảm." }
    "謄" = @{ sentence = "不動産の正式な権利を確認するために登記簿謄本を取り寄せました。"; translation = "Tôi đã yêu cầu cấp bản sao công chứng sổ đăng ký bất động sản để xác thực quyền sở hữu hợp pháp." }
    "赳" = @{ sentence = "若き武道家たちが胸を張り堂々たる赳々とした足取りで行進します。"; translation = "Các võ sĩ trẻ tuổi ưỡn ngực hiên ngang bước đi với những bước chân dũng mãnh đầy khí phách." }
    "迪" = @{ sentence = "先人の尊い教えを啓迪として未来へ向けた正しい道を進みます。"; translation = "Lấy những lời dạy cao quý của tiền nhân làm kim chỉ nam soi đường để bước tiếp trên con đường đúng đắn." }
    "逓" = @{ sentence = "日本の近代化において逓信事業は情報伝達に大きな役割を果たしました。"; translation = "Trong công cuộc hiện đại hóa của Nhật Bản, ngành bưu chính điện tín đóng vai trò to lớn trong truyền tải thông tin." }
    "邑" = @{ sentence = "大都市の喧騒から離れた静かな農邑で自給自足の生活を送っています。"; translation = "Rời xa sự xô bồ của chốn đô thị hoa lệ, tôi sống cuộc đời tự cung tự cấp tại một thôn ấp nông thôn thanh bình." }
    "郁" = @{ sentence = "満開の梅林から郁々たる芳香が風に乗って漂ってきます。"; translation = "Từ rừng mơ hoa đang nở rộ, hương thơm ngào ngạt nồng nàn nương theo làn gió thoang thoảng bay tới." }
    "酉" = @{ sentence = "新年の挨拶状に今年の干支である酉の可愛らしい絵を描きました。"; translation = "Trên tấm thiệp chúc mừng năm mới, tôi vẽ hình chú gà con đáng yêu đại diện cho năm Dậu này." }
    "銑" = @{ sentence = "巨大な高炉から溶けた銑鉄が真っ赤に流れる光景は圧巻です。"; translation = "Cảnh tượng những dòng gang lỏng nóng đỏ rực tuôn chảy từ lò cao khổng lồ thật vô cùng choáng ngợp." }
    "錘" = @{ sentence = "魚釣りの仕掛けに適切な重さの鉛の錘を取り付けました。"; translation = "Tôi gắn thêm quả chì quả dọi có trọng lượng thích hợp vào bộ cần câu cá." }
    "鞠" = @{ sentence = "京都の古社で平安装束を身にまとった人々が蹴鞠を披露しました。"; translation = "Tại ngôi đền cổ kính ở Kyoto, những người mặc trang phục thời Heian đã trình diễn trò chơi đá cầu kemari." }
    "頌" = @{ sentence = "人類の平和と友愛を讃えるベートーヴェンの歓喜の頌歌が響きます。"; translation = "Bài ca tụng hoan ca ca ngợi hòa bình và tình bác ái của nhân loại do Beethoven sáng tác đang vang dội." }
    "馨" = @{ sentence = "初夏の庭に咲き誇る白百合の馨しい香りに包まれて癒やされます。"; translation = "Tâm hồn được xoa dịu khi đắm chìm trong hương thơm ngát của những đóa loa kèn trắng nở rộ trong vườn đầu hè." }
    "魁" = @{ sentence = "厳しい寒さの中でいち早く咲く梅の花は春の魁と呼ばれます。"; translation = "Hoa mai nở sớm nhất giữa trời đông lạnh giá được mệnh danh là sứ giả tiên phong đón chào mùa xuân." }
    "鳳" = @{ sentence = "古寺の屋根の上に黄金に輝く鳳凰の像が高くそびえています。"; translation = "Trên nóc ngôi chùa cổ, bức tượng chim phượng hoàng tỏa ánh hoàng kim sừng sững vươn cao." }
    "鴻" = @{ sentence = "若者たちが遠大な夢と鴻図を抱いて世界へと羽ばたきます。"; translation = "Những người trẻ tuổi ấp ủ ước mơ to lớn và hoài bão vĩ đại để tung cánh vươn ra thế giới." }
    "鵬" = @{ sentence = "大空を雄大に舞う鵬鳥のように自由で広い視野を持ちたいです。"; translation = "Tôi muốn có được một tầm nhìn rộng mở và tự do như cánh chim đại bàng sải cánh bay lượn trên bầu trời xanh thẳm." }
    "黛" = @{ sentence = "遠くに見える連山が青黒い美しい峰を描いて黛色に霞んでいます。"; translation = "Dãy núi trập trùng phía xa xa mờ ảo trong sắc xanh biếc như một bức tranh thủy mặc hữu tình." }
}

Write-Host "Curated entries count: $($curated.Count)"

# Validate every entry
$allOk = $true
$seenSentences = New-Object 'System.Collections.Generic.HashSet[string]'
foreach ($k in $curated.Keys) {
    $entry = $curated[$k]
    $sent = $entry.sentence
    $trans = $entry.translation
    
    if (-not $sent.Contains($k)) {
        Write-Error "ERROR: Kanji '$k' not found in sentence: $sent"
        $allOk = $false
    }
    if ([string]::IsNullOrWhiteSpace($trans)) {
        Write-Error "ERROR: Empty translation for '$k'"
        $allOk = $false
    }
    if ($seenSentences.Contains($sent)) {
        Write-Error "ERROR: Duplicate sentence: $sent"
        $allOk = $false
    }
    [void]$seenSentences.Add($sent)
}

if ($allOk) {
    Write-Host "All $($curated.Count) curated entries PASSED verification (strictly contains target kanji, valid translation, zero duplicates)!"
    $json = $curated | ConvertTo-Json -Depth 3
    [System.IO.File]::WriteAllText('data\curated_unmatched_examples.json', $json, [System.Text.Encoding]::UTF8)
    Write-Host "Saved to data\curated_unmatched_examples.json"
}
