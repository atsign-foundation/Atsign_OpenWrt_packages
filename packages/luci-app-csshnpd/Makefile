# See /LICENSE for more information.
# This is free software, licensed under the GNU General Public License v2.

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI config app for NoPorts daemon (csshnpd)
LUCI_DEPENDS:=+luci-base +csshnpd
LUCI_PKGARCH:=all

PKG_LICENSE:=GPL-2.0
PKG_MAINTAINER:=Chris Swan <chris@atsign.com>

PKG_VERSION:=1.0.0-r1

include ../../luci.mk

# call BuildPackage - OpenWrt buildroot signature
