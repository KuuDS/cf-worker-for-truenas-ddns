# README

CF Workers For TrueNas Scale DDNS

## 配置说明

- CheckIP服务器: dynamic.zoneedit.com
- CheckIP路径： /checkip.html
- 自定义服务器： 使用Worker的域名，使用添加到自己域名的CNAME记录里
- 自定义路径： `/update?zone_id=YOUR_ZONE_ID&domain_id=YOUR_DOMAIN_ID&domain_name=%h&password=%p&ip=%i`
- 域名： DDNS的完整域名
- 更新周期： 单位秒
- 用户名：随便填
- 密码：CF_TOKEN
