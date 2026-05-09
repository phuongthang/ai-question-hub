package com.aiquestionhub.aiquestionhubapi.helper.base.construct.swagger;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@SecurityRequirement(name = "bearerAuth")
public interface RestfullControllerSwagger<RQ, RS> {

    @Operation(summary = "Lấy danh sách", responses = {
            @ApiResponse(responseCode = "200", description = "Thành công"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực")
    })
    ResponseEntity<List<RS>> findAll();

    @Operation(summary = "Lấy chi tiết theo ID", responses = {
            @ApiResponse(responseCode = "200", description = "Thành công"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy tài nguyên")
    })
    ResponseEntity<RS> findById(
            @Parameter(description = "ID của tài nguyên cần lấy", required = true) @PathVariable Long id);

    @Operation(summary = "Tạo mới", responses = {
            @ApiResponse(responseCode = "201", description = "Tạo thành công"),
            @ApiResponse(responseCode = "400", description = "Dữ liệu đầu vào không hợp lệ"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực")
    })
    ResponseEntity<RS> create(@RequestBody RQ request);

    @Operation(summary = "Cập nhật", responses = {
            @ApiResponse(responseCode = "200", description = "Cập nhật thành công"),
            @ApiResponse(responseCode = "400", description = "Dữ liệu đầu vào không hợp lệ"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy tài nguyên")
    })
    ResponseEntity<RS> update(
            @Parameter(description = "ID của tài nguyên cần cập nhật", required = true) @PathVariable Long id,
            @RequestBody RQ request);

    @Operation(summary = "Xóa", responses = {
            @ApiResponse(responseCode = "204", description = "Xóa thành công"),
            @ApiResponse(responseCode = "401", description = "Chưa xác thực"),
            @ApiResponse(responseCode = "404", description = "Không tìm thấy tài nguyên")
    })
    ResponseEntity<Void> delete(
            @Parameter(description = "ID của tài nguyên cần xóa", required = true) @PathVariable Long id);
}
