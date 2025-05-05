import React from "react";
import Back_To_Top from "../../../components/base/backtop/Back_to_top";
import Footer from "../../../layout/user/footer/Footer";
import Navbar from "../../../layout/user/navbar/Navbar";
import { Link } from "react-router-dom";

export default function About({ cartLength, setIsLoad }) {
  return (
    <div>
      <>
        <Navbar cartLength={cartLength} />

        {/* Breadcrumb Begin */}
        <div className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__links">
                  <Link to="/">
                    <i className="fa fa-home" /> Home
                  </Link>
                  <span>About</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />
        <div className="container">
          <div className="about-header " style={{ textAlign: "center" }}>
            <h3>
              <b>Về Chúng Tôi</b>
            </h3>
          </div>{" "}
          <br /> <br />
          <div className="about-content">
            <p>
              <b>LYZA.COM</b> làm cho bạn tỏa sáng trong những ngày đặc biệt
              của bạn, đặc biệt dành cho những người phụ nữ xinh đẹp. Mục tiêu
              của chúng tôi là luôn tôn vinh BẠN! Để có được điều tốt nhất ở
              bạn, chúng tôi đã mang đến một bộ sưu tập khổng lồ cho dù bạn đang
              tham dự một bữa tiệc, đám cưới và tất cả những sự kiện yêu cầu
              váy.
            </p>
            <p>
              <b>-Về chúng tôi</b>
            </p>
            <p>
              <b>LYZA.COM</b> là một trang web mua sắm thời trang mới mang đến
              những sản phẩm thời trang hợp thời trang với mức giá hấp dẫn.
              Chúng tôi cảm thấy thời trang không phải là thứ bạn mặc mà là cảm
              nhận của bạn, vì vậy, hãy ghi nhớ điều này, chúng tôi đã mang đến
              cho bạn những bộ quần áo được thiết kế riêng bao gồm nhiều mẫu
              thiết kế, kiểu dáng và hình in để đáp ứng mọi tâm trạng, ý thích
              và sở thích của bạn..
            </p>
            <p>-Tầm nhìn của chúng tôi</p>
            <p>
              Tầm nhìn của chúng tôi là Giới thiệu vẻ đẹp trong bạn với nụ cười
              xinh đẹp của bạn với thế giới bằng trải nghiệm mua sắm trực tuyến
              tốt nhất. Chúng tôi có bộ sưu tập quần áo được lựa chọn cẩn thận
              dành cho phụ nữ để phù hợp với họ dựa trên loại cơ thể, màu da,
              ngân sách và sở thích phong cách của họ. Chúng tôi mong muốn mang
              đến cho khách hàng trải nghiệm mua sắm hợp thời trang lành mạnh
              trong thời gian thực, cung cấp cho họ tất cả thông tin họ cần về
              sự vừa vặn, thoải mái, chất liệu vải và mọi thứ khác trong tâm trí
              của họ đối với từng sản phẩm trong bộ sưu tập của chúng tôi, thông
              qua biểu đồ kích thước. Ngoài ra, bao gồm việc giới thiệu các
              thiết kế, phong cách và danh mục mới cùng với tất cả thời trang
              đang diễn ra.
            </p>
            <p>
              <b>-Lý do chọn LYZA.COM</b>
            </p>
            <p>
              <b>LYZA.COM</b> có một bộ sưu tập lớn gồm sarees, kurta kurtis,
              chất liệu trang phục, váy, áo, xà cạp và hơn thế nữa. Tất cả các
              bộ sưu tập trên trang web của chúng tôi hoàn toàn là trang phục
              của nhà thiết kế nâng cấp theo xu hướng mới và tìm kiếm trên thị
              trường với danh mục thời trang phụ nữ lớn nhất. Chúng tôi tiếp tục
              nâng cao công nghệ và chủng loại sản phẩm của mình để đảm bảo rằng
              mọi phụ nữ sẽ có được trải nghiệm mua sắm thú vị nhất. <br />
              Chúng tôi đảm bảo bạn sẽ có được những bộ trang phục chất lượng
              nhất với chính sách đổi trả hàng miễn phí. Chúng tôi đảm bảo những
              gì bạn thấy chính xác là những gì bạn nhận được!
            </p>
            <p>
              -Đảm bảo giá thấp <br />
              -Nếu bạn tìm thấy giá thấp hơn trên bất kỳ trang phục nào chúng
              tôi bán trực tuyến, chúng tôi sẽ khớp với -giá đó! <br />
              -Hỗ trợ khách hàng 24/7 <br />
              -Email, Nhắn tin, Cuộc gọi <br />
              -Chúng tôi luôn sẵn sàng phục vụ bạn 24/7 trực tuyến và qua điện
              thoại. <br />
              -Định kích thước; Màu sắc <br />
              -Chúng tôi có một mảng các màu sắc và kích thước cho bạn chọn lựa.{" "}
              <br />
              -Giao hàng trên toàn thế giới <br />
              -Rất tiếc, Không. Chúng tôi chỉ cung cấp dịch vụ của mình trên
              toàn lãnh thổ Việt Nam. <br />
              -Chúng tôi sẽ sớm mở rộng kinh doanh ra quốc tế.. <br />
              -Trả hàng dễ dàng <br />
              Đã mua một bộ trang phục nhưng muốn trả lại? Chúng tôi có một
              chính sách hoàn trả dễ dàng trong 3 ngày.
              <br />
              Vui lòng gửi mail cho chúng tôi theo địa chỉ{" "}
              <b>
                <Link href="">phuong@gmail.com</Link>
              </b>{" "}
              để biết thêm chi tiết.
            </p>
            <p>
              <b>Những chiếc váy trong mơ cho mọi dịp</b>
            </p>
            <p>
              <b>LYZA.COM</b> mang tất cả những gì được các nhà tạo mẫu của
              chúng tôi lựa chọn cẩn thận. Nếu bạn quan tâm đến một mẫu cụ thể,
              vui lòng gửi thư cho chúng tôi, chúng tôi sẽ cố gắng hết sức để
              cung cấp cho bạn chiếc váy yêu thích.
            </p>
            <p>
              <b>Bảo mật đã xác minh</b>
            </p>
            <p>
              Tất cả các giao dịch của chúng tôi đều được Norton xác minh và với
              các tiêu chuẩn bảo mật cao nhất. Thêm vào đó, có rất nhiều thứ để
              tham gia thông qua các ưu đãi và quà tặng thú vị thường xuyên, vì
              vậy hãy quảng bá và giới thiệu chúng tôi đến tất cả mọi người từ
              gia đình, bạn bè và đồng nghiệp của bạn và nhận phần thưởng cho
              nó. Và trên hết, bạn có thể chia sẻ trải nghiệm người dùng của
              mình bằng cách đăng các bài đánh giá. Đừng chờ đợi lâu nữa Đăng ký
              với chúng tôi ngay bây giờ! bắt đầu theo dõi, bắt đầu mua và bắt
              đầu yêu và bắt đầu Giới thiệu vẻ đẹp trong bạn.
            </p>
          </div>
        </div>
        <hr />

        <Back_To_Top />
        <Footer />
      </>
    </div>
  );
}
