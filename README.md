# Ứng dụng đặt lịch hẹn [Appointment Scheduling Application]

Hệ thống có 3 role:

- Admin: Quản trị hệ thống
- Provider: Khách hàng của hệ thống, cung cấp dịch vụ cho client
- Client: Khách hàng của Provider, đặt lịch hẹn

## System: Hệ thống

- Thông báo nhắc nhở (Email & Web)
  - Báo cáo doanh thu hàng tháng qua email cho Provider
  - Gửi email và thông báo web cho Provider khi có lịch hẹn mới

## Admin: Quản trị hệ thống

- Quản lý User (Admin, Provider - Phê duyệt account Provider, Client)
- Quản lý danh mục
- Quản lý lịch hẹn
- Quản lý dịch vụ
- Quản lý doanh thu của tất cả Provider
- Quản lý hóa đơn của tất cả Provider
- Quản lý doanh thu của hệ thống (Tiền nhận được từ Provider - Hoa hồng mỗi lần đặt lịch)

## Provider: Khách hàng của hệ thống, cung cấp dịch vụ cho client

- Quản lý thông tin cá nhân (Profile)
- Quản lý dịch vụ
- Quản lý lịch hẹn
- Quản lý doanh thu
- Quản lý hóa đơn
- Quản lý Khuyến mãi
- Quản lý thông báo
- Quản lý Client sử dụng dịch vụ
- Chat với Client để tư vấn người dùng mua dịch vụ

## Client: Khách hàng của Provider, đặt lịch hẹn

- Quản lý lịch hẹn
- Tìm kiếm dịch vụ
- Đánh giá & nhận xét dịch vụ
- Quản lý thông tin cá nhân (Profile)
- Quản lý Dịch vụ yêu thích
- Quản lý thông báo
- Chat với Provider để yêu cầu tư vấn
- Thanh toán (Stripe) khi đặt lịch
