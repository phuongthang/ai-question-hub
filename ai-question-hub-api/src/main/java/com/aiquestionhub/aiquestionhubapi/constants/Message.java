package com.aiquestionhub.aiquestionhubapi.constants;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * Enum type-safe cho các mã thông điệp của hệ thống.
 * Nội dung thông điệp (đa ngôn ngữ) được lấy qua {@code MessageUtil} dựa trên
 * file properties {@code i18n/messages.properties} (EN) và {@code i18n/messages_vi.properties} (VI).
 *
 * <p>Ngôn ngữ được xác định tự động qua header {@code Accept-Language}:
 * <ul>
 *   <li>{@code Accept-Language: en} → tiếng Anh (mặc định)</li>
 *   <li>{@code Accept-Language: vi} → tiếng Việt</li>
 * </ul>
 */
@Getter
@RequiredArgsConstructor
public enum Message {

    // =========================================================================
    // LỖI XÁC THỰC & PHÂN QUYỀN (E0001–E0099)
    // =========================================================================

    E0001(MessageCode.E0001),
    E0002(MessageCode.E0002),
    E0003(MessageCode.E0003),
    E0004(MessageCode.E0004),
    E0005(MessageCode.E0005),

    // =========================================================================
    // LỖI VALIDATE DỮ LIỆU ĐẦU VÀO (E0006–E0099)
    // =========================================================================

    E0006(MessageCode.E0006),
    E0007(MessageCode.E0007),
    E0008(MessageCode.E0008),
    E0009(MessageCode.E0009),
    E0010(MessageCode.E0010),
    E0011(MessageCode.E0011),
    E0012(MessageCode.E0012),
    E0013(MessageCode.E0013),
    E0014(MessageCode.E0014),
    E0015(MessageCode.E0015),
    E0016(MessageCode.E0016),
    E0017(MessageCode.E0017),

    // =========================================================================
    // LỖI NGƯỜI DÙNG (E0101–E0199)
    // =========================================================================

    E0101(MessageCode.E0101),
    E0102(MessageCode.E0102),
    E0103(MessageCode.E0103),
    E0104(MessageCode.E0104),
    E0105(MessageCode.E0105),
    E0106(MessageCode.E0106),

    // =========================================================================
    // LỖI HỆ THỐNG (E9001–E9099)
    // =========================================================================

    E9001(MessageCode.E9001),
    E9002(MessageCode.E9002),
    E9003(MessageCode.E9003),

    // =========================================================================
    // THÔNG TIN XÁC THỰC (I0001–I0099)
    // =========================================================================

    I0001(MessageCode.I0001),
    I0002(MessageCode.I0002),
    I0003(MessageCode.I0003),
    I0004(MessageCode.I0004),
    I0005(MessageCode.I0005),

    // =========================================================================
    // THÔNG TIN NGƯỜI DÙNG (I0101–I0199)
    // =========================================================================

    I0101(MessageCode.I0101),
    I0102(MessageCode.I0102),
    I0103(MessageCode.I0103),
    I0104(MessageCode.I0104);

    // =========================================================================

    private final String code;

    public static Message of(String code) {
        for (Message message : values()) {
            if (message.code.equals(code)) {
                return message;
            }
        }
        throw new IllegalArgumentException("Unknown message code: " + code);
    }
}
