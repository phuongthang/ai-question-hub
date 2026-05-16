package com.aiquestionhub.aiquestionhubapi.helper.typehandler;

import com.aiquestionhub.aiquestionhubapi.enums.TopicActivityActionType;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@MappedTypes(TopicActivityActionType.class)
public class TopicActivityActionTypeHandler extends BaseTypeHandler<TopicActivityActionType> {

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, TopicActivityActionType parameter, JdbcType jdbcType)
            throws SQLException {
        ps.setShort(i, parameter.getValue().shortValue());
    }

    @Override
    public TopicActivityActionType getNullableResult(ResultSet rs, String columnName) throws SQLException {
        short value = rs.getShort(columnName);
        return rs.wasNull() ? null : TopicActivityActionType.fromValue((int) value);
    }

    @Override
    public TopicActivityActionType getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        short value = rs.getShort(columnIndex);
        return rs.wasNull() ? null : TopicActivityActionType.fromValue((int) value);
    }

    @Override
    public TopicActivityActionType getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        short value = cs.getShort(columnIndex);
        return cs.wasNull() ? null : TopicActivityActionType.fromValue((int) value);
    }
}
