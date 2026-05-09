# Kế hoạch Migration: Base Layer từ ai-trader-hub-api

## Tổng quan sự khác biệt

|             | ai-trader-hub-api   | ai-question-hub-api |
| ----------- | ------------------- | ------------------- |
| Spring Boot | 4.0.5               | 3.5.14              |
| Java        | 21                  | 17                  |
| Trạng thái  | Đã implement đầy đủ | Scaffold trống      |

---

## Thứ tự thực hiện

```
1. pom.xml
2. application.yaml
3. constants/
4. helper/exception/
5. helper/base/
6. helper/validation/ + helper/message/ + helper/security/
7. helper/email/
8. properties/ + config/
9. security/ (JWT layer)
10. api/user/ + api/auth/
11. DB migrations
12. i18n
```

---

## Giai đoạn 1 — Cập nhật `pom.xml`

Thêm các dependencies còn thiếu vào `ai-question-hub-api/pom.xml`:

| Dependency                              | Mục đích              | Trạng thái |
| --------------------------------------- | --------------------- | ---------- |
| `spring-boot-starter-security`          | JWT + Security        | [ ]        |
| `spring-boot-starter-mail`              | Email service         | [ ]        |
| `spring-boot-starter-websocket`         | WebSocket / STOMP     | [ ]        |
| `spring-boot-starter-validation`        | Custom validators     | [ ]        |
| `springdoc-openapi-starter-webmvc-ui`   | Swagger UI            | [ ]        |
| `jjwt-api`, `jjwt-impl`, `jjwt-jackson` | JWT token             | [ ]        |
| `mapstruct` + `mapstruct-processor`     | DTO mapper            | [ ]        |
| `mybatis-spring-boot-starter`           | MyBatis (nếu chưa có) | [ ]        |

---

## Giai đoạn 2 — `application.yaml`

Bổ sung các config block còn thiếu:

```yaml
spring:
  messages:
    basename: i18n/messages
    encoding: UTF-8
    default-locale: en
    use-code-as-default-message: true
  mail:
    host: smtp.gmail.com
    port: 587
    username: your-email@gmail.com
    password: your-app-password
    properties:
      mail.smtp.auth: true
      mail.smtp.starttls.enable: true

app:
  jwt:
    secret: <base64-256bit>
    expiration-ms: 86400000
  otp:
    expiration-minutes: 10
```

---

## Giai đoạn 3 — `helper/` (Core Infrastructure)

### 3.1 `helper/base/` — Framework CRUD base

| File                                               | Trạng thái |
| -------------------------------------------------- | ---------- |
| `model/BaseModel.java`                             | [ ]        |
| `repository/IBaseRepository.java`                  | [ ]        |
| `construct/IRestfullService.java`                  | [ ]        |
| `construct/RestfullService.java`                   | [ ]        |
| `construct/RestfullController.java`                | [ ]        |
| `construct/swagger/RestfullControllerSwagger.java` | [ ]        |
| `response/PagedResponse.java`                      | [ ]        |

### 3.2 `helper/exception/` — Exception handling toàn cục

| File                           | Trạng thái |
| ------------------------------ | ---------- |
| `AppException.java`            | [ ]        |
| `BusinessException.java`       | [ ]        |
| `ConflictException.java`       | [ ]        |
| `ForbiddenException.java`      | [ ]        |
| `NotFoundException.java`       | [ ]        |
| `UnauthorizedException.java`   | [ ]        |
| `InternalServerException.java` | [ ]        |
| `ValidateException.java`       | [ ]        |
| `ErrorCode.java`               | [ ]        |
| `ErrorResponse.java`           | [ ]        |
| `GlobalExceptionHandler.java`  | [ ]        |

### 3.3 `helper/validation/` — Custom validators

| File                 | Trạng thái |
| -------------------- | ---------- |
| `ValidEmail.java`    | [ ]        |
| `ValidFullName.java` | [ ]        |
| `ValidPassword.java` | [ ]        |
| `ValidPhone.java`    | [ ]        |
| `ValidUsername.java` | [ ]        |
| `ValidOtp.java`      | [ ]        |

### 3.4 `helper/message/`

| File               | Trạng thái |
| ------------------ | ---------- |
| `MessageUtil.java` | [ ]        |

### 3.5 `helper/security/`

| File                | Trạng thái |
| ------------------- | ---------- |
| `SecurityUtil.java` | [ ]        |

### 3.6 `helper/email/`

| File                         | Trạng thái |
| ---------------------------- | ---------- |
| `EmailService.java`          | [ ]        |
| `impl/EmailServiceImpl.java` | [ ]        |

---

## Giai đoạn 4 — `security/` (JWT Layer)

| File                               | Trạng thái |
| ---------------------------------- | ---------- |
| `JwtProperties.java`               | [ ]        |
| `JwtUtil.java`                     | [ ]        |
| `JwtAuthenticationFilter.java`     | [ ]        |
| `JwtAuthenticationEntryPoint.java` | [ ]        |
| `JwtAccessDeniedHandler.java`      | [ ]        |
| `UserDetailsServiceImpl.java`      | [ ]        |
| `SecurityConfig.java`              | [ ]        |

---

## Giai đoạn 5 — `constants/`

| File               | Trạng thái |
| ------------------ | ---------- |
| `Message.java`     | [ ]        |
| `MessageCode.java` | [ ]        |

---

## Giai đoạn 6 — `properties/`

| File                    | Ghi chú                      | Trạng thái |
| ----------------------- | ---------------------------- | ---------- |
| `JwtProperties.java`    | Nếu chưa migrate ở bước 4    | [ ]        |
| `OtpProperties.java`    |                              | [ ]        |
| `GoogleProperties.java` | Bỏ qua — trader-hub specific | ❌         |
| `TopicProperties.java`  | Bỏ qua — Kafka specific      | ❌         |

---

## Giai đoạn 7 — `config/`

| File                   | Trạng thái |
| ---------------------- | ---------- |
| `MessageConfig.java`   | [ ]        |
| `SwaggerConfig.java`   | [ ]        |
| `WebSocketConfig.java` | [ ]        |

---

## Giai đoạn 8 — `api/auth/` + `api/user/` (Auth Domain Base)

### `api/user/`

| File                                | Trạng thái |
| ----------------------------------- | ---------- |
| `model/User.java`                   | [ ]        |
| `repository/UserRepository.java`    | [ ]        |
| `mapper/UserMapper.java`            | [ ]        |
| `request/UserRegisterRequest.java`  | [ ]        |
| `response/UserResponse.java`        | [ ]        |
| `service/UserService.java`          | [ ]        |
| `service/impl/UserServiceImpl.java` | [ ]        |
| `controller/UserController.java`    | [ ]        |

### `api/auth/`

| File                                           | Trạng thái |
| ---------------------------------------------- | ---------- |
| `model/AuthToken.java`                         | [ ]        |
| `model/PasswordResetToken.java`                | [ ]        |
| `repository/AuthTokenRepository.java`          | [ ]        |
| `repository/PasswordResetTokenRepository.java` | [ ]        |
| `controller/AuthController.java`               | [ ]        |
| `request/LoginRequest.java`                    | [ ]        |
| `request/ForgotPasswordRequest.java`           | [ ]        |
| `request/ResetPasswordRequest.java`            | [ ]        |
| `response/AuthResponse.java`                   | [ ]        |
| `response/ForgotPasswordResponse.java`         | [ ]        |
| `response/LogoutResponse.java`                 | [ ]        |
| `service/AuthService.java`                     | [ ]        |
| `service/impl/AuthServiceImpl.java`            | [ ]        |

---

## Giai đoạn 9 — DB Migrations (Flyway)

> Lưu ý: Kiểm tra số thứ tự version, các file V0001–V0007 đã tồn tại trong question-hub.

| File                                               | Trạng thái |
| -------------------------------------------------- | ---------- |
| `V????__DDL_Create_user_table.sql`                 | [ ]        |
| `V????__DDL_Create_auth_token_table.sql`           | [ ]        |
| `V????__DDL_Create_password_reset_token_table.sql` | [ ]        |

---

## Giai đoạn 10 — i18n

| File                          | Trạng thái |
| ----------------------------- | ---------- |
| `i18n/messages.properties`    | [ ]        |
| `i18n/messages_vi.properties` | [ ]        |

---

## Những gì KHÔNG migrate

| Package / File                     | Lý do                                                 |
| ---------------------------------- | ----------------------------------------------------- |
| `api/stock/`                       | Domain của trader-hub                                 |
| `api/chat/`                        | Domain của trader-hub                                 |
| `api/project/`                     | Domain của trader-hub (question-hub có project riêng) |
| `kafka/` consumers                 | trader-hub specific                                   |
| `event/`                           | trader-hub specific                                   |
| `database/StockSeeder.java`        | trader-hub specific                                   |
| `helper/google/`                   | Google Drive — trader-hub specific                    |
| `helper/kafka/`                    | Chỉ migrate nếu question-hub dùng Kafka               |
| `enums/StockSyncStatus.java`       | trader-hub specific                                   |
| `properties/GoogleProperties.java` | trader-hub specific                                   |
| `properties/TopicProperties.java`  | Kafka specific                                        |
