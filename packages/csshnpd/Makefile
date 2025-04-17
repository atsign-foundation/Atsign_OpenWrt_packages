include $(TOPDIR)/rules.mk

PKG_NAME:=csshnpd
PKG_VERSION:=1.0.4
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-c$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=https://github.com/atsign-foundation/noports/releases/download/c$(PKG_VERSION)
PKG_HASH:=09fed244bbf8d5bc1a51c3a2d061deebe96345a4c4d0b01cc3446827c4df98a1

PKG_LICENSE:=BSD-3-Clause
PKG_LICENSE_FILES:=LICENCE

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-c$(PKG_VERSION)

include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk

CMAKE_OPTIONS += \
	NOPORTS_MBEDTLS_PATH="deps/mbedtls-src" \
	NOPORTS_CJSON_PATH="deps/cjson-src" \
	NOPORTS_ATSDK_PATH="deps/atsdk-src"\
	BUILD_SHARED_LIBS="OFF" \
	CMAKE_BUILD_TYPE="Release" \
	CMAKE_C_FLAGS="-std=c99 -Wno-error -Wextra -Werror-implicit-function-declaration -fPIC -fhonour-copts -Wno-calloc-transposed-args" \
	CMAKE_INSTALL_PREFIX": "${sourceDir}/build/release-static/tmp-install-dir" \
	CMAKE_EXPORT_COMPILE_COMMANDS="OFF" \
	ATSDK_BUILD_TESTS="OFF" \
	ATSDK_MEMCHECK="OFF" \
	ENABLE_TESTING="OFF" \
	ENABLE_PROGRAMS="OFF" \
	ENABLE_CJSON_TEST="OFF" \
	CJSON_OVERRIDE_BUILD_SHARED_LIBS="ON" \
	CJSON_BUILD_SHARED_LIBS="OFF" \
	BUILD_SHARED_AND_STATIC_LIBS="OFF" \
	ENABLE_TARGET_EXPORT="OFF" \
	ENABLE_CJSON_VERSION_SO="OFF"

define Package/csshnpd
	SECTION:=net
	CATEGORY:=Network
	TITLE:=NoPorts Daemon
	URL:=https://noports.com
	SUBMENU:=SSH
endef

define Package/csshnpd/description
	A small and portable daemon for NoPorts.
endef

define Package/csshnpd/conffiles
/etc/config/sshnpd
endef

define Package/csshnpd/install	
	$(INSTALL_DIR) \
		$(1)/usr/bin \
		$(1)/etc/config \
		$(1)/etc/init.d
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/sshnpd/sshnpd $(1)/usr/bin/
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/sshnpd/at_activate $(1)/usr/bin/
	$(INSTALL_BIN) files/at_enroll.sh $(1)/usr/bin/
	$(INSTALL_BIN) files/csshnpd.init $(1)/etc/init.d/sshnpd
	$(INSTALL_CONF) files/csshnpd.config \
		$(1)/etc/config/sshnpd
endef

$(eval $(call BuildPackage,csshnpd))
