# See /LICENSE for more information.
# This is free software, licensed under the GNU General Public License v2.

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-csshnpd
PKG_LICENSE:=GPL-2.0
PKG_MAINTAINER:=Chris Swan <chris@atsign.com>
PKG_RELEASE:=1

LUCI_TITLE:=LuCI config app for NoPorts daemon (csshnpd)
LUCI_DEPENDS:=+luci-base +csshnpd
LUCI_PKGARCH:=all

include ../../luci.mk

# call BuildPackage - OpenWrt buildroot signature
