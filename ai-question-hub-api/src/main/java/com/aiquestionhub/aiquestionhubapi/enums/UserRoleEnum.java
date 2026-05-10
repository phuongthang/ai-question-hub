package com.aiquestionhub.aiquestionhubapi.enums;

import lombok.Getter;

@Getter
public enum UserRoleEnum {
  ADMIN(1, "Admin"),
  USER(2, "User");

  private final Integer value;
  private final String displayName;

  UserRoleEnum(Integer value, String displayName) {
      this.value = value;
      this.displayName = displayName;
  }

  public static UserRoleEnum fromValue(Integer value) {
      for (UserRoleEnum type : values()) {
          if (type.value.equals(value)) {
              return type;
          }
        }
      throw new IllegalArgumentException("Invalid type value: " + value);
  }
}
