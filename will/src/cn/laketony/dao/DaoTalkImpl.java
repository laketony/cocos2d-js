package cn.laketony.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import cn.laketony.dto.NpcTalks;
import cn.laketony.util.MyBatisUtil;

public class DaoTalkImpl {
	private String STATEMENT_HEAD = "sqlsMapper.";

	public static DaoTalkImpl fx() {
		return new DaoTalkImpl();
	}

	public List<NpcTalks> getContents(int whoid) {

		SqlSession sqlSession = MyBatisUtil.getSqlSession(true);

		String statement = STATEMENT_HEAD + "npcChar";// 映射sql的标识字符串
		// 执行查询返回一个唯一user对象的sql
		List<NpcTalks> contents = sqlSession.selectList(statement, whoid);
		sqlSession.close();
		return contents;

	}

}
