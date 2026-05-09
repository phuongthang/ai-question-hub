package com.aiquestionhub.aiquestionhubapi.constants;

/**
 * Định nghĩa tất cả mã thông điệp của hệ thống.
 *
 * <p>Quy ước đặt tên:
 * <ul>
 *   <li><b>E0001 – E9999</b>: Lỗi (Error) — dùng để thông báo lỗi nghiệp vụ, xác thực, hệ thống.</li>
 *   <li><b>I0001 – I9999</b>: Thông tin (Info) — dùng để thông báo thành công hoặc thông tin trạng thái.</li>
 * </ul>
 */
public final class MessageCode {

    private MessageCode() {
        // Không cho phép khởi tạo
    }

    // =========================================================================
    // NHÓM E0001–E0099: Lỗi xác thực & phân quyền (Authentication / Authorization)
    // =========================================================================

    /** E0001 — Thông tin đăng nhập không hợp lệ (sai username hoặc password). */
    public static final String E0001 = "E0001";

    /** E0002 — Token không hợp lệ hoặc đã bị giả mạo. */
    public static final String E0002 = "E0002";

    /** E0003 — Token đã hết hạn. */
    public static final String E0003 = "E0003";

    /** E0004 — Không có quyền truy cập tài nguyên này. */
    public static final String E0004 = "E0004";

    /** E0005 — Tài khoản đã bị vô hiệu hóa hoặc bị khóa. */
    public static final String E0005 = "E0005";

    // =========================================================================
    // NHÓM E0006–E0099: Lỗi validate dữ liệu đầu vào (Field Validation)
    // =========================================================================

    /** E0006 — Tên đăng nhập không được để trống. */
    public static final String E0006 = "E0006";

    /** E0007 — Tên đăng nhập phải từ 3 đến 50 ký tự. */
    public static final String E0007 = "E0007";

    /** E0008 — Địa chỉ email không được để trống. */
    public static final String E0008 = "E0008";

    /** E0009 — Địa chỉ email không đúng định dạng. */
    public static final String E0009 = "E0009";

    /** E0010 — Mật khẩu không được để trống. */
    public static final String E0010 = "E0010";

    /** E0011 — Mật khẩu phải có ít nhất 8 ký tự. */
    public static final String E0011 = "E0011";

    /** E0012 — Họ và tên không được để trống. */
    public static final String E0012 = "E0012";

    /** E0013 — Họ và tên phải từ 3 đến 100 ký tự. */
    public static final String E0013 = "E0013";

    /** E0014 — Số điện thoại không được để trống. */
    public static final String E0014 = "E0014";

    /** E0015 — Định dạng số điện thoại không hợp lệ. */
    public static final String E0015 = "E0015";

    /** E0016 — Mã OTP không được để trống. */
    public static final String E0016 = "E0016";

    /** E0017 — Mã OTP phải có đúng 6 chữ số. */
    public static final String E0017 = "E0017";

    // =========================================================================
    // NHÓM E0101–E0199: Lỗi người dùng (User)
    // =========================================================================

    /** E0101 — Không tìm thấy người dùng theo ID hoặc username. */
    public static final String E0101 = "E0101";

    /** E0102 — Username đã tồn tại trong hệ thống. */
    public static final String E0102 = "E0102";

    /** E0103 — Email đã tồn tại trong hệ thống. */
    public static final String E0103 = "E0103";

    /** E0104 — Thông tin người dùng không hợp lệ. */
    public static final String E0104 = "E0104";

    /** E0105 — OTP không hợp lệ. */
    public static final String E0105 = "E0105";

    /** E0106 — OTP đã hết hạn. */
    public static final String E0106 = "E0106";

    // =========================================================================
    // NHÓM E9001–E9099: Lỗi hệ thống (System)
    // =========================================================================

    /** E9001 — Lỗi hệ thống không xác định. */
    public static final String E9001 = "E9001";

    /** E9002 — Lỗi kết nối cơ sở dữ liệu. */
    public static final String E9002 = "E9002";

    /** E9003 — Dữ liệu đầu vào không hợp lệ (lỗi validation chung). */
    public static final String E9003 = "E9003";

    // =========================================================================
    // NHÓM I0001–I0099: Thông tin xác thực (Authentication)
    // =========================================================================

    /** I0001 — Đăng nhập thành công. */
    public static final String I0001 = "I0001";

    /** I0002 — Đăng ký tài khoản thành công. */
    public static final String I0002 = "I0002";

    /** I0003 — Đăng xuất thành công. */
    public static final String I0003 = "I0003";

    /** I0004 — Email đặt lại mật khẩu đã được gửi thành công. */
    public static final String I0004 = "I0004";

    /** I0005 — Đặt lại mật khẩu thành công. */
    public static final String I0005 = "I0005";

    // =========================================================================
    // NHÓM I0101–I0199: Thông tin người dùng (User)
    // =========================================================================

    /** I0101 — Lấy thông tin người dùng thành công. */
    public static final String I0101 = "I0101";

    /** I0102 — Tạo người dùng thành công. */
    public static final String I0102 = "I0102";

    /** I0103 — Cập nhật thông tin người dùng thành công. */
    public static final String I0103 = "I0103";

    /** I0104 — Xóa người dùng thành công. */
    public static final String I0104 = "I0104";
}
