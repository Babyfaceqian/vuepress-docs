# Mariadb
## linux 安装
1. 下载
```shell
# 安装可能需要 root 权限，建议前面写上 sudo
$ yum -y install mariadb mariadb-server
或
$ apt install mariadb-server

```
2. 启动
```shell
# 可能需要 root 权限，建议前面写上 sudo
$ systemctl start mariadb
```
3. 初始化
```shell
# 可能需要 root 权限，建议前面写上 sudo
$ mysql_secure_installation

  Enter current password for root (enter for none):<–初次运行直接回车
  Set root password? [Y/n] <– 是否设置root用户密码，输入y并回车或直接回车
  New password: <– 设置root用户的密码
 
  Re-enter new password: <– 再输入一次你设置的密码
 
  Remove anonymous users? [Y/n] <– 是否删除匿名用户，输入y并回车
 
  Disallow root login remotely? [Y/n] <–是否禁止root远程登录,输入y并回车,
 
  Remove test database and access to it? [Y/n] <– 是否删除test数据库，输入y并回车

  Reload privilege tables now? [Y/n] <– 是否重新加载权限表，输入y并回车
```
4. 登录测试
```shell
$ mysql -uroot -p
```

## 问题解决
1. 首次登录时提示密码错误
```shell
# 停止服务
$ systemctl stop mariadb
# 以安全模式启动
$ sudo mysqld_safe --skip-grant-tables &
# 免密登录
$ mysql -u root
# 查看用户信息，如果 root 对应的 plugin 是 author_socket，则需要改成 mysql_native_password 才能用密码登录，否则秩序修改密码
$ mysql> select user, plugin from mysql.user;
+-----------+-----------------------+
| user      | plugin                |
+-----------+-----------------------+
| root      | auth_socket           |
+-----------+-----------------------+
3 rows in set (0.01 sec)
# 修改密码和 plugin
$ mysql> update mysql.user set authentication_string=PASSWORD('newPwd'), plugin='mysql_native_password' where user='root';
Query OK, 1 row affected, 1 warning (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 1
# 生效权限
$ mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)
# 退出
$ mysql> exit
# 重启服务
$ systemctl start mariadb
```