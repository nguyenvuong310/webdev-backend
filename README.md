# Công nghệ sử dụng

- **Ứng dụng**: NestJS
- **Seed dữ liệu**: Python (Vì python hỗ trợ mạnh mẽ cho việc xử lý dữ liệu lớn)

# Cài đặt

- **nodejs**: version >=16
- **docker**
- **makefile**

# Kiến trúc

Chèn hình

# Seed data

Tạo biến môi trường ảo nếu muốn độc lập (fix văn)
run seed.py

# Chạy

- Môi trường development (NODE_ENV=development)

  make bootstrap #Đối với lần đầu chạy
  make up #Những lần sau chỉ cần chạy

- Môi trường development (NODE_ENV=production)
  Thay đổi những giá trị của .env để phù hợp với host

# Build

Sử dụng multi tage trong dockerfile để giảm kích thước image
make build
make push

# Deploy

Backend: Sử dụng Onrender (Docker image)
Database: Sử dụng Aiven console (Vì hỗ trợ free 5Gb)
