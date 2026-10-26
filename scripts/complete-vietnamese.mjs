import fs from 'node:fs';
const en=JSON.parse(fs.readFileSync('messages/en.json','utf8'));
const vi=JSON.parse(fs.readFileSync('messages/vi.json','utf8'));
vi.Navigation={language:'Đổi ngôn ngữ',primary:'Điều hướng chính',openMenu:'Mở menu',closeMenu:'Đóng menu'};
vi.Home.process.body='Quy trình rõ ràng, có thể lặp lại để chuyển tín hiệu kinh doanh thành hệ thống AI đáng tin cậy — từ phân tích đến vận hành, với cơ chế quản trị ngay từ đầu.';
vi.Home.nav.caseStudies='Dự án tiêu biểu';
vi.Home.hero.kicker='Studio hệ thống AI';
vi.Home.stats[0].value='VPC / Tại chỗ';vi.Home.stats[2].value='Đánh giá trước';
['Công cụ tri thức doanh nghiệp','Vận hành tác tử','Tùy chỉnh mô hình','Trí tuệ đa phương thức'].forEach((title,i)=>vi.Home.features.items[i].title=title);
['Riêng tư mặc định','Đánh giá trước khi mở rộng','Con người tham gia kiểm soát'].forEach((label,i)=>vi.Home.why.items[i].label=label);
['Lập bản đồ quy trình','Xây dựng lõi hệ thống','Đánh giá tình huống khó','Triển khai có quản trị'].forEach((title,i)=>vi.Home.process.items[i].title=title);
vi.Profiles=structuredClone(en.Profiles);
function page(key,header,stats,cardsTitle,cards,rowsTitle,rows,proofTitle,proof,cta){
 const p=vi.Profiles[key];
 [p.kicker,p.title,p.description]=header;
 p.stats=stats.map(([value,label])=>({value,label}));p.cardsTitle=cardsTitle;
 p.cards=cards.map(([eyebrow,title,description])=>({eyebrow,title,description}));
 p.rowsKicker='Phương pháp';p.rowsTitle=rowsTitle;p.rows=rows.map(([label,title,description])=>({label,title,description}));
 p.proofKicker='Minh chứng';p.proofTitle=proofTitle;p.proof=proof.map(([sector,title,description,outcome])=>({sector,title,description,outcome}));
 p.ctaKicker='Bước tiếp theo';[p.ctaTitle,p.ctaBody,p.ctaLabel]=cta;
}
page('company',['Hồ sơ công ty','Công ty hệ thống AI công nghệ cao, xây dựng từ thực tế vận hành.','NativeLab AI thiết kế hệ thống AI riêng tư cho doanh nghiệp cần tự động hóa có thể đo lường, truy xuất tri thức đáng tin cậy và hỗ trợ quyết định có kiểm soát.'],[['AI nguyên bản','Hệ thống được thiết kế theo hành vi mô hình và hoạt động thực tế'],['Riêng tư','Lựa chọn triển khai cho dữ liệu doanh nghiệp được quản trị'],['Đánh giá trước','Cổng chất lượng trước khi triển khai diện rộng']],
'Điều làm nên công ty',[
['Sứ mệnh','Biến AI thành công cụ hữu ích trong vận hành','Chúng tôi xây dựng theo công việc thực tế: tìm tri thức, chuẩn bị quyết định, xem xét ngoại lệ và chuyển nhiệm vụ qua quy trình an toàn.'],
['Mô hình studio','Đội ngũ chuyên gia nhỏ, sát với quy trình','Chiến lược, thiết kế sản phẩm, kỹ thuật mô hình và kế hoạch triển khai được thực hiện cùng nhau để hệ thống phù hợp với doanh nghiệp sử dụng.'],
['Tiêu chuẩn','Không chỉ dừng ở bản demo','Mỗi dự án đều tính đến đánh giá, ranh giới dữ liệu, chuyển cấp, giám sát và trách nhiệm sau khi ra mắt.']],
'Mô hình hoạt động của công ty',[
['01','Bắt đầu từ quy trình kinh doanh','Chúng tôi xác định luồng quyết định, người dùng, quyền dữ liệu, xử lý ngoại lệ và cách đo giá trị trước khi chọn mô hình hoặc tác tử.'],
['02','Tạo mẫu với ràng buộc vận hành','Phiên bản đầu tiên đã tính đến kiểm soát truy cập, chất lượng truy xuất, nhật ký, phản hồi và kiểm duyệt của con người.'],
['03','Triển khai với trách nhiệm rõ ràng','Xác định người quản lý câu lệnh, bộ dữ liệu, phê duyệt, giám sát và chu kỳ cải tiến khi hệ thống đi vào hoạt động.']],
'Dấu ấn năng lực',[
['Công việc tri thức','Bộ nhớ doanh nghiệp dưới dạng hệ thống AI','Kết nối chính sách, quy trình chuẩn, phiếu yêu cầu, tài liệu và dữ liệu vận hành thành lớp tri thức riêng tư.','Tìm kiếm nội bộ nhanh hơn với câu trả lời có thể truy nguồn.'],
['Vận hành','Chuẩn bị công việc với AI','Tác tử chuẩn bị nhiệm vụ, soạn tóm tắt, chuyển ngoại lệ và giữ quyền quyết định cuối cùng cho con người.','Giảm thao tác thủ công mà vẫn duy trì giám sát.']],
['Cần bản đồ năng lực chi tiết?','Khám phá các hệ thống AI chúng tôi thiết kế, từ công cụ tri thức đến vận hành tác tử và quy trình đánh giá.','Xem năng lực']);
page('capabilities',['Năng lực','Hệ thống AI cho tri thức, tự động hóa, đánh giá và công việc đa phương thức.','Các lớp năng lực dành cho đội ngũ cần tích hợp AI với công cụ, dữ liệu, chính sách và hoạt động kiểm duyệt.'],[['RAG','Truy xuất tri thức riêng tư và câu trả lời có trích dẫn'],['Tác tử','Quy trình gọi công cụ với điểm phê duyệt của con người'],['Đánh giá','Bộ kiểm thử và bảng điểm cho hành vi vận hành']],
'Dịch vụ cốt lõi',[
['Tri thức','Hệ thống RAG doanh nghiệp','Tiếp nhận tài liệu, chiến lược chia đoạn, biểu diễn nhúng, chất lượng tìm kiếm, trích nguồn, phân quyền và vòng phản hồi.'],
['Tự động hóa','Hệ thống quy trình tác tử','Tác tử suy luận nhiệm vụ, gọi công cụ được phép, chuẩn bị công việc và xin phê duyệt khi rủi ro tăng.'],
['Lớp mô hình','Tùy chỉnh và hệ thống câu lệnh','Kiến trúc câu lệnh, thích ứng lĩnh vực, chiến lược tinh chỉnh, định tuyến mô hình và bộ dữ liệu đánh giá tái sử dụng.'],
['Đa phương thức','Trí tuệ tài liệu, hình ảnh và âm thanh','Hệ thống phân loại, trích xuất, tóm tắt và chuyển thông tin từ nội dung vận hành phức tạp.']],
'Quy trình bàn giao',[
['Phạm vi','Xác định quy trình hẹp có giá trị cao','Xác định quy trình nơi AI giúp giảm thời gian, tăng tính nhất quán hoặc khai thác tri thức phân tán.'],
['Xây dựng','Tạo mẫu theo thực tế vận hành','Bản mẫu gồm giao diện, lõi truy xuất hoặc tác tử, đánh giá, phân quyền và hành vi bàn giao.'],
['Hoàn thiện','Từ bản mẫu đến hệ thống được quản trị','Bổ sung giám sát, dấu vết kiểm toán, phản hồi người dùng, phương án dự phòng và mô hình vận hành để cải tiến liên tục.']],
'Công việc tiêu biểu',[
['Tuân thủ','Công cụ tri thức chính sách','Trợ lý an toàn cho chính sách, kiểm soát và câu hỏi rà soát với câu trả lời có nguồn.','Giảm thời gian tìm kiếm, làm rõ bằng chứng rà soát.'],
['Vận hành khách hàng','Tác tử quy trình hỗ trợ','Tác tử tóm tắt hồ sơ, đề xuất hành động và chuyển trường hợp nhạy cảm cho nhân viên.','Xử lý nhất quán hơn trong quy trình lặp lại.']],
['Muốn xem kiến trúc hệ thống?','Trang công nghệ giải thích triển khai riêng tư, truy xuất, môi trường tác tử, khả năng quan sát và đánh giá.','Xem công nghệ']);
page('technology',['Công nghệ','Kiến trúc AI riêng tư cho quy trình doanh nghiệp được quản trị.','Kết hợp truy xuất, điều phối tác tử, định tuyến mô hình, đánh giá, khả năng quan sát và kiểm soát triển khai.'],[['VPC','Đám mây riêng và mô hình triển khai có kiểm soát'],['Kiểm toán','Nhật ký và luồng rà soát cho quy trình quan trọng'],['Bảng điểm','Đo hành vi trước và sau khi ra mắt']],
'Các lớp hệ thống',[
['Dữ liệu','Lớp truy xuất và phân quyền','Kết nối tài liệu, cơ sở dữ liệu, phiếu yêu cầu và kho tri thức, đồng thời giữ quy tắc truy cập và khả năng truy nguồn.'],
['Môi trường chạy','Điều phối tác tử','Lập kế hoạch, gọi công cụ, xác minh đầu ra, xin phê duyệt và bàn giao khi quy trình cần con người.'],
['Mô hình','Định tuyến và thích ứng mô hình','Chọn mô hình theo chi phí, độ trễ, độ chính xác, quyền riêng tư và hành vi chuyên ngành.'],
['Kiểm soát','Giám sát và đánh giá','Theo dõi chất lượng, độ trễ, mẫu sai lệch, sự kiện chuyển cấp, phản hồi và nguy cơ hồi quy.']],
'Bảo mật và quản trị',[
['Riêng tư','Triển khai nơi dữ liệu đang lưu trữ','Thiết kế cho VPC, đám mây riêng hoặc tại chỗ theo nhu cầu bảo mật và tuân thủ.'],
['Có kiểm soát','Con người phê duyệt hành động nhạy cảm','Quyền tự chủ của tác tử được giới hạn bởi chính sách, độ tin cậy, rủi ro và điểm phê duyệt rõ ràng.'],
['Có đo lường','Đánh giá trước và sau khi ra mắt','Tạo bộ kiểm thử, phân loại lỗi và kiểm tra hồi quy để quan sát hành vi vận hành.']],
'Mẫu kiến trúc',[
['Tìm kiếm an toàn','Truy xuất theo quyền truy cập','Người dùng chỉ truy xuất nội dung được phép, đồng thời luôn thấy ngữ cảnh nguồn của câu trả lời.','Tiếp cận tri thức tốt hơn mà không bỏ qua quản trị.'],
['Kiểm soát tác tử','Tự động hóa có cổng phê duyệt','Tác tử chuẩn bị và đề xuất công việc; con người phê duyệt hành động cuối trong quy trình nhạy cảm.','Tốc độ tự động hóa đi cùng kiểm soát vận hành.']],
['Cần minh chứng thực tế?','Khám phá dự án tiêu biểu cho đội ngũ tuân thủ, vận hành, nghiên cứu và thương mại.','Xem dự án tiêu biểu']);
page('case-studies',['Dự án tiêu biểu','Các dự án hệ thống AI tiêu biểu cho quy trình doanh nghiệp thực tế.','Những mẫu này thể hiện công việc NativeLab AI hướng đến: tri thức riêng tư, tác tử có kiểm soát, trí tuệ tài liệu và hỗ trợ quyết định vận hành.'],[['4','Mẫu dự án tiêu biểu'],['Con người rà soát','Điểm phê duyệt nằm trong quy trình'],['Có thể truy nguồn','Đầu ra kết nối với ngữ cảnh nguồn và nhật ký']],
'Ví dụ công việc',[
['Tuân thủ','Công cụ tri thức chính sách','Hệ thống tìm kiếm và trả lời an toàn cho kiểm soát, chính sách, ghi chú rà soát và hướng dẫn nội bộ.'],
['Vận hành','Tác tử vận hành khách hàng','Quy trình tác tử chuẩn bị tóm tắt hồ sơ, đề xuất bước tiếp theo và chuyển cấp tình huống nhạy cảm.'],
['Nghiên cứu','Quy trình trí tuệ tài liệu','Trích xuất, so sánh, tóm tắt và chuyển thông tin từ bộ tài liệu kỹ thuật dài.'],
['Thương mại','Trợ lý suy luận tồn kho','Lớp hỗ trợ quyết định kết hợp tín hiệu sản phẩm, nhu cầu và vận hành cho đội ngũ lập kế hoạch.']],
'Cách đánh giá từng dự án',[
['Phù hợp','AI có phù hợp với quy trình này?','Xác minh công việc có mẫu lặp lại, dữ liệu hữu ích, người dùng rõ ràng và giá trị đo lường được.'],
['Rủi ro','Điều gì có thể sai?','Ghi nhận rủi ro bịa thông tin, truy xuất sai, tự động hóa quá mức, ranh giới riêng tư và yêu cầu rà soát.'],
['Mở rộng','Vận hành thế nào sau khi ra mắt?','Xác định giám sát, trách nhiệm, vòng phản hồi và quy trình vận hành trước khi mở rộng.']],
'Kết quả chọn lọc',[
['Tuân thủ','Tìm bằng chứng nhanh hơn','Câu trả lời chính sách giữ liên kết với ngữ cảnh nguồn để người rà soát xác minh thay vì làm lại từ đầu.','Giảm tìm kiếm thủ công trong chu kỳ rà soát.'],
['Vận hành','Chuẩn bị hồ sơ nhất quán hơn','Tác tử soạn tóm tắt và đề xuất bước tiếp theo theo cùng quy tắc kinh doanh giữa các nhóm.','Giảm biến động trong công việc vận hành lặp lại.'],
['Nghiên cứu','Rà soát tài liệu có cấu trúc','Tài liệu dài được trích thành trường nhất quán, so sánh và chuyển chuyên gia rà soát.','Chuyên gia tập trung đánh giá thay vì sắp xếp.']],
['Có quy trình tương tự?','Gửi quy trình, nguồn dữ liệu, người dùng và ràng buộc rủi ro. Chúng tôi sẽ phác thảo hướng đi đầu tiên.','Bắt đầu trao đổi']);
page('contact',['Liên hệ','Bắt đầu từ quy trình, ranh giới dữ liệu và quyết định bạn muốn cải thiện.','Cuộc trao đổi đầu tiên nên cụ thể: đội ngũ nào phụ trách, dữ liệu nào liên quan, quyết định nào cần hỗ trợ và cần kiểm soát rủi ro gì.'],[['24–48 giờ','Thời gian phản hồi thường gặp cho yêu cầu mới'],['30 phút','Trao đổi ban đầu về mức độ phù hợp'],['4–8 tuần','Khung thời gian tạo mẫu cho quy trình phù hợp']],
'Kênh liên hệ',[
['Dự án mới','Trao đổi về hệ thống AI','Chia sẻ quy trình, người dùng, nguồn dữ liệu, công cụ hiện có và điều bản mẫu đầu tiên cần chứng minh.'],
['Rà soát kỹ thuật','Đánh giá sáng kiến AI hiện có','Mang bản mẫu, hệ thống RAG hoặc quy trình tác tử để đánh giá, rà soát rủi ro và lập kế hoạch vận hành.'],
['Hợp tác','Cùng xây dựng với NativeLab AI','Dành cho đội ngũ sản phẩm, tư vấn và vận hành cần đối tác chuyên sâu về hệ thống AI.']],
'Thông tin cần cung cấp',[
['Bối cảnh','Quy trình kinh doanh','Mô tả quy trình, đội ngũ, vai trò, điểm quyết định và nơi công việc đang chậm hoặc thiếu nhất quán.'],
['Dữ liệu','Ranh giới thông tin','Liệt kê tài liệu, hệ thống, cơ sở dữ liệu, API và giới hạn riêng tư mà hệ thống AI cần tôn trọng.'],
['Kết quả','Kết quả đo lường đầu tiên','Xác định điều bản mẫu thành công cần chứng minh trước khi lập kế hoạch vận hành.']],
'Mức độ phù hợp',[
['Phù hợp nhất','Hệ thống AI theo quy trình cụ thể','Hệ thống tri thức riêng tư, tác tử có kiểm soát, đánh giá mô hình, trí tuệ tài liệu và trợ lý vận hành.','Phù hợp với đội ngũ có dữ liệu thật và người phụ trách rõ ràng.'],
['Ít phù hợp','Yêu cầu chatbot chung chung','Dự án chatbot chỉ để demo, không có chủ dữ liệu, bối cảnh quy trình hoặc yêu cầu vận hành.','Chúng tôi sẽ thu hẹp phạm vi trước khi xây dựng.']],
['Gửi bản mô tả quy trình','Gửi email về quy trình, nguồn dữ liệu, đội ngũ và kết quả mong muốn. Chúng tôi sẽ phản hồi bước tiếp theo phù hợp.','Gửi email cho NativeLab AI']);
vi.Visual=Object.fromEntries(Object.keys(en.Visual).map((key,i)=>[key,[
'THỰC TẾ','Xây dựng cho vận hành thực tế.','RIÊNG TƯ','Dữ liệu ở trong môi trường của bạn.','MỞ RỘNG','Từ thử nghiệm đến triển khai doanh nghiệp.','ĐÁNG TIN CẬY','Quản trị và đánh giá ngay từ thiết kế.','Tri thức','Tự động hóa','Đánh giá','Đa phương thức','Mô hình','Bảo mật','Điều phối','Quan sát','Mô hình phù hợp cho từng nhiệm vụ','Dữ liệu của bạn luôn riêng tư','Tác tử và quy trình','Giám sát theo thời gian thực','Tài liệu riêng tư và dữ liệu chuyên ngành','Tích hợp công cụ và quy trình doanh nghiệp','Bộ kiểm thử và hành vi thực tế','Điều phối nhiều tác tử có quản trị','Tác tử','TÁC ĐỘNG\nKINH DOANH\nTHỰC TẾ','AN TOÀN\nRIÊNG TƯ\nMỞ RỘNG','QUAN SÁT\nĐÁNH GIÁ\nTIN CẬY','RANH GIỚI\nDỮ LIỆU','QUY TRÌNH','QUYẾT ĐỊNH','Truy xuất','Đánh giá','Tác tử','ĐẠT','LƯU Ý','Kết nối với','dữ liệu an toàn.','Kiểm tra hiệu quả','trong thực tế.','Thực hiện hành động','trong công cụ của bạn.'
][i]]));
fs.writeFileSync('messages/vi.json',JSON.stringify(vi,null,2)+'\n');

const chats={
en:['Contact our team','Hello 👋 How can we help? Choose a contact option below to tell us about your project.','Email','Phone','Contact','Open contact chat','Close contact chat'],
th:['ติดต่อทีมงาน','สวัสดี 👋 ให้เราช่วยเรื่องอะไร? เลือกช่องทางด้านล่างเพื่อพูดคุยเกี่ยวกับโครงการของคุณ','อีเมล','โทรศัพท์','ติดต่อ','เปิดหน้าต่างติดต่อ','ปิดหน้าต่างติดต่อ'],
lo:['ຕິດຕໍ່ທີມງານ','ສະບາຍດີ 👋 ໃຫ້ພວກເຮົາຊ່ວຍຫຍັງ? ເລືອກຊ່ອງທາງລຸ່ມນີ້ເພື່ອປຶກສາໂຄງການຂອງທ່ານ.','ອີເມວ','ໂທລະສັບ','ຕິດຕໍ່','ເປີດໜ້າຕ່າງຕິດຕໍ່','ປິດໜ້າຕ່າງຕິດຕໍ່'],
'zh-CN':['联系我们的团队','您好 👋 有什么可以帮您？请选择下方联系方式，与我们讨论您的项目。','电子邮件','电话','联系','打开联系窗口','关闭联系窗口'],
vi:['Liên hệ đội ngũ','Xin chào 👋 Chúng tôi có thể giúp gì? Chọn kênh liên hệ bên dưới để trao đổi về dự án của bạn.','Email','Điện thoại','Liên hệ','Mở cửa sổ liên hệ','Đóng cửa sổ liên hệ']};
for(const [locale,values] of Object.entries(chats)){const path=`messages/${locale}.json`;const m=JSON.parse(fs.readFileSync(path));m.Chat=Object.fromEntries(['status','greeting','email','phone','contact','open','close'].map((k,i)=>[k,values[i]]));fs.writeFileSync(path,JSON.stringify(m,null,2)+'\n');}
