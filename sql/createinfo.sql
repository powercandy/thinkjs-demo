-- ----------------------------
-- Table structure for `tb_users`
-- ----------------------------

DROP TABLE IF EXISTS `tb_users`;
CREATE TABLE `tb_users`(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of tb_users
-- ----------------------------

INSERT INTO `tb_users` VALUES('1', 'admin', 'admin', '管理员');
INSERT INTO `tb_users` VALUES('2', 'test', 'test', '测试账号');








